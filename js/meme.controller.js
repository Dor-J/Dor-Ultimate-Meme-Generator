// js/meme.controller.js
'use strict'

function onInit() {
  onInitCanvas()
  onInitPictures()
  addEventListeners()
  onResize()
}

function addEventListeners() {
  //BODY
  window.addEventListener('resize', onResize)

  // NAV
  document.querySelector('.nav-gallery').addEventListener('click', onNavGallery)

  document
    .querySelector('.nav-generator')
    .addEventListener('click', onNavGenerator)

  document.querySelector('.nav-saved').addEventListener('click', onNavSaved)

  document
    .querySelector('.nav-about')
    .addEventListener('click', closeToggleMenu)

  //KEYWORDS
  document
    .querySelector('.keywords-canvas canvas')
    .addEventListener('click', onKeywordCanvasClick)

  // CANVAS
  const elCanvas = document.querySelector('.canvas-container canvas')
  elCanvas.addEventListener('mousedown', onDown)
  elCanvas.addEventListener('mousemove', onMove)
  elCanvas.addEventListener('mouseup', onUp)
  elCanvas.addEventListener('touchstart', onDown, { passive: false })
  elCanvas.addEventListener('touchmove', onMove, { passive: false })
  elCanvas.addEventListener('touchend', onUp)

  // TOGGLE BTN
  document
    .querySelector('.btn-toggle-menu')
    .addEventListener('click', onToggleMenu)

  // EDITOR
  document.querySelector('#text-input').addEventListener('input', (ev) => {
    onSetText(ev.target)
  })

  document
    .querySelector('.btn-switch-lines')
    .addEventListener('click', onSwitchLine)

  document.querySelector('.btn-add-line').addEventListener('click', onAddLine)

  document
    .querySelector('.btn-delete-line')
    .addEventListener('click', onDeleteLine)

  document
    .querySelector('.line-move-buttons .btn-move-line-up')
    .addEventListener('click', () => onMoveLine(-10))

  document
    .querySelector('.line-move-buttons .btn-move-line-down')
    .addEventListener('click', () => onMoveLine(10))

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

  const elEmojis = document.querySelectorAll('.emoji-list .emoji')
  elEmojis.forEach((elEmojis) => {
    elEmojis.addEventListener('click', (event) => onSelectEmoji(event.target))
  })

  //SAVE
  document
    .querySelector('.btn-save')
    .addEventListener('click', (ev) => onSaveMeme(ev))

  document
    .querySelector('.btn-download')
    .addEventListener('click', (ev) => onDownloadMeme(ev.currentTarget))

  document
    .querySelector('.btn-share')
    .addEventListener('click', (ev) => onShareMeme(ev))

  //BACKDROP
  document.querySelector('.backdrop').addEventListener('click', onToggleMenu)

  //FILTER
  document
    .querySelector('#meme-search')
    .addEventListener('input', (event) => onSearchPics(event))

  document
    .querySelector('.picture-filter form')
    .addEventListener('submit', (event) => event.preventDefault())

  document
    .querySelector('.picture-filter .btn-reset-filter')
    .addEventListener('click', (event) => onResetSearch(event))

  document
    .querySelector('#upload-filename')
    .addEventListener('change', (event) => onUploadPic(event))

  document.querySelector('.btn-random').addEventListener('click', onRandomMeme)
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open')
}

function onNavGallery() {
  hideAllSections()
  document.querySelector('section.pics-gallery').classList.remove('hidden')
}

function onNavGenerator() {
  hideAllSections()
  document.querySelector('section.meme-generator').classList.remove('hidden')
}

function onNavSaved() {
  hideAllSections()
  document.querySelector('section.saved').classList.remove('hidden')
}

function hideAllSections() {
  document.querySelector('section.pics-gallery').classList.add('hidden')
  document.querySelector('section.saved').classList.add('hidden')
  document.querySelector('section.meme-generator').classList.add('hidden')
  closeToggleMenu()
}

function closeToggleMenu() {
  document.body.classList.remove('menu-open')
}
