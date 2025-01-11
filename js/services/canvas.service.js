// js/services/canvas.service.js
'use strict'

var gElCanvas = null
var gCtx = null
var gCurrentImage = null

//GET
function getElCanvas() {
  return gElCanvas
}

function getCtx() {
  return gCtx
}

function getCurrentImage() {
  return gCurrentImage
}

//SET
function setCanvas() {
  gElCanvas = document.querySelector('.canvas-container canvas')
  gCtx = gElCanvas.getContext('2d')
}

function setCurrentImage(image) {
  gCurrentImage = image
}
