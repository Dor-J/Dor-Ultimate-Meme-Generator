// js/services/upload.service.js
'use strict'

async function uploadMeme(imgData, onSuccess) {
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

function onDownloadMeme(elLink) {
  const elCanvas = getElCanvas()
  const dataUrl = elCanvas.toDataURL()
  elLink.href = dataUrl
  elLink.download = 'That-thing-you-draw'
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderMeme)
}

function loadImageFromInput(ev, onImageReady) {
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

function renderMeme(img) {
  const elCanvas = getElCanvas()
  const ctx = getCtx()

  elCanvas.height = (img.naturalHeight / img.naturalWidth) * elCanvas.width
  ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
}

function onUploadMeme(ev) {
  ev.preventDefault()
  const elCanvas = getElCanvas()
  const canvasData = elCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    )
  }

  uploadMeme(canvasData, onSuccess)
}
