<template>
  <div class="h-100"  ref="grid">
    <Loader v-if="loading"/>
    <div v-else class="grid-container d-flex flex-column align-items-center flex-grow-1 mb-2  "> 
      <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 px-5 my-3 w-75">
        <p class="mb-0">Score:<span class="text-dark">{{score}}</span></p>
        <div class="">
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
        <p class="mb-0 d-none d-sm-block">High Score: <span class="text-danger fw-bold">{{score}}</span></p>
      </div>

      <div class="w-100 d-flex flex-column justify-content-center mt-3 align-items-center flex-grow-1">
        <div class="d-flex justify-content-evenly align-items-center p-2 shadow w-xs-90 w-75 mb-5 ">
          
          <div class="col position-relative"  ref="dropZone">
            <h4 class="fs-6 mb-0 fw-bold text-dark change">total:<span >${{change}}</span></h4>
            <draggable @dragstart="dragStart"  @drop="dragDrop" 
              class="box option-box shadow-sm text-white border border-white me-1 px-2 d-flex flex-wrap">
            </draggable>
          </div>

          <div class="col-1 mx-2 text-center fw-bold text-dark mx-auto fs-1"> + </div>
          <div class="box answer-box col shadow-sm  me-1 px-2 fs-5" >${{value}}</div>
          <div div class="col-1 mx-2 text-dark fw-bold text-center fs-1">=</div>
          <div class="box answer-box col shadow-sm ms-1 px-2 fs-5">${{total}}</div>
        </div>
        
        <h4 class="fs-6 mb-1 fw-bold text-dark">wallet: <span >${{wallet}}</span></h4>
        <draggable  :list="grid" class="grid rounded rounded-3 mb-3">
          <transition-group>
            <div v-for="(square, index) in 18" :id="index" :key="index" class="dragItem  d-flex justify-content-center align-items-center">
              <Square  @dragstart="dragStart" @dragenter.prevent  @dragover.prevent />
            </div>
          </transition-group>
        </draggable>

        <div class="d-grid w-50">
          <button @click="calculate" class="btn btn-lg b btn-dark text-white">cash</button>
        </div>

      </div>
    </div><!-- else ends here -->
  </div>
</template>

<script>
  import Loader from '@/components/misc/loading.vue'
  import Square from '@/components/misc/square.vue'
  import { VueDraggableNext } from 'vue-draggable-next'

  export default {
    name: 'math-puzzle',
    data(){
      return{ 
        score: 0,
        grid: [],
        total: 0,
        value: 0,
        wallet: 0,
        change: 0,
        points: 10,
        loss: 0,
        life: {first: true, second:true, third: true},
        lvl:[
          {total: 500,  value: 50},
          {total: 1500, value: 300},
          {total: 250,  value: 200},
          {total: 2600,  value: 500},
          {total: 500,  value: 0},
          {total: 1500, value: 1300},
          {total: 50,  value: 10},
          {total: 2600,  value: 1500},
          {total: 100,  value: 0},
        ],
        loading: true,
        timeout: 3500,
        amount:[10, 20, 50, 100, 500],
        images:['ten','twenty','fifty','hundred','five-hundred']
      }
    },
    components:{ Loader, Square, draggable: VueDraggableNext},
    methods:{
      createGrid(){
        setTimeout(_ =>{
          const grid = this.$refs.grid
          const squares = grid.getElementsByClassName('square')

          Array.from(squares).forEach(square =>{
            const rand =  Math.floor(Math.random() * this.amount.length)
            this.total = this.lvl[rand].total
            this.value = this.lvl[rand].value
            const img = this.images[rand]
            const value  = this.amount[rand]
            this.wallet += value
            square.classList.toggle(img)                //👈 adds background image to square
            square.setAttribute('data-amount', value)   //👈 set amount as a data attr
            this.grid.push(square)                     //👈 push square to grid
          })
        }, this.timeout+50)
      },
      dragStart(e){
        const dragItem = e.target.closest('.dragItem')     //👈element being dragged 
        const id = parseInt(dragItem.getAttribute('id'))   //👈element id
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('square_id', id)
      },

      dragDrop(e){
        const squareId = e.dataTransfer.getData('square_id');
        const dragItem = document.getElementById(squareId);
        dragItem.style.display = "block"
        dragItem.removeAttribute("draggable")
        e.target.appendChild(dragItem);                               //👈append element to drop container
        const square =  dragItem.firstElementChild                    //👈element with data attr
        const transfer =  parseInt(square.dataset.amount)             //👈drab data attr to get amount
        this.wallet -= transfer                                      //👈subtract amount from wallet
        this.change += transfer                                      //👈add amount to change
      },

      calculate(){
        const amount = this.change + this.value
        if(amount === this.total){
          this.score += this.points
        }
        else
          this.removeLife()
      
        this.removesSquares()
        this.nextQuestion()
      },

      removesSquares(){
        this.change = 0
        const dropZone = this.$refs.dropZone
        const squares =  dropZone.getElementsByClassName('dragItem')

        Array.from(squares).forEach(square =>{
          const el = document.getElementById(square.getAttribute('id')).firstElementChild
          el.style.display = "none"
          el.removeAttribute("data-amount")
          this.grid.splice(square.getAttribute('id'), 1);
        })

        if(this.grid.length == 0)
          this.gameOver()
      },

      nextQuestion(){
         const rand =  Math.floor(Math.random() * this.amount.length)
          this.total = this.lvl[rand].total
          this.value = this.lvl[rand].value
      },

      removeLife(){
        this.loss++

        switch(this.loss){
          case 1: 
            this.life.third = false
            break
          case 2:
            this.life.second = false
            break
          case 3:
            this.life.first = false
            break
          default:
            this.gameOver()
        }
      },

      gameOver(){
        this.$store.commit('toggleModal', 'over')
        this.$store.commit('redirect', { route: 'dashboard', timeOut: 2500})
      }
    },
    mounted(){
      setTimeout(_ =>{
        this.loading = false
        this.$store.commit('toggleModal',  'temp')
      },this.timeout)
    },
    created(){
      this.createGrid()
    },
    beforeUnmount(){
      const gameData = { score: this.score, game: 'math-puzzle'}
      this.$store.dispatch('postScore', gameData)
    }
  }
</script>

<style scoped>
  .grid-container{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/supermarket.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  
  .grid{
    height: 40%;
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

  .dragItem{
    height: 30%;
    width: 15%;
  }
  .box{
    height: 80px;
    display: flex;
    justify-content: center;
  
  }

  .option-box{
    display: flex;
    align-items: center;
    text-align: center;
    background-color:#808080c7;
  }

  .answer-box{
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
    background-color: var(--bs-teal);
  }

  .change{
    top: -20px;
    position: absolute;
  }



</style>
