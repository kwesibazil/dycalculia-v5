


const findReplaceTiles = (tiles, grid) => {
  console.log('find replace tiles');
  const gridTop = [0,1,2,3,4,5,6,7]
  tiles.forEach(tile => {
    const tileID = parseInt(tile.getAttribute('id'))
    let currentID = tileID
    while(currentID >= 0){
      currentID -= 8
      if(gridTop.includes(tileID) || currentID < 0){    //reach the top || gone out of bounce
        tile.firstElementChild.classList.add('replace') 
        break
      }
      if(parseInt(grid[currentID].firstElementChild.dataset.amount) > 0){
        tile.firstElementChild.dataset.amount = grid[currentID].firstElementChild.dataset.amount
        grid[currentID].firstElementChild.dataset.amount = 0
        tile.firstElementChild.classList.add( 'update') 
        break
      }
    }
  })
}



const replacementTiles = (replaceArr, validArr) => {
  const markedTiles = document.getElementsByClassName('marked')
  Array.from(markedTiles).forEach(tile => markedArr.push(tile))
  markedArr.reverse()

  markedArr.forEach(tile => {
    let parentID = parseInt(tile.parentElement.getAttribute('id'))
    while(parentID >= 0){
      replaceArr.push(game.grid[parentID])
      if(parseInt(game.grid[parentID].firstElementChild.dataset.amount) > 0)validArr.push(game.grid[parentID])
      parentID -=8
    }
  })
}





const invalidMove = tiles => {
  tiles.source.square.classList.remove('selected')
  tiles.source.square = tiles.dest.square
  tiles.source.square.classList.add('selected')
  tiles.source.id = tiles.dest.id
  tiles.dest.id = null
  tiles.dest.square = null
}


const resetTiles = tiles => {
  console.log('reset source and dest tiles');
  setTimeout(() => {
    tiles.source.square.classList.remove('selected')
    tiles.source.square = null
    tiles.source.id = null
    tiles.dest.square = null
    tiles.dest.id = null
    tiles.alternate = true
  }, 1200)
}

const updateTiles = tiles => {
  console.log('update tiles');
  tiles.forEach(tile => {
    tile.firstElementChild.removeAttribute('class')
    const className = parseInt(tile.firstElementChild.dataset.amount)
    tile.firstElementChild.classList.add(...switchClassName(className))
  })
}

const switchClassName = className => {
  console.log('switch css');
  let css = ''
  switch(className) {
    case 10:
      css = ['coin', 'ten']
      break
    case 20:
      css = ['coin', 'twenty']
      break
    case 50:
      css = ['coin', 'fifty']
      break
    case 100:
      css = ['coin', 'one-hundred']
      break
    case 500:
      css = ['coin', 'five-hundred']
      break
    default:
      css = ['coin', 'bg-dark']
      break
  }
  return css
}

const getTilesByClassName = (arr, className) =>{
  const classTiles = document.getElementsByClassName(className)
  Array.from(classTiles).forEach(tile => arr.push(tile.parentElement))
}

const addHoverCss = () => {
  const tiles = document.getElementsByClassName('tile-container')
  Array.from(tiles).forEach(tile =>tile.firstElementChild.classList.add('hvr-grow'))
}

const swapAmount = tiles => {
  console.log('swap amounts');
  const temp = tiles.source.square.firstElementChild.dataset.amount
  tiles.source.square.firstElementChild.dataset.amount = tiles.dest.square.firstElementChild.dataset.amount
  tiles.dest.square.firstElementChild.dataset.amount = temp
}

const swapImg = tiles => {
  console.log('swap images');
  for (const prop in tiles) {
    if(prop == 'alternate')continue
    const elem =  tiles[prop].square.firstElementChild
    elem.removeAttribute('class', 'style')
    tiles[prop].square.firstElementChild.classList.add('hvr-grow', ...switchClassName(parseInt(elem.dataset.amount)))
  }
}


const addPoints =  (streak, points, grid) => {
  console.log('add points');
  streak.forEach(id => {
    const target = grid[id].firstElementChild
    target.dataset.amount = 0
    target.classList.add('marked')
  })
  return points
}
