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
  if (!gKeywordsMap || gKeywordsMap.length !== 0) {
    gKeywordsMap = getKeywordCountMap()
  }
  return gKeywordsMap
}

function getPictureByKeywords(keyword) {
  const searchTerm = keyword.trim().toLowerCase()
  const picturesByKeywords = gPictures.filter((pic) => {
    // return pic.keywords.includes(keyword) // less fuzzy
    return pic.keywords.some((keywordItem) =>
      keywordItem.toLowerCase().includes(searchTerm)
    )
  })
  return picturesByKeywords
}

function getAllUniqueKeywords() {
  const allKeywords = gPictures.reduce((acc, pic) => {
    const currKeywords = pic.keywords
    acc.add(...currKeywords)
    return acc
  }, new Set())
  return allKeywords
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
