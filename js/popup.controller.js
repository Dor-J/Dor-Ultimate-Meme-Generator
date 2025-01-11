// js/popup.controller.js
'ues strict'
let popupTimeoutId = null //to avoid conflicts

function renderPopup(status) {
  //status: add, delete, save, download,uploaded
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
  const popupContainer = document.querySelector('.popup-container')
  const popupMessage = document.querySelector('.popup-message')
  const popupHeader = document.querySelector('.popup-header')

  popupHeader.textContent = header
  popupMessage.textContent = message

  if (popupTimeoutId) {
    clearTimeout(popupTimeoutId)
  }

  popupContainer.classList.remove('hiddenX')
  popupContainer.classList.add('show')

  popupTimeoutId = setTimeout(() => {
    closePopup()
  }, timeout)
}

function closePopup() {
  const popupContainer = document.querySelector('.popup-container')

  popupContainer.classList.remove('show')
  popupContainer.classList.add('hidden')
}
