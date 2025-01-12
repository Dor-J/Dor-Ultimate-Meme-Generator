// js/keywords.controller.js
'use strict'

function renderKeywordsCanvas() {
  const elContainer = document.querySelector('.keywords-search')
  const elCanvas = document.querySelector('.keywords-canvas canvas')

  const ctx = elCanvas.getContext('2d')
  const keywordsMap = getKeywordsMap()
  const keywords = Object.keys(keywordsMap)

  elCanvas.width = elContainer.clientWidth

  elCanvas.height = getKeywordCanvasHeight()

  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

  const fontSizeBase = 10
  let x = 10,
    y = 20

  clearKeywordBoxes()

  keywords.forEach((keyword) => {
    const count = keywordsMap[keyword]
    const fontSize = fontSizeBase + count
    ctx.font = `${fontSize}px Arial`
    ctx.fillStyle = 'black'

    const textWidth = ctx.measureText(keyword).width
    const textHeight = fontSize

    if (x + textWidth > elCanvas.width - 15) {
      x = 10
      y += textHeight + 10
    }

    ctx.fillText(keyword, x, y)

    // store boxes for click event
    addKeywordBox({
      keyword,
      x,
      y: y - textHeight,
      width: textWidth,
      height: textHeight,
    })

    x += textWidth + 15
  })
}

function getKeywordCanvasHeight() {
  const elBody = document.body
  const bodyWidth = elBody.clientWidth

  let height = 50
  if (bodyWidth >= 1200) {
    height = 60
  } else if (bodyWidth < 1200 && bodyWidth >= 750) {
    height = 80
  } else if (bodyWidth < 750 && bodyWidth >= 600) {
    height = 100
  } else if (bodyWidth < 600 && bodyWidth >= 450) {
    height = 120
  } else if (bodyWidth < 450 && bodyWidth >= 350) {
    height = 140
  } else if (bodyWidth < 450 && bodyWidth >= 350) {
    height = 160
  } else height = 160

  return height
}

function onKeywordCanvasClick(ev) {
  const elCanvas = ev.target
  const rect = elCanvas.getBoundingClientRect()
  const keywordBoxes = getKeywordBoxes()

  const clickX = ev.clientX - rect.left
  const clickY = ev.clientY - rect.top

  for (let i = 0; i < keywordBoxes.length; i++) {
    // regular loop and not forEach so can end it faster
    const box = keywordBoxes[i]
    if (
      clickX >= box.x &&
      clickX <= box.x + box.width &&
      clickY >= box.y &&
      clickY <= box.y + box.height
    ) {
      onKeywordClicked(box.keyword)
      return
    }
  }
}

function onKeywordClicked(keyword) {
  const elSearchInput = document.querySelector('#meme-search')
  elSearchInput.value = keyword

  const keywordsMap = getKeywordsMap()
  if (keywordsMap[keyword] !== undefined) {
    keywordsMap[keyword] += 2
  } else {
    // if not in map init it
    keywordsMap[keyword] = 2
  }

  onSearchPics({ target: elSearchInput })
  renderKeywordsCanvas()
}
