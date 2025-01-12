// js/services/keywords.service.js
'use strict'

var gKeywordsMap = {}
var gKeywordBoxes = []

function getKeywordBoxes() {
  return gKeywordBoxes
}

function clearKeywordBoxes() {
  return (gKeywordBoxes = [])
}

function addKeywordBox(keywordBox) {
  gKeywordBoxes.push(keywordBox)
}

function getKeywordsMap() {
  if (Object.keys(gKeywordsMap).length === 0) {
    gKeywordsMap = getKeywordCountMap()
  }
  return gKeywordsMap
}

function getPicByKeywords(keyword) {
  const searchTerm = keyword.trim().toLowerCase()
  const picsByKeywords = gPictures.filter((pic) => {
    // return pic.keywords.includes(keyword) // less fuzzy
    return pic.keywords.some((keywordItem) =>
      keywordItem.toLowerCase().includes(searchTerm)
    )
  })
  return picsByKeywords
}

function getKeywordCountMap() {
  const keywordCountMap = gPictures.reduce((acc, pic) => {
    const currKeywords = pic.keywords
    currKeywords.forEach((keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1
    })
    return acc
  }, {})
  return keywordCountMap
}
