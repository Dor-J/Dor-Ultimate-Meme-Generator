// js/meme.controller.js
'use strict'

function onInit() {
  onInitCanvas()
  onInitPictures()
  addEventListeners()
  onResize()
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open')
}

function addEventListeners() {
  window.addEventListener('resize', onResize)

  const elCanvas = document.querySelector('.canvas-container canvas')
  elCanvas.addEventListener('mousedown', onDown)
  elCanvas.addEventListener('mousemove', onMove)
  elCanvas.addEventListener('mouseup', onUp)
  elCanvas.addEventListener('touchstart', onDown)
  elCanvas.addEventListener('touchmove', onMove)
  elCanvas.addEventListener('touchend', onUp)

  document
    .querySelector('.btn-toggle-menu')
    .addEventListener('click', onToggleMenu)

  document
    .querySelector('#text-input')
    .addEventListener('input', () => onChangeText(textInput))

  document
    .querySelector('.btn-switch-inputs')
    .addEventListener('click', onSwitchLine)

  document.querySelector('.btn-add-line').addEventListener('click', onAddLine)

  document
    .querySelector('.btn-delete-line')
    .addEventListener('click', onDeleteLine)

  document
    .querySelector('.btn-increace-font')
    .addEventListener('click', () => onUpdateLineSize(1))

  document
    .querySelector('.btn-decrease-font')
    .addEventListener('click', () => onUpdateLineSize(-1))

  document
    .querySelector('.btn-align-left')
    .addEventListener('click', () => onSetAlignment('left'))

  document
    .querySelector('.btn-align-center')
    .addEventListener('click', () => onSetAlignment('center'))

  document
    .querySelector('.btn-align-right')
    .addEventListener('click', () => onSetAlignment('right'))

  document
    .querySelector('.btn-align-justify')
    .addEventListener('click', () => onSetAlignment('justify'))

  const elFontPicker = document.querySelector('.font-family-picker')
  elFontPicker.addEventListener('change', () => onSetFont(elFontPicker))

  const elStrokeInput = document.querySelector('.stroke-color-input')
  elStrokeInput.addEventListener('input', () => onSetStrokeStyle(elStrokeInput))

  const elFillInput = document.querySelector('.fill-color-input')
  elFillInput.addEventListener('input', () => onSetFillStyle(elFillInput))

  document
    .querySelector('.btn-save')
    .addEventListener('click', (ev) => onSaveMeme(ev))

  document
    .querySelector('.btn-download')
    .addEventListener('click', (ev) => onDownloadMeme(ev.currentTarget))

  document
    .querySelector('.btn-share')
    .addEventListener('click', (ev) => onShareMeme(ev))

  document.querySelector('.backdrop').addEventListener('click', onToggleMenu)
}
