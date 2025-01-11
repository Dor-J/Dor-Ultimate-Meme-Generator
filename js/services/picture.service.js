// js/services/picture.service.js
'use strict'

const STORAGE_KEY_PIC = 'picMemeDB'
const STORAGE_KEY_SAVED = 'savedMemeDB'
var gPictures = loadFromStorage(STORAGE_KEY_PIC) || []
var gSavedPictures = loadFromStorage(STORAGE_KEY_SAVED) || []

//GET PICS
function getPics() {
  if (gPictures.length === 0) {
    gPictures = _createPics()
  }
  return gPictures
}

//GET PIC BY ID
function getPicById(picId) {
  return gPictures.find((pic) => pic.id === picId)
}

//GET PIC BY IDX
function getPicByIdx(idx) {
  return gPictures[idx]
}

//ADD PIC
function addUploadedPic(img) {
  const pic = _createPic(img)
  gPictures.push(pic)
  _savePicsToStorage()
}

//REMOVE PIC
function removePic(picId) {
  const idx = gPictures.findIndex((pic) => pic.id === picId)
  if (idx === -1) return
  gPictures.splice(idx, 1)
  _savePicsToStorage()
}

//CREATE SAMPLE PICs
function _createPics() {
  const pics = []

  pics.push(_createPic('../images/imgs/1.jpg', 'funny', 'trump'))
  pics.push(_createPic('../images/imgs/2.jpg', 'cute', 'dog'))
  pics.push(_createPic('../images/imgs/3.jpg', 'cute', 'baby', 'dog'))
  pics.push(_createPic('../images/imgs/4.jpg', 'cute', 'cat'))
  pics.push(_createPic('../images/imgs/5.jpg', 'funny', 'success', 'kid'))
  pics.push(_createPic('../images/imgs/6.jpg', 'funny', 'history', 'aliens'))
  pics.push(_createPic('../images/imgs/7.jpg', 'funny', 'kid', 'eyes'))
  pics.push(_createPic('../images/imgs/8.jpg', 'oh really', 'wonka'))
  pics.push(_createPic('../images/imgs/9.jpg', 'laughing', 'kid'))
  pics.push(_createPic('../images/imgs/10.jpg', 'laughing', 'obama'))
  pics.push(_createPic('../images/imgs/11.jpg', 'akward', 'kiss', 'boxing'))
  pics.push(
    _createPic('../images/imgs/12.jpg', 'funny', 'akward', 'haim hecht')
  )
  pics.push(_createPic('../images/imgs/13.jpg', 'success', 'decaprio'))
  pics.push(
    _createPic('../images/imgs/14.jpg', 'omnius', 'morphius', 'oh really')
  )
  pics.push(_createPic('../images/imgs/15.jpg', 'funny', 'lotr'))
  pics.push(_createPic('../images/imgs/16.jpg', 'laughing', 'startrek'))
  pics.push(_createPic('../images/imgs/17.jpg', 'serious', 'putin'))
  pics.push(
    _createPic('../images/imgs/18.jpg', 'funny', 'toy story', 'everywhere')
  )

  return pics
}

//CREATE SAMPLE PICs
function _createPic(url, ...keywords) {
  return { id: makeId(6), url, keywords, type: 'image' }
}

function _savePicsToStorage() {
  saveToStorage(STORAGE_KEY_PIC, gPictures)
}

////////////////////////////////////////////

//GET SAVED PICS
function getSavedPics() {
  return gSavedPictures
}

//GET SAVED PIC
function getSavedPicById(picId) {
  return gSavedPictures.find((pic) => pic.id === picId)
}

//ADD SAVED PICS
function addSavedPic(data) {
  const pic = _createSavedPic(data)
  gSavedPictures.push(pic)
  _saveSavedPicsToStorage()
}

//UPPDATE SAVED PICS LINES
function updateSavedPicLines(picId, lines) {
  const pic = getSavedPicById(picId)
  pic.lines = lines
  _saveSavedPicsToStorage()
}

//REMOVE SAVED PIC
function removeSavedPic(picId) {
  const idx = gSavedPictures.findIndex((pic) => pic.id === picId)
  if (idx === -1) return
  gSavedPictures.splice(idx, 1)
  _saveSavedPicsToStorage()
}

function _createSavedPic(data) {
  return { id: makeId(6), data, lines: [] }
}

function _saveSavedPicsToStorage() {
  saveToStorage(STORAGE_KEY_SAVED, gSavedPictures)
}
