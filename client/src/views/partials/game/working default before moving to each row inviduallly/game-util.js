/**
	 * Looks through an gem's neighbours in a given direction
	 * @param vertical	bool	Check vertically or horizontally ?
	 * @param step	int	(-1 OR 1) Check on one direction or another (left/right, top/bottom)
	 * @return The streak array with the streaked gems in it
	 */



const game = {
  lvl: 0,
  size: 8, 
  grid: [],
  points: [3],
  target: [130], 
  amount: [10, 20, 50, 100, 500],
  images: ['ten','twenty','fifty','hundred','five-hundred']
}



/**
 * @param {Array} grid	contains each game tile present on the board
 * @description   loops through document and find each element with class tile-container
 *               push each element to the grid array
 */
const createGrid = grid => {
  const tiles = document.getElementsByClassName('tile-container')
  Array.from(tiles).forEach(tile =>grid.push(tile))
}



const addAttributes = (tile, replace = false) => {
  const rand = Math.floor(Math.random() * classArr.amount.length)
  if(!replace){
    tile.classList.add(classArr.images[rand])
    tile.setAttribute('data-amount', classArr.amount[rand])  
  }
}




const swapTilesAmount = (tiles) => {
  console.log('swapping source and dest amount values only not background image');
  const temp = tiles.source.square.firstElementChild.dataset.amount
  tiles.source.square.firstElementChild.dataset.amount = tiles.dest.square.firstElementChild.dataset.amount
  tiles.dest.square.firstElementChild.dataset.amount = temp
}

const reset = (tiles) => {
  setTimeout(() => {
    console.log('removing source and dest');
    tiles.source.square.firstElementChild.firstElementChild.classList.remove('source')
    tiles.source.square = null
    tiles.source.id = null
    tiles.dest.square = null
    tiles.dest.id = null
    tiles.alternate = true
  }, 1000)
}

const invalidMove = (tiles) => {
  tiles.source.square.firstElementChild.firstElementChild.classList.remove('source')
  tiles.source.square = tiles.dest.square
  tiles.source.square.firstElementChild.firstElementChild.classList.add('source')
  tiles.source.id = tiles.dest.id
  tiles.dest.id = null
  tiles.dest.square = null
}



const checkRowStreak = () =>{
  for(let i=0; i<62; i++){
    let total = 0, row = [i, i+1, i+2]
    const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

    if (inValid.includes(i)) continue
    row.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))
    if(total === game.target)addPoints(row)
  }
}

const checkColStreak = () => {  
  for(let i = 0; i<48; i++){
    let total = 0
    let col = [i, i+8, i+8*2]
    col.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))
    if(total === game.target)addPoints(col)
    
  }
}


const addPoints =  (streak) => {
  tiles.alternate = false
  streak.forEach(id => {
    const target = game.grid[id].firstElementChild
    target.dataset.amount = 0
    target.classList.add('marked', 'bomb') 
  })
}


const setTiles = square => {
  const id = parseInt(square.getAttribute('id'))
  if(tiles.source.square !== null && tiles.dest.square === null && tiles.source.square !== square ){
    tiles.dest.id = id
    tiles.dest.square = square
    validMoves()  
  }else return
}


const validMoves = () =>{
  let moves = [tiles.source.id - 1, tiles.source.id + 1, tiles.source.id + 8, tiles.source.id - 8]
  let validMove = moves.includes(tiles.dest.id)

  if(validMove){
    util.swapTilesAmount(tiles)
    checkColStreak()
    checkRowStreak()
    util.reset(tiles)
  } 
  else util.invalidMove()
}







const util = {checkColStreak, checkRowStreak, invalidMove, addAttributes, swapTilesAmount, reset}

export default util