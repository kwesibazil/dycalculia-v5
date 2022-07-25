<template>
  <div class="h-100">
    <div  class="game-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <p class="mb-0">Score:<span class="text-dark">{{game.score}}</span></p>
        <p class="mb-0">Target: <span class="text-danger fw-bold">{{game.target}}</span></p>
      </div>
      <div id="myGrid" class="grid h-75 rounded rounded-6 my-auto">
        <div v-for="(tile, index) in game.size * game.size" :id="index" :key="index" class="tile-container d-flex justify-content-center align-items-center">
          <Tile  @click="onClick" v-touch:swipe="onSwipe" />
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import util  from './game-util'
  import animate  from './animate'
  import Tile from '@/components/misc/tile'
import { swapTiles } from './math-crush';



  const game = reactive({
    size: 8, 
    score: 0, 
    points: 3, 
    target: 130,
    grid: [],
    valid: [],
    invalid: [],
    replacement: []
  });



  const tiles = {
    alternate: true,
    dest: {square: null, id:null, amount: null,},
    source: {square: null, id:null, amount: null},
  }


  const createGrid = () => {
    const gameTiles = document.getElementsByClassName('tile-container')
    Array.from(gameTiles).forEach(tile =>{
      util.addAttributes(tile.firstElementChild)
      game.grid.push(tile)    
    })
  }


  const onClick = (e) => {
    const square = e.target.closest('.tile-container') 
    if(tiles.source.square === null){
      tiles.source.square = square
      tiles.source.id = parseInt(square.getAttribute('id'))
      square.firstElementChild.firstElementChild.classList.add('source')
    }else setTiles(square)
  }
  

  const onSwipe = (direction, mouseEvent) =>{
    if(tiles.source.square === null){
      tiles.source.id = parseInt(tiles.source.square.getAttribute('id'))
      tiles.source.square = mouseEvent.srcElement.closest('.tile-container')
      tiles.source.square.firstElementChild.firstElementChild.classList.add('source')
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


  const validMoves = () =>{
    let moves = [tiles.source.id - 1, tiles.source.id + 1, tiles.source.id + 8, tiles.source.id - 8]
    let validMove = moves.includes(tiles.dest.id)

    if(validMove){
      util.swapTilesAmount(tiles)
      checkColStreak()
      checkRowStreak()
      //markedTiles()
     
      util.reset(tiles)
    } 
    else {
      tiles.source.square.firstElementChild.firstElementChild.classList.remove('source')
      tiles.source.square = tiles.dest.square
      tiles.source.square.firstElementChild.firstElementChild.classList.add('source')
      tiles.source.id = tiles.dest.id
      tiles.dest.id = null
      tiles.dest.square = null
    }
  }

  const checkRowStreak = () =>{
    for(let i=0; i<62; i++){
      let total = 0, row = [i, i+1, i+2]
      const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

      if (inValid.includes(i)) continue
      row.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))
      if(total === game.target){
        row.forEach(id => {
          game.grid[id].firstElementChild.setAttribute('data-marked', 0)
          game.grid[id].firstElementChild.setAttribute('data-skip', 0)
        })
        addPoints(row)
      }
    }
  }



  const checkColStreak = () => {  
    for(let i = 0; i<48; i++){
      let total = 0
      let col = [i, i+8, i+8*2]
      col.forEach(index => total+= parseInt(game.grid[index].firstElementChild.dataset.amount))

      if(total === game.target){
        game.grid[col[2]].firstElementChild.setAttribute('data-marked', 0)
        game.grid[col[2]].firstElementChild.setAttribute('data-skip', 0)
        addPoints(col)
      }
    }
  }


  const markedTiles = () => {
    const invalid = document.getElementsByClassName('marked')
    Array.from(invalid).forEach(tile => game.invalid.push(tile))
    game.invalid.reverse()
  
    game.invalid.forEach(index =>{
      let amount = parseInt(index.parentElement.getAttribute('id'))
      while(amount >= 0){
        game.replacement.push(document.getElementById(amount).firstElementChild)
        if(parseInt(game.grid[amount].firstElementChild.dataset.amount) > 0)game.valid.push(document.getElementById(amount).firstElementChild)
        amount -= game.size
      }
    })

    game.replacement = [...new Set(game.replacement)]
    game.valid = [...new Set(game.valid)]

    const marked = game.replacement.filter(marked => marked.hasAttribute('data-marked'))
    marked.forEach(elem => {
      const elemID = parseInt(elem.parentElement.getAttribute('id'))
      let belowID = parseInt(elem.parentElement.getAttribute('id')) + 8
      const end = parseInt(game.replacement[0].parentElement.getAttribute('id'))



      while(belowID <= end){

          if(marked.includes(document.getElementById(belowID).firstElementChild)){
            // console.log(marked.includes(document.getElementById(belowID).firstElementChild));
            // console.log('marked is true');
            // console.log(document.getElementById(belowID).firstElementChild)
            // document.getElementById(belowID).classList.add('bg-white');
            // console.log(elem);
            // elem.parentElement.classList.add('bg-danger');
            elem.removeAttribute('data-marked', 'data-skip')
            
          }
          //console.log(belowID);
          //document.getElementById(belowID).classList.add('bg-white')
      //   //document.getElementById('bg-danger')
      //   //.classList.add('bg-danger')
      //   // console.log(document.getElementById(elemID));
      //   // console.log(document.getElementById(belowID));
      //   //const below = belowID - 8
      //   //console.log(below);
          belowID += 8
      //   //elem.parentElement.classList.add('bg-white')
      }
      
      //console.log(elemID)
      
      //console.log(elemID);


      // elem.parentElement.classList.add('bg-white')
      
      // // console.log(`${belowID} % ${elemID} = ${belowID % elemID}`);
      // if(belowID <= end && end % elemID ){
      //     elem.parentElement.classList.add('bg-danger')
      //   // console.log(`${belowID} - ${elemID} = ${belowID - elemID}`);
      //   // console.log(elem);
      //   // console.log(document.getElementById(belowID).firstElementChild);
      // }
    })
    

   animate.dropTiles(game.replacement, game.valid, game.invalid)
  }


  const addPoints =  (streak) => {
    tiles.alternate = false
    streak.forEach(id => {
      const target = game.grid[id].firstElementChild
      target.dataset.amount = 0
      target.classList.add('marked') 
    })
  }

  
  onMounted(_ =>{
    createGrid()
    checkColStreak()
    checkRowStreak()
    markedTiles()

  })



  







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