// js/picture.controller.js
'use strict'

function onInitPictures() {
  renderPics()
  renderSavedPics()
}

// RENDER PICs
function renderPics() {
  const pics = getPics()

  if (!pics) return

  const strHTMLs = pics
    .map((pic, idx) => {
      return `
          <article class="card card-pic">
            <div class="pic-holder ma-bl-en-05">
              <img src="${pic.url}" alt="${idx + 1}" />
            </div>
            <div class="pic-btns flex f-ai-center f-jc-center f-gap-05">
              <button 
              type="button" 
              data-idx="${idx}" 
              data-id="${pic.id}" 
              class="btn btn-display" 
              onclick="onSelectPic(event)">
                Display
              </button>
              <button 
              type="button" 
              data-idx="${idx}" 
              data-id="${pic.id}" 
              class="btn btn-remove" 
              onclick="onRemovePic(event)">
                Remove
              </button>
            </div>
          </article>`
    })
    .join('')

  const elPicsGrid = document.querySelector('section.pics-gallery .pics-grid')
  elPicsGrid.innerHTML = ''
  elPicsGrid.innerHTML = strHTMLs
}

// UPLOAD NEW PIC
function onUploadPic(ev) {
  //TODO:
  onImgInput(ev)
  addSavedPic()
  renderSavedPics()
}

// REMOVE PIC
function onRemovePic(ev) {
  removePic(ev.target.dataset.id)
  renderPics()
}

// SELECTED PIC TO CANVAS
function onSelectPic(ev) {
  const pic = getPicById(ev.target.dataset.id)

  let image = new Image()
  const srcStr = pic.url
  image.src = srcStr
  image.onload = function () {
    renderMeme(image)
  }
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
}

function onSelectSavedPic(picId) {
  const pic = getSavedPicById(picId)
  const dataUrl = pic.data

  let image = new Image()
  image.onload = function () {
    renderMeme(image)
  }
  image.src = dataUrl
}
