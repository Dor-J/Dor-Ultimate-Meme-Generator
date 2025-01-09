// js/services/editor.service.js
'use strict'

const STORAGE_KEY_EDITOR = 'editorStateDB'
var gEditor = loadFromStorage(STORAGE_KEY_EDITOR) || _createEditor()

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
  updateEditorStateFromLine(newLine)
  saveEditorState()
}

function deleteActiveLine() {
  const activeLine = getActiveLine()
  if (activeLine) {
    deleteLine(activeLine.id)
    setActiveLineToLastLine()
    saveEditorState()
  }
}

function switchToNextLine() {
  const lines = getLines()
  if (!lines.length) return

  const currentIndex = lines.findIndex((line) => line.id === getActiveLineId())
  const nextIndex = (currentIndex + 1) % lines.length
  gEditor.activeLineId = lines[nextIndex].id
  updateEditorStateFromLine(lines[nextIndex])
  saveEditorState()
}

function updateActiveLineText(text) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineText(activeLine.id, text)
    gEditor.text = text
    saveEditorState()
  }
}

function updateActiveLineFontSize(diff) {
  const activeLine = getActiveLine()
  if (activeLine) {
    const newFontSize = Math.max(1, activeLine.fontSize + diff)
    updateLineFontSize(activeLine.id, newFontSize)
    saveEditorState()
  }
}

function updateActiveLineFontSize(diff) {
  const activeLine = getActiveLine()
  if (activeLine) {
    const newFontSize = Math.max(1, activeLine.fontSize + diff)
    updateLineFontSize(activeLine.id, newFontSize)
    gEditor.fontSize = newFontSize
    saveEditorState()
  }
}

function updateActiveLineAlignment(alignment) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineAlignment(activeLine.id, alignment)
    gEditor.alignment = alignment
    saveEditorState()
  }
}

function updateActiveLineFont(fontFamily) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFontFamily(activeLine.id, fontFamily)
    gEditor.fontFamily = fontFamily
    saveEditorState()
  }
}

function updateActiveLineStrokeColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineStrokeColor(activeLine.id, color)
    gEditor.strokeColor = color
    saveEditorState()
  }
}

function updateActiveLineFillColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFillColor(activeLine.id, color)
    gEditor.fillColor = color
    saveEditorState()
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
  saveEditorState()
}

function resetEditorState() {
  gEditor = {
    ...gEditor,
    text: '',
    fontSize: 20,
    fontFamily: 'Arial',
    strokeColor: '#000000',
    fillColor: '#FFFFFF',
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
    fontFamily: 'Arial',
    strokeColor: '#000000',
    fillColor: '#FFFFFF',
    alignment: 'center',
    activeLineId: null,
    lines: [],
  }
}

function saveEditorState() {
  saveToStorage(STORAGE_KEY_EDITOR, gEditor)
}
