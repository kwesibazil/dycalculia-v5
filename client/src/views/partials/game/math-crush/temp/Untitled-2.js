import animation from './animation'

/**
 * @param {Array} grid	empty array that will contains each game tile present on the board
 * @desc   loops through document and find each element with class tile-container
 *         add data-amount attr to each element 
 *         then push each element to the grid array 
 */
const createGrid = grid => {
  const tiles = document.getElementsByClassName('tile-container')
  Array.from(tiles).forEach(tile =>{
    tile.firstElementChild.setAttribute('data-amount', 0)
    grid.push(tile)
  })
}


/** 
*   @param {Array} tiles  array of elements that needs a needs value
    @param {object[]} values  list of possible css class from which to generate random  tile
    @desc loops through each tile and assign a random amount and corresponding css class
*/
const newTiles = (tiles, values, addOn = false) => {
  tiles.forEach(tile => {
    try{
      const rand =  Math.floor(Math.random() * values.length)
      const elem = tile.firstElementChild
      const amount = parseInt(tile.firstElementChild.dataset.amount)
      
      if(amount !== 0)throw new Error
  
      elem.removeAttribute('class')
      elem.setAttribute('data-amount', values[rand].amount)
      elem.classList.add('coin', values[rand].css)
      if(addOn)elem.classList.add('invisible')
    }catch{
      tile.classList.add('bg-white')
      console.log('failed to create tile');
    }
  })
}


/**
 *  @param {object} stats contains current information like number of points awarded, lvl, & target to match
 *  @param {Array} grid	array containing each game tile present on the board
 *  @desc loops through the grid and finds any pair of 3 that matches the target value
 *  @return {boolean} if points is greater than 0 return TRUE else return FALSE                    
*/
const findStreak = (stats, grid) => {
  let points = 0 
  for(let i=0; i<62; i++){
      let total = 0, row = [i, i+1, i+2]
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
      if (inValid.includes(i)) continue
      row.forEach(index => total+= parseInt(grid[index].firstElementChild.dataset.amount))
      if(total === stats.target) points += addPoints(row, stats.points, grid)
    }
  
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(grid[index].firstElementChild.dataset.amount))
      if(total === stats.target)points += addPoints(col, stats.points, grid)
    }

    console.log('leaving findStreak');
    if(stats.firstMove) stats.score += points
    return  points > 0 ? true : false
}


/**
 *   @param {Array} streak contains the ID of corresponding rows or column that a match was found
 *   @param {Integer} points the number of points awarded for each match found
 *   @param {Array} grid	an array containing each game tile present on the board
 *   @desc loops each streak and set the current tile amount to 0 and add CSS class Marked
 *   @return points the number of points awarded for each round
*/


const addPoints =  (streak, points, grid) => {
  console.log('add points');

  streak.forEach(id => {
    const target = grid[id].firstElementChild
    target.dataset.amount = 0
    target.classList.add('marked')
  })
  return points
}


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





  
const startAnimation = () =>{
  let markedArr = [], replaceArr = [],  validArr = [], invalidArr = [], updateArr = []

  replacementTiles(replaceArr, validArr)
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





















const findReplaceTiles = (tiles, grid) => {
  //console.log('find replace tiles');
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
  startAnimation,
  invalidMove,resetTiles, updateTiles,newTiles,
}

export default crush