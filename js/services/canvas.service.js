// js/services/canvas.service.js
'use strict'

let gElCanvas
let gCtx

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
