import animation from './animation'









const validMoves = tiles => {
  let moves = [tiles.source.id - 1, tiles.source.id + 1, tiles.source.id+ 8, tiles.source.id - 8]
  let valid = moves.includes(tiles.dest.id)

  if(valid){
    swapAmount(tiles)
    animation.swap(tiles)
    resetTiles(tiles)
  }
  else invalidMove(tiles)
}






  
const  = () =>{
  
  let markedArr = [], replaceArr = [],  validArr = [], invalidArr = [], updateArr = []

  replaceArr = [...new Set(replaceArr)]
  validArr = [...new Set(validArr)]
  crush.calculateDown(validArr, game.grid)


  animation.growAndExplode(markedArr)
  animation.drop(validArr)
  
    setTimeout(()=>{
      console.log('get setTimeout');
      crush.findReplaceTiles(replaceArr, game.grid)
      crush.getTilesByClassName(invalidArr, 'replace')
      crush.getTilesByClassName(updateArr, 'update')
      crush.updateTiles(updateArr)
      crush.newTiles(invalidArr, values, true)
      animation.removeTranslate(validArr)
      animation.rotateAndAppear(invalidArr)
      animation.removeAnimation(replaceArr)
    },1800)  
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



const crush = {
  swapAmount, swapImg, addHoverCss, validMoves,
  findReplaceTiles, getTilesByClassName,
  createGrid, findStreak, calculateDown, 
  invalidMove,resetTiles, updateTiles,newTiles,
}

export default crush