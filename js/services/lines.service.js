// js/services/lines.service.js
'use strict'

var gLines = []
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
  if (line) {
    line.alignment = alignment
  }
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
}

function resetLines() {
  gLines = []
}

// CREATE
function createNewLine(pos, type = 'text', content = '') {
  const editor = getEditor()

  const newLine = {
    id: makeId(5),
    text:
      type !== 'text'
        ? content
        : gLines.length > 0
        ? editor.text !== ''
          ? editor.text
          : 'Empty line'
        : 'An apple a day, keeps microsoft away',
    type,
    fontSize: editor.fontSize,
    fontFamily: editor.fontFamily,
    strokeColor: editor.strokeColor,
    fillColor: editor.fillColor,
    alignment: editor.alignment,
    size: type === 'circle' ? editor.fontSize * 2 : null, // radius
    pos,
    isDrag: false,
  }
  gLines.push(newLine)
  return newLine
}

// INTERACTION
function isLinesClicked(clickedPos) {
  return gLines.some((line) => {
    const { pos } = line

    if (line.type === 'circle') {
      const distance = Math.sqrt(
        (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
      )
      return distance <= line.size
    }

    // text
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
    renderCanvas()
  }
}

function addDefaultLine() {
  const elCanvas = getElCanvas()
  if (gLines.length === 0) {
    //  default line top
    const line = createNewLine({ x: elCanvas.width / 2, y: 40 })
    setActiveLineId(line)
    updateEditorStateFromLine(line)
  } else if (gLines.length === 1) {
    //  second line at bottom
    const line = createNewLine({
      x: elCanvas.width / 2,
      y: elCanvas.height - 40,
    })
    setActiveLineId(line)
    updateEditorStateFromLine(line)
  } else {
    // add others center
    const line = createNewLine({
      x: elCanvas.width / 2,
      y: elCanvas.height / 2,
    })
    setActiveLineId(line)
    updateEditorStateFromLine(line)
  }
}

function getClickedLine(clickedPos) {
  return gLines.find((line) => {
    if (line.type === 'circle') {
      const distance = Math.sqrt(
        (line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2
      )
      return distance <= line.size
    } else {
      // text
      const distanceX = Math.abs(line.pos.x - clickedPos.x)
      const distanceY = Math.abs(line.pos.y - clickedPos.y)
      return distanceX <= line.width / 2 && distanceY <= line.height / 2
    }
  })
}
