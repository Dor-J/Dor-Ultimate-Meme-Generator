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
  return gLines.some((line) => {
    const { pos } = line

    if (line.type === 'circle') {
      const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
      )
      return distance <= line.size
    }

    // Text-based line
    const distanceX = Math.abs(pos.x - clickedPos.x)
    const distanceY = Math.abs(pos.y - clickedPos.y)
    return distanceX <= line.width / 2 && distanceY <= line.height / 2
  })
}

function setLineDrag(isDrag, lineId) {
  const line = getLineById(lineId)
  if (line) line.isDrag = isDrag
}

function moveLine(dx, dy) {
  const line = getActiveLine()
  if (line) {
    line.pos.x += dx
    line.pos.y += dy
    saveLinesState()
    renderCanvas()
  }
}
