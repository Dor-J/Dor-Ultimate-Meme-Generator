// js/canvas.controller.js
'use strict'

function onInitCanvas() {
  setCanvas()
}

function onResize() {
  const elContainer = document.querySelector('.canvas-container')
  const elCanvas = getElCanvas()
  elCanvas.width = elContainer.clientWidth + 'px'
}

function onClearCanvas() {
  const ctx = getCtx()
  ctx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDown(ev) {
  console.log('onDown')
  document.body.style.cursor = 'grab'
  //TODO:
}

function onMove(ev) {
  console.log('onMove')

  // ev.target is the canvas
  const pos = getEvPos(ev)
  if (!isLinesClicked(pos)) return

  //get line by id
  const line = getLinesClicked(pos)

  const dx = pos.x - line.gStartPos.x
  const dy = pos.y - line.gStartPos.y

  setLineDrag(ev.target, true)

  line.gStartPos.x = pos.x
  line.gStartPos.y = pos.y
  // const editor = getEditor()
  document.body.style.cursor = 'grabbing'
}

function onUp(ev) {
  console.log('onUp')

  setLineDrag(false)

  document.body.style.cursor = 'default'
}

function renderCanvas() {
  console.log('renderCanvas active')

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
  const { pos, color, radius, text } = getLineById(line.id)
  if (line.type === 'circle') {
    //Draw the circle/emoji
    drawArc(pos.x, pos.y, radius, color, text)
  }
  drawText(text, pos.x, pos.y)
}

function drawArc(x, y, radius = 60, color = 'blue') {
  gCtx.beginPath()
  gCtx.lineWidth = '6'
  gCtx.arc(x, y, radius, 0, 2 * Math.PI)
  gCtx.strokeStyle = 'white'
  gCtx.stroke()
  gCtx.fillStyle = color
  gCtx.fill()
}

function drawText(x, y, editor) {
  //TODO:
  ctx = getCtx()
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
