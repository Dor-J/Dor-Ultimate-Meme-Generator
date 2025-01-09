// js/canvas.controller.js
'use strict'

function onInitCanvas() {
  setCanvas()
}

function onResize() {
  const elContainer = document.querySelector('.canvas-container')
  const elCanvas = getElCanvas()

  elCanvas.width = elContainer.clientWidth
}

function renderMeme(img) {
  const elCanvas = getElCanvas()
  const ctx = getCtx()

  elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
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

  setLineDrag(true, line.id)
  line.gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  console.log('onMove')

  const pos = getEvPos(ev)
  const line = getActiveLine()

  if (!line || !line.isDrag) return

  const dx = pos.x - line.gStartPos.x
  const dy = pos.y - line.gStartPos.y

  moveLine(dx, dy)

  line.gStartPos = pos // Update start position
  renderCanvas()
}

function onUp(ev) {
  console.log('onUp')

  const line = getActiveLine()
  if (line) setLineDrag(false, line.id)

  document.body.style.cursor = 'default'
}

function renderCanvas() {
  renderLines()
}

function renderLines() {
  console.log('renderLines active')

  const lines = getLines()
  console.log('lines', lines)
  lines.forEach((line) => {
    renderLines(line)
  })
}

function renderLine(line) {
  const { pos, color, radius, data } = getLineById(line.id)
  if (line.type === 'circle') {
    //Draw the circle/emoji
    drawArc(pos.x, pos.y, radius, color, data)
  }
  drawText(data, pos.x, pos.y)
}

// DRAW FUNCTIONS
function drawArc(x, y, radius = 60, color = 'blue') {
  //TODO:
  gCtx.beginPath()
  gCtx.lineWidth = '6'
  gCtx.arc(x, y, radius, 0, 2 * Math.PI)
  gCtx.strokeStyle = 'white'
  gCtx.stroke()
  gCtx.fillStyle = color
  gCtx.fill()
}

function drawText(x, y) {
  //TODO:
  const editor = getEditor()
  const ctx = getCtx()
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  ctx.font = '40px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(text, x, y)
  ctx.strokeText(text, x, y)
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
