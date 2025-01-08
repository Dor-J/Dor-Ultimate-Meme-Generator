// js/picture.controller.js
'use strict'

function renderPics(isSaved = false) {
  const pics = isSaved ? getSavedPics() : getPics()

  const strHTMLs = pics
    .map((pic) => {
      return `
          <div class="pic-display">
            <div class="pic-container">
              <canvas width="220" height="220" data-id="${pic.picID}"></canvas>
            </div>
            <div class="pic-btns flex align-center gap-1">
              <button type="button" data-id="${pic.picID}" class="btn btn-display" onclick="onSelectPic('${pic.picID}')">
                Display
              </button>
              <button type="button" data-id="${pic.picID}" class="btn btn-remove" onclick="onRemovePic('${pic.picID}')">
                Remove
              </button>
            </div>
          </div>`
    })
    .join('')

  const selector = isSaved ? 'section.saved' : 'section.pics-gallery'
  const elPicsGrid = document.querySelector(`${selector} .pics-grid`)
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

function onSavePic() {
  const dataUrl = gElCanvas.toDataURL()
  addPic(dataUrl)
  renderPics()
}

function onRemovePic(picId) {
  removePic(picId)
  renderPics()
}

function onSelectPic(picId) {
  const pic = getPicById(picId)
  const dataUrl = pic.data

  let image = new Image()
  image.onload = function () {
    renderImg(image)
  }
  image.src = dataUrl
  renderImg(image)
}
