<template>
  <div class="h-100">

    <div  class="game-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
  
      <div id="myGrid" class="grid h-75 rounded rounded-6 my-auto">
        <div v-for="(tile, index) in gridSize * gridSize" :id="index" :key="index" class="tile-container d-flex justify-content-center align-items-center">
          <Tile  @click="onClick" v-touch:swipe="onSwipe" />
        </div>  
      </div>
      
    </div>
    
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import {swapTiles, revertY, revertX} from './math-crush'
  import Tile from '@/components/misc/tile'

  const points = ref(3)
  const score = ref(0)
  const gridSize = ref(8)

  const tiles = {
    alternate: true,
    direction: null,
    dest: {square: null, id:null},
    source: {square: null, id:null },
  }
  const game = {
    grid: [],
    target: 130,
    amount: [10, 20, 50, 100, 500],
    images: ['ten','twenty','fifty','hundred','five-hundred']
  }


  const createGrid = () => {
    const gameTiles = document.getElementsByClassName('tile')
    Array.from(gameTiles).forEach(tile =>{
      const rand = Math.floor(Math.random() * game.amount.length)
      const value = game.amount[rand]
      const bg = game.images[rand]
      tile.classList.add(bg)
      tile.setAttribute('data-amount', value)   
      tile.setAttribute('data-img', bg)   
      game.grid.push(tile.parentElement)
    })
  }

  
  const onClick = (e) => {
    const square = e.target.closest('.tile-container') 
    if(tiles.source.square === null){
      tiles.source.id = parseInt(square.getAttribute('id'))
      tiles.source.square = square
      square.firstElementChild.firstElementChild.classList.add('selected')
    }else setTiles(square)
  }
  



  const onSwipe = (direction, mouseEvent) =>{
    if(tiles.source.square === null){
      tiles.source.square = mouseEvent.srcElement.closest('.tile-container')
      tiles.source.square.firstElementChild.firstElementChild.classList.add('selected')
      tiles.source.id = parseInt(tiles.source.square.getAttribute('id'))
    }else if(tiles.dest.square !== null) return
    
    if(direction === 'top') setTiles(game.grid[tiles.source.id-8])
    else if(direction === 'left')setTiles(game.grid[tiles.source.id-1])
    else if(direction === 'right')setTiles(game.grid[tiles.source.id+1])
    else if(direction === 'bottom')setTiles(game.grid[tiles.source.id+8])
  }

  const setTiles = square => {
    const id = parseInt(square.getAttribute('id'))
    if(tiles.source.square !== null && tiles.dest.square === null && tiles.source.square !== square ){
      tiles.dest.id = id
      tiles.dest.square = square
      validMoves()  
    }else return
  }

  
  const swapValues = () => {
    const sourceImg =  tiles.source.square.firstElementChild.dataset.img
    const sourceAmount =  tiles.source.square.firstElementChild.dataset.amount
    const destImg =  tiles.dest.square.firstElementChild.dataset.img
    const destAmount =  tiles.dest.square.firstElementChild.dataset.amount

    tiles.source.square.firstElementChild.classList.replace(sourceImg, destImg)
    tiles.source.square.firstElementChild.dataset.amount = destAmount
    tiles.source.square.firstElementChild.dataset.img = destImg
    tiles.dest.square.firstElementChild.classList.replace(destImg, sourceImg)
    tiles.dest.square.firstElementChild.dataset.amount = sourceAmount
    tiles.dest.square.firstElementChild.dataset.img = sourceImg
  }




  const validMoves = () =>{
    const destID = tiles.dest.id
    const sourceID = tiles.source.id
    let moves = [sourceID - 1, sourceID + 1, sourceID + 8,sourceID - 8]
    
    let validMove = moves.includes(destID)

    if(validMove){
      tiles.alternate = true
      swapValues()
      checkColStreak()
      checkRowStreak()
      resetTiles()
    }
    else{
      console.log('invalid move ');
      tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
      tiles.source.id = tiles.dest.id
      tiles.source.square = tiles.dest.square
      tiles.dest.id = null
      tiles.dest.square = null
      tiles.source.square.firstElementChild.firstElementChild.classList.add('selected')
    }
  }


  const checkRowStreak = grid =>{
    for(let i=0; i<62; i++){
      let total = 0
      let row = [i, i+1, i+2]
      
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
      if (inValid.includes(i)) continue

      row.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        score.value += points.value
        tiles.alternate = false
        

        if(tiles.source.square !== null){
          swapTiles(tiles)

          if(tiles.direction === true)
            revertY(tiles)
          else
            revertX(tiles)
        }

        row.forEach(square => replaceTiles(square))
      }
      
      else if(i === 63 && tiles.source.square !== null)
        swapTiles(tiles)
    
    }
  }



  const checkColStreak = () => {  
    
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        score.value += points.value
        tiles.alternate = false
        

        if(tiles.source.square !== null){
          swapTiles(tiles)

          if(tiles.direction === true)
            revertY(tiles)
          else
            revertX(tiles)
          
        }

        col.forEach(square => replaceTiles(square))
      }
      
    }

    // if(tiles.source.square !== null )
    //     swapTiles(tiles)

  }



  const replaceTiles = square => {
    const rand = Math.floor(Math.random() * game.amount.length)
    const value = game.amount[rand]
    const bg = game.images[rand]

    game.grid[square].firstElementChild.classList.replace(
    game.grid[square].firstElementChild.dataset.img, 'bg-white')

    game.grid[square].firstElementChild.dataset.amount = 0
    game.grid[square].firstElementChild.dataset.img = 'bg-white'
    // console.log(game.grid[square].firstElementChild);
    // console.log(value + ' ' + bg);
  }

  const resetTiles = () =>{
    tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
    tiles.source.square = null
    tiles.source.id = null
    tiles.dest.square = null
    tiles.dest.id = null
    tiles.alternate = true
  }

  
    onMounted(_ =>{
      createGrid()
      checkColStreak()
       checkRowStreak()
    })



  










</script>

<style scoped>

  .game-container{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/jungle-background.webp');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .grid{
    width: 60%; 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .tile-container{
    width: 12.5%;
    height: 12.5%;
  }
</style>