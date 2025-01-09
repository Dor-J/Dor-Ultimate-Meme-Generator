// js/services/lines.service.js
'use strict'

const STORAGE_KEY_LINES = 'linesStateDB'
var gLines = loadFromStorage(STORAGE_KEY_LINES) || []
var gActiveLineId = null

//GET
function getLines() {
  return gLines
}

function getActiveLineId() {
  return gActiveLineId
}

function getActiveLineFromLines() {
  return gLines.find((line) => line.id === gActiveLineId)
}

function getLineById(lineId) {
  return gLines.find((line) => line.id === lineId)
}

// UPDATE
function setActiveLineId(line) {
  gActiveLineId = line.id
}

function setActiveLineToLastLine() {
  gActiveLineId = gLines.length ? gLines[gLines.length - 1].id : null
}

function updateLineText(lineId, text) {
  const line = getLineById(lineId)
  if (line) line.text = text
}

function updateLineFontSize(lineId, fontSize) {
  const line = getLineById(lineId)
  if (line) line.fontSize = fontSize
}

function updateLineAlignment(lineId, alignment) {
  const line = getLineById(lineId)
  if (line) line.alignment = alignment
}

function updateLineFontFamily(lineId, fontFamily) {
  const line = getLineById(lineId)
  if (line) line.fontFamily = fontFamily
}

function updateLineStrokeColor(lineId, color) {
  const line = getLineById(lineId)
  if (line) line.strokeColor = color
}

function updateLineFillColor(lineId, color) {
  const line = getLineById(lineId)
  if (line) line.fillColor = color
}

// DELETE
function deleteLine(lineId) {
  gLines = gLines.filter((line) => line.id !== lineId)
  saveLinesState()
}

// CREATE
function addLine() {
  const editor = getEditor()
  const lines = getLines()
  const elCanvas = getElCanvas()
  let pos = { x: 0, y: elCanvas.height / 2 }
  if (lines.length === 0) pos = { x: 0, y: 0 }
  if (lines.length === 1) pos = { x: 0, y: elCanvas.height - 20 }

  const line = _createLine(pos)
  console.log('line', line)

  lines.push(line)
}

function createNewLine(pos) {
  const newLine = {
    id: makeId(5),
    text: '',
    fontSize: 20,
    fontFamily: 'Arial',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    alignment: 'center',
    pos,
  }
  gLines.push(newLine)
  saveLinesState()
  return newLine
}

function saveLinesState() {
  saveToStorage(STORAGE_KEY_LINES, gLines)
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

function setLineDrag(isDrag, lineId) {
  //TODO:
  const line = getLineById(lineId)
  if (line) line.isDrag = isDrag
}

function moveLine(dx, dy) {
  const line = getActiveLine()
  if (line) {
    line.pos.x += dx
    line.pos.y += dy
    renderCanvas()
  }
}

// Move the line in a delta, diff from the pervious pos
function moveLine(dx, dy) {
  console.log('moveLine', 'dx', dx, 'dy', dy)
  //TODO:
  line.pos.x += dx
  line.pos.y += dy
}
