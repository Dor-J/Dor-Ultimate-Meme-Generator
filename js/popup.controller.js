// js/popup.controller.js
'ues strict'
let popupTimeoutId = null //to avoid conflicts

function renderPopup(status) {
  //status: string name of event
  let headerMessage = ''
  let message = ''

  switch (status) {
    case 'add':
      headerMessage = 'Add New Line'
      message = 'New line added successfully!'
      break

    case 'delete':
      headerMessage = 'Delete Line'
      message = 'Line deleted successfully!'
      break

    case 'removed':
      headerMessage = 'Meme Removed'
      message = 'Meme removed successfully!'
      break

    case 'save':
      headerMessage = 'Save Picture'
      message = 'Picture saved successfully!'
      break

    case 'download':
      headerMessage = 'Download Picture'
      message = 'Picture downloaded successfully!'
      break

    case 'uploaded':
      headerMessage = 'Upload Picture'
      message = 'Picture uploaded successfully!'
      break

    case 'random':
      headerMessage = 'Random Meme'
      message = 'Random meme generated successfully!'
      break

    case 'selected':
      headerMessage = 'Meme selected'
      message = 'Meme selected, moving to generator!'
      break

    default:
      headerMessage = 'Notification'
      message = 'An action was performed.'
  }

  showPopup(headerMessage, message)
}

function showPopup(header, message, timeout = 3000) {
  const elPopupContainer = document.querySelector('.popup-container')
  const elPopupHeader = document.querySelector('.popup-header')
  const elPopupMessage = document.querySelector('.popup-message')

  elPopupHeader.textContent = header
  elPopupMessage.textContent = message

  if (popupTimeoutId) {
    clearTimeout(popupTimeoutId)
  }

  elPopupContainer.classList.remove('hidden')
  elPopupContainer.style.display = 'grid'
  elPopupContainer.classList.remove('hide')
  elPopupContainer.classList.add('show')

  popupTimeoutId = setTimeout(() => {
    closePopup()
  }, timeout)
}

function closePopup() {
  const elPopupContainer = document.querySelector('.popup-container')

  elPopupContainer.classList.remove('show')
  elPopupContainer.classList.add('hide')
  setTimeout(() => {
    const elPopupContainer = document.querySelector('.popup-container')
    elPopupContainer.classList.remove('hide')
    elPopupContainer.style.display = 'none'
    elPopupContainer.classList.add('hidden')
  }, 1000)
}
