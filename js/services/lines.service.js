// js/services/lines.service.js
'use strict'

const STORAGE_KEY_LINES = 'linesStateDB'
var gLines = loadFromStorage(STORAGE_KEY_LINES) || []
var gActiveLineId = null

function getLines() {
  return gLines
}

function getActiveLine() {
  return getLineById(gActiveLineId)
}
function setActiveLineId(line) {
  gActiveLineId = line.id
}

function getLineById(lineId) {
  return gLines.find((line) => line.id === lineId)
}

function isLinesClicked(clickedPos) {
  let isLinesClicked = false

  if (gLines.length === 0) return

  //regular for loop because i want to exit early if i find a line
  for (const line of gLines) {
    const { pos } = line
    if (line.type === 'circle') {
      // Calc the distance between two dots
      const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
      )
      //If its smaller then the radius of the circle we are inside
      isLinesClicked = distance <= line.size
      if (isLinesClicked) return true
    }

    //If its text
    const distanceX = pos.x - clickedPos.x
    const distanceY = pos.y - clickedPos.y
    isLinesClicked = distanceX <= line.pos.x && distanceY <= line.pos.y
    if (isLinesClicked) return true
  }

  return isLinesClicked
}

function getClickedLine(clickedPos) {
  console.log('getClickedLine', clickedPos)
}

function setLineDrag(isDrag) {
  console.log('setLineDrag', isDrag)
  ev.target.isDrag = isDrag //TODO:
}

// Move the line in a delta, diff from the pervious pos
function moveLine(dx, dy) {
  console.log('moveLine', 'dx', dx, 'dy', dy)
  //TODO:
  line.pos.x += dx
  line.pos.y += dy
}

function updateLineText(lineId, text) {
  getLineById(lineId).text = text
} //TODO: mak updaters for all properties of line

function addLine() {
  //TODO:
  const editor = getEditor()
}

function _createLine(pos) {
  return (line = {
    pos,
    id: makeId(5),
    type: 'text',
    radius: 20,
    color: 'blue',
    isDrag: false,
    gStartPos: pos,
    text: '',
  })
}
