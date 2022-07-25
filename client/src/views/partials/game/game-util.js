
const classArr = {
  amount: [10, 20, 50, 100, 500],
  images: ['ten','twenty','fifty','hundred','five-hundred']
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

const util = { addAttributes, swapTilesAmount, reset}

export default util