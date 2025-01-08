// js/services/upload.service.js
'use strict'

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', 'webify')
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    onSuccess(data.secure_url)
  } catch (err) {
    console.error(err)
  }
}

function onDownloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  elLink.download = 'That-thing-you-draw'
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  // document.querySelector('.share-container').innerHTML = ''
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = () => {
      onImageReady(img)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }

  uploadImg(canvasData, onSuccess)
}
