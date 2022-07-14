<template>
  <div class="h-100 " ref="grid">
    <Loader v-if="loading"/>

    <div v-else class="grid-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <p class="mb-0">Score:<span class="text-dark">{{score}}</span></p>
        <div class="d-none d-sm-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1" :class="life.first ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1" :class="life.second ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill mx-1 " :class="life.third ? 'fill-danger' : 'fill-secondary'"  viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
          </svg>
        </div>
        <p class="mb-0">Target: <span class="text-danger fw-bold">{{target}}</span></p>
      </div>
      
      <draggable  class="grid h-75 px-3 rounded rounded-3 my-auto"  >
        <transition-group>
          <div v-for="(square, index) in this.width*this.width" :id="index" :key="index" class="dragItem  d-flex justify-content-center align-items-center">
            <Square @drop="dragDrop" @dragstart="dragStart" @dragend="dragEnd"/>
          </div>
        </transition-group>
      </draggable>
    </div>
    
  </div>
</template>


<script>
  import Loader from '@/components/misc/loading.vue'
  import Square from '@/components/misc/square.vue'
  import { VueDraggableNext } from 'vue-draggable-next'

  export default{
    name: 'math-crush',
    data(){
      return{
        target: 0,          //👈amount to match
        loss: 0,
        score: 0,
        points: 3,            //👈points awarded for score match
        width: 5,
        grid: [],
        rounds: 0,
        timeout: 3350,
        loading: true,
        lvl:[
          {target: 130},
          {target: 170},
          {target: 40},
          {target: 300},
          {target: 1100},
          {target:700},
          {target:60},
          
        ],
        invalid: 'bg-white',
        imgBeingDragged: null,
        imgBeingReplaced: null,
        amountBeingDragged: null,
        amountBeingReplaced: null,
        squareIdBeingDragged: null,
        squareIdBeingReplaced: null,
        life: {first: true, second:true, third: true},
        amount:[10, 20, 50, 100, 500],
        images:['ten','twenty','fifty','hundred','five-hundred']
      }
    },
    components:{
      Square,
      Loader,
      draggable: VueDraggableNext,
    },
    methods: {
      createGrid(){
        setTimeout(_ =>{
          const grid = this.$refs.grid
          const squares = grid.getElementsByClassName('square')

          Array.from(squares).forEach(square =>{
            const rand =  Math.floor(Math.random() * this.amount.length)
            const img = this.images[rand]
            const value  = this.amount[rand]
            this.target = this.lvl[rand].target
            square.classList.toggle(img)                //👈 adds background image to square
            square.setAttribute('data-img', img)        //👈 save img class name as a data attr
            square.setAttribute('draggable', true)      //👈 set to draggable  
            square.setAttribute('data-amount', value)   //👈 set amount as a data attr
            this.grid.push(square)                      //👈 push square to grid
          })
        }, this.timeout+50)
      },


      dragStart(e){
        const dragItem = e.target.closest('.dragItem')                      //👈element being dragged 
        const square =  dragItem.firstElementChild                          //👈element with data attr
        this.squareIdBeingDragged = parseInt(dragItem.getAttribute('id'))   //👈element id
        this.amountBeingDragged =  square.dataset.amount                    //👈element amount
        this.imgBeingDragged = square.dataset.img                           //👈element img
      },

      dragDrop(e){
        const dragItem = e.target.closest('.dragItem')                //👈element being dropped unto
        const square =  dragItem.firstElementChild                    //👈element with data attr

        this.imgBeingReplaced = square.dataset.img                               //👈element img
        this.amountBeingReplaced = square.dataset.amount                         //👈element amount
        this.squareIdBeingReplaced = parseInt(dragItem.getAttribute('id'))       //👈element id

        square.classList.replace(this.imgBeingReplaced, this.imgBeingDragged)    //👈swap css class
        square.dataset.amount = this.amountBeingDragged                          //👈swap amount value
        square.dataset.img = this.imgBeingDragged                               //👈swap img

        this.grid[this.squareIdBeingDragged].
        classList.replace(this.imgBeingDragged, this.imgBeingReplaced)

        this.grid[this.squareIdBeingDragged].dataset.amount = this.amountBeingReplaced
        this.grid[this.squareIdBeingDragged].dataset.img = this.imgBeingReplaced
      },


      dragEnd(){
        let validMoves = [                                      //👈can only move one square in each direction
          this.squareIdBeingDragged -1,
          this.squareIdBeingDragged +1,
          this.squareIdBeingDragged - this.width,
          this.squareIdBeingDragged + this.width
        ]

        let validMove = validMoves.includes(this.squareIdBeingReplaced)
        
        if(this.squareIdBeingReplaced && validMove)
          this.squareIdBeingReplaced = null
        else if(this.squareIdBeingReplaced && !validMove){
          this.grid[this.squareIdBeingReplaced].classList.replace(this.imgBeingDragged, this.imgBeingReplaced)
          this.grid[this.squareIdBeingDragged].classList.replace(this.imgBeingReplaced, this.imgBeingDragged)
    
          this.grid[this.squareIdBeingReplaced].dataset.amount = this.amountBeingReplaced
          this.grid[this.squareIdBeingDragged].dataset.amount = this.amountBeingDragged

          this.grid[this.squareIdBeingReplaced].dataset.img = this.imgBeingReplaced
          this.grid[this.squareIdBeingDragged].dataset.img = this.imgBeingDragged
        }else{
          this.grid[this.squareIdBeingDragged].classList.replace(this.imgBeingReplaced, this.imgBeingDragged)
          this.grid[this.squareIdBeingDragged].dataset.amount = this.amountBeingDragged
          this.grid[this.squareIdBeingDragged].dataset.img = this.imgBeingDragged
        }

        this.checkColumn()
        this.checkRow()
      },

      checkColumn(){
        for(let i = 0; i<=14; i++){
          let total = 0 
          let column = [i, i+this.width, i+this.width*2]
          column.forEach(index => total += parseInt(this.grid[index].dataset.amount))
          
          
          if(total === this.target){
            this.score += this.points
            column.forEach(index =>{
               let rand =  Math.floor(Math.random() * this.images.length)
                this.grid[index].classList.replace(this.grid[index].dataset.img, this.images[rand] )
                this.grid[index].dataset.img = this.images[rand]
                this.grid[index].dataset.amount = this.amount[rand]
            })
          } 
        }
      },

      checkRow() {
        for (let i = 0; i <= 22; i ++) {
          let total = 0 
          let row = [i, i+1, i+2]
          const notValid = [3, 4, 8, 9, 13, 14, 18,19]     //👈 skip these iterations

          if (notValid.includes(i)) continue
          row.forEach(index => total += parseInt(this.grid[index].dataset.amount))
          
          if(total === this.target){
            this.score += this.points
            row.forEach(index => {
              let rand =  Math.floor(Math.random() * this.images.length)
              this.grid[index].classList.replace(this.grid[index].dataset.img, this.images[rand] )
              this.grid[index].dataset.img = this.images[rand]
              this.grid[index].dataset.amount = this.amount[rand]
            })
          } 
        }
      },
      gameOver(){
        this.$store.commit('toggleModal', 'over')
        this.$store.commit('redirect', { route: 'dashboard', timeOut: 2500})
      },
      nextQuestion(){
        const rand =  Math.floor(Math.random() * this.amount.length)
        this.target = this.lvl[rand].target
      },
    },
    watch:{
      score:{
        handler(newValue, oldValue){
          this.rounds++

          if(this.rounds > 2)
            this.nextQuestion()

          if(this.rounds >6)
            this.gameOver()
        }
      }
    },
    mounted(){
      this.createGrid()
      setTimeout(_ =>{
        this.loading = false
        this.$store.commit('toggleModal',  'rules')
      }, this.timeout)

    },
      beforeUnmount(){
      const gameData = { score: this.score, game: 'math-crush'}
      this.$store.dispatch('postScore', gameData)
    }
  }
</script>

<style scoped>

  .grid-container{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/jungle-background.webp');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .grid{
    width: 95%; 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  @media (min-width:575px) {
    .grid{
      width: 75%; 
    }
  }

   @media (min-width:992px) {
    .grid{
      width: 40%; 
    }
  }

  .grid div{
    height: 20%;
    width: 20%;
  }




</style>