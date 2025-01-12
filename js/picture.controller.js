// js/picture.controller.js
'use strict'

function onInitPictures() {
  renderPics()
  renderSavedPics()
  renderKeywordsCanvas()
}

// RENDER PICs
function renderPics(filteredPics = null) {
  const elPicsGrid = document.querySelector('section.pics-gallery .pics-grid')
  let pics = null
  if (filteredPics) {
    if (filteredPics.length > 0) {
      pics = filteredPics
    } else {
      elPicsGrid.innerHTML = '<p>No results found.</p>'
    }
  } else {
    {
      pics = getPics()
    }
  }

  if (!pics) {
    elPicsGrid.innerHTML = '<p>No results found.</p>'
    return
  }

  const strHTMLs = pics
    .map((pic, idx) => {
      return `
          <article class="card card-pic">
            <div class="pic-holder">
              <img src="${pic.url}" 
              alt="${idx + 1}" 
              data-idx="${idx}" 
              data-id="${pic.id}" 
              onclick="onSelectPic(event)">
            </div>
          </article>`
    })
    .join('')

  elPicsGrid.innerHTML = ''
  elPicsGrid.innerHTML = strHTMLs
}

// UPLOAD NEW PIC
function onUploadPic(ev) {
  const fileInput = ev.target
  if (!fileInput.files || !fileInput.files[0]) return

  onImgInput(fileInput)
  renderSavedPics()
  renderCanvas()
  onNavGenerator()
  onResize()
  renderPopup('uploaded')
}

// REMOVE PIC
function onRemovePic(ev) {
  // not in use
  removePic(ev.target.dataset.id)
  renderPics()
  renderPopup('removed')
}

// SELECTED PIC TO CANVAS
function onSelectPic(ev) {
  const pic = getPicById(ev.target.dataset.id)

  let image = new Image()
  const srcStr = pic.url
  image.src = srcStr
  image.onload = function () {
    setCurrentImage(image)
    renderMeme(image)
  }
  onNavGenerator()
  onResize()
  renderPopup('selected')
}

function onSelectPicById(picId) {
  const pic = getPicById(picId)

  let image = new Image()
  const srcStr = pic.url
  image.src = srcStr
  image.onload = function () {
    resetLines()
    setCurrentImage(image)
    renderMeme(image)
  }
  onNavGenerator()
  onResize()
}

function onRandomMeme() {
  const pics = getPics()
  if (!pics) return

  const randIdx = getRandomIntInclusive(0, pics.length - 1)
  const randPic = pics.at(randIdx)
  const editor = getEditor()
  onSelectPicById(randPic.id)
  resetLines()
  onSetRandomText(6)
  renderPopup('random')
}

///////////////////////////////////////////////

// RENDER SAVED PICs
function renderSavedPics() {
  const pics = getSavedPics()

  const strHTMLs = pics
    .map((pic, idx) => {
      return `
          <div class="pic-display">
            <div class="pic-container grid g-pi-center ma-bl-en-05">
              <canvas width="220" height="220" data-id="${pic.id}"></canvas>
            </div>
            <div class="pic-btns flex f-ai-center f-jc-center f-gap-05">
              <button type="button" 
                data-idx="${idx}" 
                data-id="${pic.id}" 
                class="btn btn-display" 
                onclick="onSelectSavedPic('${pic.id}')"
              >
                Display
              </button>
              <button type="button" 
              data-idx="${idx}" 
              data-id="${pic.id}" 
              class="btn btn-remove" 
              onclick="onRemoveSavedPic('${pic.id}')"
              >
                Remove
              </button>
            </div>
          </div>`
    })
    .join('')

  const elPicsGrid = document.querySelector('section.saved .pics-grid')
  elPicsGrid.innerHTML = ''
  elPicsGrid.innerHTML = strHTMLs

  pics.forEach((pic) => {
    const image = new Image()
    image.src = pic.data

    const canvas = elPicsGrid.querySelector(`canvas[data-id="${pic.id}"]`)
    const ctx = canvas.getContext('2d')

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
  })
}

function onRemoveSavedPic(picId) {
  removeSavedPic(picId)
  renderSavedPics()
  renderPopup('removed')
}

function onSelectSavedPic(picId) {
  const pic = getSavedPicById(picId)
  const dataUrl = pic.data

  let image = new Image()
  image.onload = function () {
    resetLines()
    setCurrentImage(image)
    renderMeme(image)
  }
  image.src = dataUrl

  onNavGenerator()
  onResize()
  renderPopup('selected')
}

//////////////////////////////////////

// FILTER
function onSearchPics(ev) {
  const keyword = ev.target.value.trim().toLowerCase()
  if (!keyword) return renderPics() // If empty, render all pictures

  const filteredPics = getPicByKeywords(keyword)
  renderPics(filteredPics)
}

function onResetSearch() {
  const searchInput = document.getElementById('meme-search')
  searchInput.value = '' // Clear search input
  renderPics()
}
