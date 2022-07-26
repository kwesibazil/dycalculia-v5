<template>
  <div class="h-100">
    <div  class="game-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <!-- <p class="mb-0">Score:<span class="text-dark">{{game.score}}</span></p>
        <p class="mb-0">Target: <span class="text-danger fw-bold">{{game.target}}</span></p> -->
      </div>
      <div id="myGrid" class="grid h-75 rounded rounded-6 my-auto">
        <div v-for="(tile, index) in game.size * game.size" :id="index" :key="index" class="tile-container d-flex justify-content-center align-items-center">
          <Tile   />
          <!-- @click="onClick" v-touch:swipe="onSwipe" -->
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
  import crush from './crush'
  import animation from './animation'
  import Tile from '@/components/misc/tile'
  import { reactive, onMounted } from 'vue'

  const values = [
    {amount : 10,css: 'ten'},
    {amount : 50,css: 'fifty'},
    {amount : 20,css: 'twenty'},
    {amount : 100,css: 'one-hundred'},
    {amount : 500,css: 'five-hundred'},
  ]
  const game = reactive({
    size: 8,
    grid: [],
    stats: {
      lvl: 1,
      points: 3,
      target: 130
    }
  })

  const init = () => {
    crush.createGrid(game.grid)
    crush.newTiles(game.grid, values)
    crush.findStreak(game.stats, game.grid)
    getReplacementTiles()
  }

  
const getReplacementTiles = () =>{
  let markedArr = [], replaceArr = [],  validArr = [], invalidArr = [], updateArr = []

  const markedTiles = document.getElementsByClassName('marked')
  Array.from(markedTiles).forEach(tile => markedArr.push(tile))
  markedArr.reverse()

  markedArr.forEach(tile => {
    //tile.classList.remove('marked', 'bomb')
    let parentID = parseInt(tile.parentElement.getAttribute('id'))
    while(parentID >= 0){
      replaceArr.push(game.grid[parentID])
      if(parseInt(game.grid[parentID].firstElementChild.dataset.amount) > 0)validArr.push(game.grid[parentID])
      parentID -=8
    }
  })

  //remove duplicates values
  replaceArr = [...new Set(replaceArr)]
  validArr = [...new Set(validArr)]
  crush.calculateDown(validArr, game.grid)
  crush.findReplaceTiles(replaceArr, game.grid)
  crush.getTilesByClassName(invalidArr, 'replace')
  crush.getTilesByClassName(updateArr, 'update')


  //animate
  animation.growAndExplode(markedArr)
  animation.drop(validArr)

  invalidArr.forEach(tile => tile.parentElement.classList.add('bg-danger'))



  setTimeout(()=>{
    crush.updateTiles(updateArr)
  },3000)

  //updateArr.forEach(tile => tile.parentElement.classList.add('bg-success'))
  
  
  
}



  onMounted(() =>{
    init()
  })



  // const game = reactive({
  //   size: 8, 
  //   score: 0, 
  //   points: 3, 
  //   target: 130,
  //   grid: [],
  //   valid: [],
  //   invalid: [],
  //   replacement: []
  // });



  // const tiles = {
  //   alternate: true,
  //   dest: {square: null, id:null, amount: null,},
  //   source: {square: null, id:null, amount: null},
  // }



  // const init = () => {
  //   game.game.grid
  // }

  


  // const onClick = (e) => {
  //   const square = e.target.closest('.tile-container') 
  //   if(tiles.source.square === null){
  //     tiles.source.square = square
  //     tiles.source.id = parseInt(square.getAttribute('id'))
  //     square.firstElementChild.firstElementChild.classList.add('source')
  //   }else setTiles(square)
  // }
  

  // const onSwipe = (direction, mouseEvent) =>{
  //   if(tiles.source.square === null){
  //     tiles.source.id = parseInt(tiles.source.square.getAttribute('id'))
  //     tiles.source.square = mouseEvent.srcElement.closest('.tile-container')
  //     tiles.source.square.firstElementChild.firstElementChild.classList.add('source')
  //   }else if(tiles.dest.square !== null) return
    
  //   if(direction === 'top') setTiles(game.grid[tiles.source.id-8])
  //   else if(direction === 'left')setTiles(game.grid[tiles.source.id-1])
  //   else if(direction === 'right')setTiles(game.grid[tiles.source.id+1])
  //   else if(direction === 'bottom')setTiles(game.grid[tiles.source.id+8])
  // }

  


 




  //   const markedTiles = () => {
  //     const invalid = document.getElementsByClassName('marked')
  //     Array.from(invalid).forEach(tile => game.invalid.push(tile.parentElement))
  //     game.invalid.reverse()
    
  //     game.invalid.forEach(elem =>{
  //       let id = parseInt(elem.getAttribute('id'))
  //       while(id >= 0){
  //         game.replacement.push(game.grid[id])
  //         if(parseInt(game.grid[id].firstElementChild.dataset.amount) > 0)game.valid.push(document.getElementById(id))
  //         id -= game.size
  //       }
  //     })

  //     game.replacement = [...new Set(game.replacement)]
  //     game.valid = [...new Set(game.valid)]
    
  //     game.valid.forEach(elem => {
  //       //elem.classList.add('bg-white')
  //       let step = 0, id = parseInt(elem.getAttribute('id'))
  //       while(id < 64){
  //         if(parseInt(game.grid[id].firstElementChild.dataset.amount) === 0)step++
  //         id +=8
  //       }
  //       elem.firstElementChild.setAttribute('data-skip', step)
  //     })

  //    // game.replacement.reverse()

  //     console.log('first');
  //     game.replacement.forEach(elem =>{
  //       const top = [0,1,2,3,4,5,6,7]
  //       const  elemID = parseInt(elem.getAttribute('id'))
  //       let ID = elemID
  
  //       while(ID >=  0){
  //           ID -= 8
  //           if(top.includes(elemID) || ID < 0) {
  //             elem.classList.add('replace')
  //             break
  //           }

  //           if(parseInt(game.grid[ID].firstElementChild.dataset.amount) > 0){
  //             elem.firstElementChild.dataset.amount = game.grid[ID].firstElementChild.dataset.amount 
  //             game.grid[ID].firstElementChild.dataset.amount = 0
  //             break
  //           }
            
  //       }
  //     })

    
  //     const needsVales = document.getElementsByClassName('replace')
  //     Array.from(needsVales).forEach(tile => console.log(tile))
     
    
  //   animate.dropTiles(game.replacement, game.valid, game.invalid)
  // }







  

  
  // onMounted(_ =>{
  //   createGrid()
  //   checkColStreak()
  //   checkRowStreak()
  //   //markedTiles()

  // })



  







 // const addPoints =  (streak) => {
  //   tiles.alternate = false
  //   setTimeout(() => {
  //     streak.forEach(id => {
  //       const tile = game.grid[id].firstElementChild
  //       tile.removeAttribute('class')
  //       tile.classList.add('bomb')
  //       console.log('add bomb');
  //       setTimeout(() => {
  //         tile.classList.add('invisible')
  //         console.log('tiles fall');
  //         }, 700)
  //     })
  //   },500)
  // }

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