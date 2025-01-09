// js/editor.controller.js
'use strict'

function onAddTxt(elTextInput) {
  // TODO:
  const text = elTextInput.value.trim()
  if (!text) return

  if (!getActiveLine()) onAddLine()
  updateActiveLineText(text)

  renderCanvas()
}

function onChangeText(elTextInput) {
  // TODO:
  const text = elTextInput.value
  if (getActiveLine()) {
    updateActiveLineText(text)
    renderCanvas()
  }
}
function onSwitchLine() {
  // TODO:
  switchToNextLine()
  renderCanvas()
}

function onAddLine() {
  addNewLine()
  renderCanvas()
}

function onDeleteLine() {
  deleteActiveLine()
  renderCanvas()
}

function onUpdateLineSize(diff) {
  //diff: 1 , -1
  if (getActiveLine()) {
    updateActiveLineFontSize(diff)
    renderCanvas()
  }
}
function onSetAlignment(alignment) {
  //alignment: left, center, right, justify
  if (getActiveLine()) {
    updateActiveLineAlignment(alignment)
    renderCanvas()
  }
}
function onSetFont(elFontPicker) {
  if (getActiveLine()) {
    updateActiveLineFont(elFontPicker.value)
    renderCanvas()
  }
}
function onSetStrokeStyle(elStrokeColorInput) {
  if (getActiveLine()) {
    updateActiveLineStrokeColor(elStrokeColorInput.value)
    renderCanvas()
  }
}
function onSetFillStyle(elFillColorInput) {
  if (getActiveLine()) {
    updateActiveLineFillColor(elFillColorInput.value)
    renderCanvas()
  }
}

// SAVE, DOWNLOAD, SOCIAL
function onDownloadMeme(elLink) {
  downloadMeme(elLink)
}

function onShareMeme(ev) {
  ev.preventDefault()
  shareMeme(ev)
}

function onSaveMeme(ev) {
  ev.preventDefault()
  const elCanvas = getElCanvas()
  const dataUrl = elCanvas.toDataURL()
  addSavedPic(dataUrl)
  renderSavedPics()
}
