// js/canvas.controller.js
'use strict'

function onInitCanvas() {
  setCanvas()
}

function onResize() {
  const elContainer = document.querySelector('.main-editor .canvas-container')
  const elCanvas = getElCanvas()

  elCanvas.width = elContainer.clientWidth

  const img = getCurrentImage()
  if (img) {
    elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
  }

  renderCanvas()
}

function renderMeme(img, isNoLines = false) {
  const elCanvas = getElCanvas()
  const ctx = getCtx()

  if (!getLines().length && !isNoLines) {
    addDefaultLine()
    updateEditorUI()
  }

  elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)

  renderCanvas()
}

function onClearCanvas() {
  const elCanvas = getElCanvas()
  const ctx = getCtx()
  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)
}

// CANVAS INTERACTIONS
function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isLinesClicked(pos)) return

  const line = getClickedLine(pos)
  if (!line) return

  setActiveLineId(line)
  setLineDrag(true, line.id)
  line.gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const pos = getEvPos(ev)
  const line = getActiveLine()

  if (!line || !line.isDrag) return

  const dx = pos.x - line.gStartPos.x
  const dy = pos.y - line.gStartPos.y

  moveLine(dx, dy)

  line.gStartPos = pos
  renderCanvas()
}

function onUp(ev) {
  const line = getActiveLine()
  if (line) setLineDrag(false, line.id)

  document.body.style.cursor = 'default'
}

// RENDER
function renderCanvas(skipSelectionRectangle = false) {
  const elCanvas = getElCanvas()
  const ctx = getCtx()

  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

  // draw background image
  const img = getCurrentImage()
  if (img) {
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
  }

  const lines = getLines()
  lines.forEach((line) => {
    renderLine(line, ctx)
  })

  const activeLine = getActiveLine()
  if (activeLine && !skipSelectionRectangle) {
    drawSelectionRectangle(activeLine, ctx)
  }
}

function renderLine(line, ctx) {
  const {
    pos,
    fontSize,
    fontFamily,
    fillColor,
    strokeColor,
    text,
    size,
    type,
    alignment,
  } = line

  if (type === 'text') {
    //getting text width and height
    const textWidth = ctx.measureText(text).width
    const textHeight = fontSize * 1.2
    line.width = textWidth
    line.height = textHeight

    // Draw text
    ctx.beginPath()
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
    ctx.textAlign = alignment
    ctx.textBaseline = 'middle'

    wrapText(ctx, text, pos.x, pos.y, textHeight, alignment)
  } else if (type === 'circle') {
    // Draw emoji/icon as circle
    ctx.beginPath()
    ctx.font = `${fontSize * 2}px ${fontFamily || 'sans-serif'}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, pos.x, pos.y)
    // regular circle
    // ctx.arc(pos.x, pos.y, fontSize * 2, 0, 2 * Math.PI)
    // ctx.strokeStyle = strokeColor
    // ctx.stroke()
  }
}

function wrapText(ctx, text, x, y, lineHeight, alignment = 'center') {
  const elCanvas = getElCanvas()
  const maxWidth = elCanvas.width * 0.9
  const words = text.split(' ')
  let line = ''
  let currentY = y //current line's y position

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    const testWidth = ctx.measureText(testLine).width

    if (testWidth > maxWidth && i > 0) {
      drawTextLine(ctx, line, x, currentY, alignment)
      line = words[i] + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }

  if (line) drawTextLine(ctx, line, x, currentY, alignment)
}

function drawTextLine(ctx, line, x, y, alignment) {
  ctx.fillText(line, x, y)
  ctx.strokeText(line, x, y)
}

function onResizeEmoji(diff) {
  const line = getActiveLine()
  if (line && line.type === 'circle') {
    line.size = Math.max(10, line.size + diff) // min size set 10
    renderCanvas()
  }
}

// DRAW FUNCTIONS

function drawSelectionRectangle(line, ctx) {
  const { pos, fontSize, size, type } = line
  ctx.beginPath()
  ctx.strokeStyle = 'blue'
  ctx.setLineDash([6])
  ctx.lineWidth = 1

  if (type === 'text') {
    // Text selection rectangle
    const textWidth = ctx.measureText(line.text).width
    const textHeight = fontSize
    ctx.strokeRect(
      pos.x - textWidth / 2 - 5,
      pos.y - textHeight / 2 - 5,
      textWidth + 10,
      textHeight + 10
    )
  } else if (type === 'circle') {
    // Circle selection circle
    const selectionRadius = size + 5 // Add padding to the size
    ctx.arc(pos.x, pos.y, selectionRadius, 0, 2 * Math.PI) // Full circle
    ctx.stroke()
  }

  ctx.setLineDash([])
}

// GET POSITION
function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
