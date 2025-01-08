// js/services/canvas.service.js
'use strict'

var gElCanvas = null
var gCtx = null

function setCanvas() {
  console.log('setCanvas activated')
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')
}

function getElCanvas() {
  return gElCanvas
}
function getCtx() {
  return gCtx
}
