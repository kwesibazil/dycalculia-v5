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
    crush.findStreak(game.stats, game.grid)  //points returned here
    getReplacementTiles()
  }

    
  const getReplacementTiles = () =>{
    let markedArr = [], replaceArr = [],  validArr = [], invalidArr = [], updateArr = []

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

    //remove duplicates values
    replaceArr = [...new Set(replaceArr)]
    validArr = [...new Set(validArr)]
    crush.calculateDown(validArr, game.grid)


    //debugger;
    animation.growAndExplode(markedArr)
    animation.drop(validArr)

      setTimeout(()=>{
        crush.findReplaceTiles(replaceArr, game.grid)
        crush.getTilesByClassName(invalidArr, 'replace')
        crush.getTilesByClassName(updateArr, 'update')
        invalidArr.forEach(tile => tile.removeAttribute('class'))
        crush.updateTiles(updateArr)
        animation.removeTranslate(validArr)
      },2000)  
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

  


 


  
  // onMounted(_ =>{
  //   createGrid()
  //   checkColStreak()
  //   checkRowStreak()
  //   //markedTiles()

  // })



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