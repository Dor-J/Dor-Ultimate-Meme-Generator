// js/services/storage.service.js
'use strict'

function saveToStorage(key, value) {
  var json = JSON.stringify(value)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  var json = localStorage.getItem(key)
  return JSON.parse(json)
}

function removeFromStorage(key) {
  localStorage.removeItem(key)
}
