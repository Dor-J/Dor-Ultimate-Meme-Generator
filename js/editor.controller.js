// js/editor.controller.js
'use strict'

function updateEditorUI() {
  const editor = getEditor()
  if (!editor) return

  document.querySelector('#text-input').value = editor.text

  updateEditorActiveAlign()

  updateFontFamilyPicker(editor.fontFamily)

  document.querySelector('.stroke-color-input').value = editor.strokeColor
  document.querySelector('.icon-palette').style.color = editor.strokeColor

  document.querySelector('.fill-color-input').value = editor.fillColor
  document.querySelector('.icon-brush').style.color = editor.fillColor
}

function updateEditorActiveAlign(alignment) {
  const elAlignBtnLeft = document.querySelector('.btn-align-left')
  const elAlignBtnRight = document.querySelector('.btn-align-right')
  const elAlignBtnJustify = document.querySelector('.btn-align-justify')
  const elAlignBtnCenter = document.querySelector('.btn-align-center')

  elAlignBtnLeft.classList.remove('active-alignment')
  elAlignBtnRight.classList.remove('active-alignment')
  elAlignBtnJustify.classList.remove('active-alignment')
  elAlignBtnCenter.classList.remove('active-alignment')

  switch (alignment) {
    case 'left':
      elAlignBtnLeft.classList.add('active-alignment')
      break
    case 'right':
      elAlignBtnRight.classList.add('active-alignment')
      break
    case 'justify':
      elAlignBtnJustify.classList.add('active-alignment')
      break
    default:
      //center
      elAlignBtnCenter.classList.add('active-alignment')
  }
}

function updateFontFamilyPicker(fontFamily) {
  const elFontFamilyPicker = document.querySelector('.font-family-picker')
  const options = Array.from(elFontFamilyPicker.options)

  const fontFamilyIdx = options.find((option) => option.value === fontFamily)

  if (fontFamilyIdx !== -1) {
    elFontFamilyPicker.selectedIndex = fontFamilyIdx
  }
}

function onSetText(elTextInput) {
  const text = elTextInput.value.trim()
  if (!text) return
  const line = getActiveLine()
  if (line && line.type === 'text') {
    updateActiveLineText(text)
    renderCanvas()
  }
}
function onSetRandomText(wordCount) {
  const text = makeLorem(wordCount).trim()
  if (!text) return
  const line = getActiveLine()
  if (line && line.type === 'text') {
    updateActiveLineText(text)
    renderCanvas()
  }
}

function onSwitchLine() {
  switchToNextLine()
  updateEditorUI()
  renderCanvas()
}

function onAddLine() {
  addNewLine()
  updateEditorUI()
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
  renderCanvas(true)
  downloadMeme(elLink)
  renderCanvas()
}

function onShareMeme(ev) {
  ev.preventDefault()
  renderCanvas(true)
  shareMeme(ev)
  renderCanvas()
}

function onSaveMeme(ev) {
  ev.preventDefault()
  const elCanvas = getElCanvas()
  renderCanvas(true)
  const dataUrl = elCanvas.toDataURL()
  addSavedPic(dataUrl)
  renderCanvas()
  renderSavedPics()
}
