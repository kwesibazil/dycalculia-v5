<template>
  <div class="h-100">

    <div  class="game-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
  
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <p class="mb-0">Score:<span class="text-dark">{{score}}</span></p>
        <!-- <div class="d-none d-sm-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1" :class="life.first ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1" :class="life.second ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1 " :class="life.third ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
        </div> -->
        <p class="mb-0">Target: <span class="text-danger fw-bold">{{game.target}}</span></p>
      </div>








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
    marked: [],
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
    
    // console.log('swap values');
    // console.log('source ' + sourceImg);
    // console.log('dest ' + destImg);
    // console.log('source replace '+ sourceImg + ' with ' + destImg);
    // console.log('dest replace '+ destImg + ' with ' + sourceImg);

    tiles.source.square.firstElementChild.classList.replace(sourceImg, destImg)
    tiles.source.square.firstElementChild.dataset.amount = destAmount
    tiles.source.square.firstElementChild.dataset.img = destImg
    tiles.dest.square.firstElementChild.classList.replace(destImg, sourceImg)
    tiles.dest.square.firstElementChild.dataset.amount = sourceAmount
    tiles.dest.square.firstElementChild.dataset.img = sourceImg
  }

  const swapImg = () => {
    const sourceImg =  tiles.source.square.firstElementChild.dataset.img
    const destImg =  tiles.dest.square.firstElementChild.dataset.img

    if(!tiles.alternate){
      tiles.source.square.firstElementChild.classList.replace(sourceImg, destImg)
      tiles.dest.square.firstElementChild.classList.replace(destImg, sourceImg)
    }
    else{
      tiles.source.square.firstElementChild.classList.replace(destImg, sourceImg)
      tiles.dest.square.firstElementChild.classList.replace(sourceImg, destImg)
    }

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
      
      if(tiles.source.square !== null){
          swapTiles(tiles)
          if(tiles.alternate === false){
            setTimeout(() =>{
              if(tiles.direction === true) revertY(tiles)
              else revertX(tiles)
              tiles.alternate = true
              swapImg()
            },500)
          }
      }
      //replaceTiles()

      setTimeout(() =>{
        replaceTiles()
        resetTiles()
      },1000)
    }
    else{
      tiles.source.square.firstElementChild.firstElementChild.classList.remove('selected')
      tiles.source.id = tiles.dest.id
      tiles.source.square = tiles.dest.square
      tiles.dest.id = null
      tiles.dest.square = null
      tiles.source.square.firstElementChild.firstElementChild.classList.add('selected')
    }
  }


  const checkRowStreak = () =>{
    for(let i=0; i<62; i++){
      let total = 0
      let row = [i, i+1, i+2]
      
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
      if (inValid.includes(i)) continue
      row.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        tiles.alternate = false
        if(tiles.source.square !== null){
          score.value += points.value
          swapImg()
        }
        row.forEach(square => {
          game.grid[square].firstElementChild.classList.replace(game.grid[square].firstElementChild.dataset.img, 'bg-white')
          game.grid[square].firstElementChild.dataset.amount = 0
          game.grid[square].firstElementChild.dataset.img = 'bg-white'
          game.marked.push(game.grid[square])

        })
      }
    }
  }



  const checkColStreak = () => {  
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        tiles.alternate = false
        
        if(tiles.source.square !== null){
          score.value += points.value
          swapImg()
        }
          col.forEach(square => {
            game.grid[square].firstElementChild.classList.replace(game.grid[square].firstElementChild.dataset.img, 'bg-white')
            game.grid[square].firstElementChild.dataset.amount = 0
            game.grid[square].firstElementChild.dataset.img = 'bg-white'
            game.marked.push(game.grid[square])
        })
      }
    }
  }


  const replaceTiles = () =>{
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]

    game.marked.forEach(square => {
      let ID = parseInt(square.getAttribute('id'))
      for(let i=0; i<gridSize.value; i++){
        const aboveID = ID - gridSize.value
        
        if(firstRow.includes(ID) || aboveID < 0){
          const rand = Math.floor(Math.random() * game.amount.length)
          const value = game.amount[rand]
          const bg = game.images[rand]
          game.grid[ID].firstElementChild.classList.replace(game.grid[ID].firstElementChild.dataset.img, 'bg-dark')
          game.grid[ID].firstElementChild.dataset.amount = value
          game.grid[ID].firstElementChild.dataset.img = bg   
          continue;
        }

        const currentImg =  game.grid[ID].firstElementChild.dataset.img
        const aboveImg = game.grid[aboveID].firstElementChild.dataset.img
        const currentAmount = game.grid[ID].firstElementChild.dataset.amount
        const aboveAmount = game.grid[aboveID].firstElementChild.dataset.amount

        game.grid[ID].firstElementChild.classList.replace(currentImg, aboveImg)
        game.grid[ID].firstElementChild.dataset.amount = aboveAmount
        game.grid[ID].firstElementChild.dataset.img = aboveImg

        game.grid[aboveID].firstElementChild.classList.replace(aboveImg, currentImg)
        game.grid[aboveID].firstElementChild.dataset.amount = currentAmount
        game.grid[aboveID].firstElementChild.dataset.img = currentImg
        ID = aboveID
      }
    })

    for(let i=0; i<gridSize.value; i++){
      game.grid[i].firstElementChild.classList.replace('bg-dark', game.grid[i].firstElementChild.dataset.img)
    }

    game.marked.forEach(square => {
      if(square.firstElementChild.dataset.amount == 0){
        console.log(square);
        const rand = Math.floor(Math.random() * game.amount.length)
        const value = game.amount[rand]
        const bg = game.images[rand]
        square.firstElementChild.classList.replace('bg-white', bg)
        square.firstElementChild.dataset.amount = value
        square.firstElementChild.dataset.img = bg   
      }
    })


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
    //replaceTiles()
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