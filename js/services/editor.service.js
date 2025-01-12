// js/services/editor.service.js
'use strict'

var gEditor = _createEditor()

function getEditor() {
  return gEditor
}

function getActiveLine() {
  return getActiveLineFromLines()
}

function addNewLine() {
  const elCanvas = getElCanvas()
  const defaultPos = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  const newLine = createNewLine(defaultPos)
  gEditor.activeLineId = newLine.id
  gEditor.lines[newLine.id] = newLine
  updateEditorStateFromLine(newLine)
}

function addEmojiLine(emoji) {
  const elCanvas = getElCanvas()
  const defaultPos = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  const newLine = createNewLine(defaultPos, 'circle', emoji)
  gEditor.activeLineId = newLine.id
  gEditor.lines[newLine.id] = newLine
  updateEditorStateFromLine(newLine)
}

function deleteActiveLine() {
  const activeLine = getActiveLine()
  if (activeLine) {
    deleteLine(activeLine.id)
    setActiveLineToLastLine()
  }
}

function switchToNextLine() {
  const lines = getLines()
  if (!lines.length) return

  const currentIndex = lines.findIndex((line) => line.id === getActiveLineId())
  if (currentIndex === -1) {
    gEditor.activeLineId = lines[0].id
    updateEditorStateFromLine(lines[0])

    return
  }
  const nextIndex = (currentIndex + 1) % lines.length
  setActiveLineId(lines[nextIndex])

  updateEditorStateFromLine(lines[nextIndex])
}

function updateActiveLineText(text) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineText(activeLine.id, text)
    gEditor.text = text
  }
}

function updateActiveLineFontSize(diff) {
  const activeLine = getActiveLine()
  if (activeLine) {
    const newFontSize = Math.max(1, activeLine.fontSize + diff)
    updateLineFontSize(activeLine.id, newFontSize)
    gEditor.fontSize = newFontSize
  }
}

function updateActiveLineAlignment(alignment) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineAlignment(activeLine.id, alignment)
    gEditor.alignment = alignment
    updateEditorActiveAlign(alignment)
  }
}

function updateActiveLineFont(fontFamily) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFontFamily(activeLine.id, fontFamily)
    gEditor.fontFamily = fontFamily
  }
}

function updateActiveLineStrokeColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineStrokeColor(activeLine.id, color)
    gEditor.strokeColor = color
  }
}

function updateActiveLineFillColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFillColor(activeLine.id, color)
    gEditor.fillColor = color
  }
}

function setActiveLineToLastLine() {
  const lines = getLines()
  gEditor.activeLineId = lines.length ? lines[lines.length - 1].id : null
  if (gEditor.activeLineId) {
    updateEditorStateFromLine(getLineById(gEditor.activeLineId))
  } else {
    resetEditorState()
  }
}

function resetEditorState() {
  gEditor = {
    ...gEditor,
    text: '',
    fontSize: 20,
    fontFamily: 'Impact',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    alignment: 'center',
    activeLineId: null,
  }
}

function updateEditorStateFromLine(line) {
  gEditor = {
    ...gEditor,
    text: line.text,
    fontSize: line.fontSize,
    fontFamily: line.fontFamily,
    strokeColor: line.strokeColor,
    fillColor: line.fillColor,
    alignment: line.alignment,
  }
}

function _createEditor() {
  return {
    // Defaults
    text: 'example text',
    fontSize: 20,
    fontFamily: 'Impact',
    strokeColor: '#000000',
    fillColor: '#FFFFFF',
    alignment: 'center',
    activeLineId: null,
    lines: {},
  }
}
