// js/meme.controller.js
'use strict'

function onInit() {
  console.log('Starting meme generator')
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

  const canvas = document.querySelector('.canvas-container canvas')
  canvas.addEventListener('mousedown', onDown)
  canvas.addEventListener('mousemove', onMove)
  canvas.addEventListener('mouseup', onUp)
  canvas.addEventListener('touchstart', onDown)
  canvas.addEventListener('touchmove', onMove)
  canvas.addEventListener('touchend', onUp)
}
