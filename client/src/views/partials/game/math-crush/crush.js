import animation from  './animation'
const grid = []

const values = [
  {amount : 10,css: 'ten'},
  {amount : 50,css: 'fifty'},
  {amount : 20,css: 'twenty'},
  {amount : 100,css: 'one-hundred'},
  {amount : 500,css: 'five-hundred'},
]

/**
* @param {Array} grid	empty array that will contains each game tile present on the board
* @desc   loops through document and find each element with class tile-container
*         add data-amount attr to each element 
*         then push each element to the grid array 
**/
const createGrid = (className) => {
  const tiles = document.getElementsByClassName(className)
  Array.from(tiles).forEach(tile =>{
    tile.firstElementChild.setAttribute('data-amount', 0)
    grid.push(tile.firstElementChild)
  })
}


/** 
* @param {Array} tiles  array of elements that needs a needs value
* @param {object[]} values  list of possible css class from which to generate random  tile
* @desc loops through each tile and assign a random amount and corresponding css class
**/
const newTiles = (tiles = grid, addOn = false) => {
  tiles.forEach(tile => {
    try{
      const rand =  Math.floor(Math.random() * values.length)
      const amount = parseInt(tile.dataset.amount)
      if(amount !== 0)throw new Error
      tile.removeAttribute('class')
      tile.setAttribute('data-amount', values[rand].amount)
      tile.classList.add('coin', values[rand].css, 'hvr-grow')
      if(addOn)tile.classList.add('invisible')
    }catch{
      tile.parentElement.classList.add('bg-white')
      console.log('failed to create tile');
    }
  })

 
}


/**
* @param {Array} streak contains the ID of corresponding rows or column that a match was found
* @param {Integer} points the number of points awarded for each match found
* @param {Array} grid	an array containing each game tile present on the board
* @desc loops each streak and set the current tile amount to 0 and add CSS class Marked
* @return points the number of points awarded for each round
*/
const addPoints =  (streak, points) => {
  //console.log('add points');

  streak.forEach(id => {
    grid[id].dataset.amount = 0
    grid[id].classList.add('marked')
  })
  return points
}




/**
* @param {object} stats contains current information like number of points awarded, lvl, & target to match
* @param {Array} grid	array containing each game tile present on the board
* @desc loops through the grid and finds any pair of 3 that matches the target value
* @return {boolean} if points is greater than 0 return TRUE else return FALSE                    
**/
const findStreak = game => {
  let points = 0 
    for(let i=0; i<62; i++){
      let total = 0, row = [i, i+1, i+2]
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
      if (inValid.includes(i)) continue
      row.forEach(index => total+= parseInt(grid[index].dataset.amount))
      if(total === game.target) points += addPoints(row, game.points)
    }
  
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(grid[index].dataset.amount))
      if(total === game.target)points += addPoints(col, game.points)
    }

    if(game.firstMove) game.score += points
    console.log('step 1 search for streak -> ' + points);
    return  points > 0 ? true : false
}


const animateTiles = (inProgress) => {


  console.log('animation in progress');
  inProgress = true
  console.log(inProgress);
  // const markedArr = crush.getTilesByClassName('marked', true)
  // const [replaceArr, validArr] = crush.markedTiles(markedArr)
  // animation.growAndExplode(markedArr)
  // animation.drop(validArr)


  // setTimeout(()=>{
  //   //console.log('step 6 -> animate tiles setTimeout');
  //   updateTilesAmount(replaceArr)
  //   const updateArr = crush.getTilesByClassName('update', false)
  //   const invalidArr = crush.getTilesByClassName('replace', false)
  //   updateClass(updateArr)
  //   newTiles(invalidArr, true)

  //   validArr.forEach(tile => tile.removeAttribute('style'))
  //   animation.rotateAndAppear(invalidArr)
  //   animation.removeAnimation(replaceArr)
  // },1900)
}




const updateClass = tiles => {
  tiles.forEach(tile => {
    tile.removeAttribute('class')
    tile.classList.add(...switchClassName(tile.dataset.amount))
  })
}


const updateTilesAmount = tiles => {
  //console.log('step 7 -> update tiles amount');
  const gridTop = [0,1,2,3,4,5,6,7]
  tiles.forEach(tile => {
    const tileID = parseInt(tile.getAttribute('id'))
    let currentID = tileID
    while(currentID >= 0){
      currentID -= 8
      if(gridTop.includes(tileID) || currentID < 0){    //reach the top || gone out of bounce
        tile.classList.add('replace') 
        break
      }
      if(parseInt(grid[currentID].dataset.amount) > 0){
        tile.dataset.amount = grid[currentID].dataset.amount
        grid[currentID].dataset.amount = 0
        tile.classList.add( 'update') 
        break
      }
    }
  })
}

const addHoverCss = () => {
  //console.log('last step add hover css');
  const tiles = document.getElementsByClassName('tile-container')
  Array.from(tiles).forEach(tile =>tile.classList.add('hvr-grow'))
}

const getTilesByClassName = (className, reverse = false, arr = []) => {
  const tiles = document.getElementsByClassName(className)
  Array.from(tiles).forEach(tile => arr.push(tile))
  if(reverse)arr.reverse()
  return arr
}


const markedTiles = (tiles) => {
  //console.log('step 3 -> marked tiles');
  let validArr = [], replaceArr = []
  tiles.forEach(tile => {
    let ID = parseInt(tile.getAttribute('id'))
    while(ID >= 0){
      replaceArr.push(grid[ID])
      if(parseInt(grid[ID].dataset.amount) > 0)validArr.push(grid[ID])
      ID -=8
    }
  })
  
  //remove duplicates tiles
  replaceArr = [...new Set(replaceArr)]
  validArr = [...new Set(validArr)]
  calculateDown(validArr)
  return [replaceArr, validArr]
}


const calculateDown = tiles => {
  tiles.forEach(tile => {
    let down = 0, tileID = parseInt(tile.getAttribute('id'))
    while(tileID < 64){
      const tileValue = parseInt(grid[tileID].dataset.amount)
      if(tileValue === 0)down++
      tileID += 8
    }
    tile.setAttribute('data-down', down)
  })
}

const switchClassName = className => {
  //console.log('step 9 -> switch css');
  let css = ''
  switch(parseInt(className)) {
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


const crush = {
  createGrid, newTiles,
  addPoints, findStreak,
  getTilesByClassName,
  markedTiles,
  animateTiles,
  addHoverCss 
}

export default crush