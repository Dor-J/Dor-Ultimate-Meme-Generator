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
  setActiveLine(newLine.id)
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
  setActiveLine(lines[nextIndex].id)
  saveEditorState()
}

function updateActiveLineText(text) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineText(activeLine.id, text)
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

function updateActiveLineAlignment(alignment) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineAlignment(activeLine.id, alignment)
    saveEditorState()
  }
}

function updateActiveLineFont(fontFamily) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFontFamily(activeLine.id, fontFamily)
    saveEditorState()
  }
}

function updateActiveLineStrokeColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineStrokeColor(activeLine.id, color)
    saveEditorState()
  }
}

function updateActiveLineFillColor(color) {
  const activeLine = getActiveLine()
  if (activeLine) {
    updateLineFillColor(activeLine.id, color)
    saveEditorState()
  }
}

function setEditorColor(color = '#000000') {
  gEditor.color = color
}

function setEditorRadius(radius = 5) {
  gEditor.radius = radius
}

function _createEditor() {
  return {
    text: '',
    fontSize: 5,
    radius: 5,
    fontFamily: 'ariel',
    strokeColor: '',
    fillColor: '',
    lines: [],
    activeLineId: null,

    //TODO: finish all parameters
  }
}

function saveEditorState() {
  saveToStorage(STORAGE_KEY_EDITOR, gEditor)
}
