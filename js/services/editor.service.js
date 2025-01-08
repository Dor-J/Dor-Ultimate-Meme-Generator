// js/services/editor.service.js
'use strict'

const STORAGE_KEY_EDITOR = 'editorStateDB'
var gEditor = loadFromStorage(STORAGE_KEY_EDITOR) || {
  color: '#000000',
  size: 5,
}

function getEditor() {
  return gEditor
}

function setEditorColor(color = '#000000') {
  gEditor.color = color
}

function setEditorSize(size = 5) {
  gEditor.size = size
}

function setEditorActive(bool = false) {
  gEditor.isActive = bool
}

function isEditorActive() {
  return gEditor.isActive
}
