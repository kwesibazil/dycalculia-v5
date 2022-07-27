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
const newTiles = (tiles, values) => {
  tiles.forEach(tile => {
    try{
      const rand =  Math.floor(Math.random() * values.length)
      const elem = tile.firstElementChild
      const amount = parseInt(tile.firstElementChild.dataset.amount)
      
      if(amount !== 0) throw new Error

      elem.removeAttribute('class')
      elem.setAttribute('data-amount', values[rand].amount)
      elem.classList.add('coin', values[rand].css)
    }catch{
      console.log(tile);
      tile.classList.add('bg-danger')
      console.log('amount is not 0');
    }
  })
}


/**
 *   @param {object} stats contains current lvl information like points, lvl, target to match
 *   @param {Array} grid	array containing each game tile present on the board
 *   @desc loops through the grid and finds any pair of 3 that matches the target value
 *   @return points the current number or points obtained by the player
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
    return points
}



const addPoints =  (streak, points, grid) => {
  streak.forEach(id => {
    const target = grid[id].firstElementChild
    target.dataset.amount = 0
    target.classList.add('marked') 
  })
  return points
}


const calculateDown = (tiles, grid) => {
  tiles.forEach(tile => {
    let down = 0, tileID = parseInt(tile.getAttribute('id'))
    while(tileID < 64){
      const tileValue = parseInt(grid[tileID].firstElementChild.dataset.amount)
      if(tileValue === 0)down++
      tileID += 8
    }
    tile.firstElementChild.setAttribute('data-down', down)
  })
}

const findReplaceTiles = (tiles, grid) => {
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


const getTilesByClassName = (arr, className) =>{
  const classTiles = document.getElementsByClassName(className)
  Array.from(classTiles).forEach(tile => arr.push(tile))
}

const updateTiles = tiles => {
  tiles.forEach(tile => {
    tile.removeAttribute('class')
    const className = parseInt(tile.dataset.amount)

    switch(className) {
      case 10:
        tile.classList.add('coin', 'ten')
        break;
      case 20:
        tile.classList.add('coin', 'twenty')
        break;
      case 50:
        tile.classList.add('coin', 'fifty')
        break;
      case 100:
        tile.classList.add('coin', 'one-hundred')
        break;
      case 500:
        tile.classList.add('coin', 'five-hundred')
        break;
      default:
        tile.classList.add('coin', 'bg-danger')
    }
  })
}


const crush = {updateTiles, createGrid, newTiles, findStreak, calculateDown, findReplaceTiles, getTilesByClassName }

export default crush