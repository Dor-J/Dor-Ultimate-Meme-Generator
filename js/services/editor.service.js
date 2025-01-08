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

function setEditorRadius(radius = 5) {
  gEditor.radius = radius
}

function _createEditor() {
  return {
    text: '',
    fontSize: 5,
    radius: 5,
    fontFamily: 'ariel',
    strokeColor: '',
    fillColor: '',

    //TODO: finish up
  }
}
