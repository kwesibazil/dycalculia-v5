<template>
  <div class="h-100">
    <div  class="game-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <p class="mb-0">Score:<span class="text-dark">{{game.score}}</span></p>
        <p class="mb-0">Target: <span class="text-danger fw-bold">{{game.target}}</span></p>
      </div>
      <div id="myGrid" class="grid h-75 rounded rounded-6 my-auto hvr-icon-spin">
        <div v-for="(tile, index) in game.size * game.size" :key="index" class="tile-container d-flex justify-content-center align-items-center">
          <Tile :id="index"  @click="onClick" v-touch:swipe="onSwipe" />
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
  import crush from './crush'
  import Tile from '@/components/misc/tile'
  import { reactive, onMounted,  watch } from 'vue'




  const game = reactive({
    size: 8,
    lvl: 1,
    score: 0,
    points: 3,
    target: 130,
    inProgress: false
  })


  const tiles = {
    alternate: false,
    dest: {square: null, id:null },
    source: {square: null, id:null},
  }


  onMounted(() => {
    init()
    
    setInterval(() => {
      if(crush.findStreak(game))
        if(!game.inProgress)crush.animateTiles(game)

      console.log(game.inProgress);

    },300)
  

  })

  const init = () => {
    crush.createGrid('tile-container')
    crush.newTiles()
  }



  const onClick = (e) => {
    const square = e.target.closest('.tile-container') 
    if(tiles.source.square === null){
      tiles.source.square = square
      square.classList.add('selected')
      tiles.source.id = parseInt(square.getAttribute('id'))
    }else setTiles(square)
  }

  const onSwipe = (direction, mouseEvent) =>{
    if(tiles.source.square === null){
      tiles.source.square = mouseEvent.srcElement.closest('.tile-container')
      tiles.source.id = parseInt(tiles.source.square.getAttribute('id'))
      tiles.source.square.classList.add('selected')
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
      //validMoves(tiles)
    }else return
  }







  
// const startAnimation = () =>{
//   let markedArr = [], replaceArr = [],  validArr = [], invalidArr = [], updateArr = []

//   crush.getTilesByClassName(invalidArr, 'replace')
//   crush.getTilesByClassName = (markedArr, className, reverse = false)

//   markedArr.forEach(tile => {
//     let parentID = parseInt(tile.parentElement.getAttribute('id'))
//     while(parentID >= 0){
//       replaceArr.push(game.grid[parentID])
//       if(parseInt(game.grid[parentID].firstElementChild.dataset.amount) > 0)validArr.push(game.grid[parentID])
//       parentID -=8
//     }
//   })
    
//   replacementTiles(replaceArr, validArr)
//   replaceArr = [...new Set(replaceArr)]
//   validArr = [...new Set(validArr)]
//   crush.calculateDown(validArr, game.grid)


//   animation.growAndExplode(markedArr)
//   animation.drop(validArr)
  
//     setTimeout(()=>{
//       console.log('get setTimeout');

//       crush.findReplaceTiles(replaceArr, game.grid)
//       crush.getTilesByClassName(invalidArr, 'replace')
//       crush.getTilesByClassName(updateArr, 'update')
//       crush.updateTiles(updateArr)
//       crush.newTiles(invalidArr, values, true)


//       animation.removeTranslate(validArr)
//       animation.rotateAndAppear(invalidArr)
//       animation.removeAnimation(replaceArr)
//     },1800)  
// }



  
// const validMoves = tiles => {
//   let moves = [tiles.source.id - 1, tiles.source.id + 1, tiles.source.id+ 8, tiles.source.id - 8]
//   let valid = moves.includes(tiles.dest.id)

//   // if(valid){
//   //   // swapAmount(tiles)
//   //   // animation.swap(tiles)
//   //   // resetTiles(tiles)
//   // }
//   // else invalidMove(tiles)
// }

// watch(() => game.stats.score, async(newScore, oldScore) => {
//   console.log(`new points -> [${newScore}] old points -> [${oldScore}]`);
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



 
  