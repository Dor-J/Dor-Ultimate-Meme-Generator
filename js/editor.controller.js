// js/editor.controller.js
'use strict'

function onChangeText(elTextInput) {
  const text = elTextInput.value.trim()
  if (!text) return
  const line = getActiveLine()
  if (line && line.type === 'text') {
    updateActiveLineText(text)
    renderCanvas()
  }
}

function onSwitchLine() {
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

function onSelectEmoji(elEmoji) {
  elEmoji.classList.add('selected-emoji')
  addEmojiLine(elEmoji.innerText)
  updateEditorUI()
  renderCanvas()
  setTimeout(() => {
    const elSelectedEmoji = document.querySelector('.emoji.selected-emoji')
    elSelectedEmoji.classList.remove('selected-emoji')
  }, 2000)
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
