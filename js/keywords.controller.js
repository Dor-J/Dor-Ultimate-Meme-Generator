'use strict'

function renderKeywordsCanvas() {
  const elContainer = document.querySelector('.keywords-search')
  const elCanvas = document.querySelector('.keywords-canvas canvas')
  const ctx = elCanvas.getContext('2d')
  const keywordsMap = getKeywordsMap()
  const keywords = Object.keys(keywordsMap)

  elCanvas.width = elContainer.clientWidth
  elCanvas.height = 100

  ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

  const fontSizeBase = 10
  let x = 10,
    y = 10

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
    keywordsMap[keyword] += 1
  } else {
    // if not in map init it
    keywordsMap[keyword] = 2
  }

  renderKeywordsCanvas()
  onSearchPics({ target: elSearchInput })
}
