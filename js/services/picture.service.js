// js/services/picture.service.js
'use strict'

const STORAGE_KEY_PIC = 'picMemeDB'
const STORAGE_KEY_SAVED = 'savedMemeDB'
var gPictures = loadFromStorage(STORAGE_KEY_PIC) || []
var gSavedPictures = loadFromStorage(STORAGE_KEY_SAVED) || []

function getPics() {
  return gPictures
}

function getSavedPics() {
  return gSavedPictures
}

function removePic(picId) {
  const idx = gPictures.findIndex((pic) => pic.picID === picId)
  if (idx === -1) return
  gPictures.splice(idx, 1)
  _savePicsToStorage()
}

function addPic(data) {
  const pic = _createPic(data)
  gPictures.push(pic)
  _savePicsToStorage()
}

function getPicById(picId) {
  return gPictures.find((pic) => pic.picID === picId)
}

function _createPic(data) {
  return { picID: makeId(6), data }
}

function _savePicsToStorage() {
  saveToStorage(STORAGE_KEY, gPictures)
}
