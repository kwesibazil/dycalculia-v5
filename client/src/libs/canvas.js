import debounce from "lodash.debounce";
let canvas, grid

export class CANVAS {
  constructor() {
    this.ctx = ''
    this.grid = ''
    this.canvas = ''
    this.resizeObserver = new ResizeObserver(debounce(this.onResize),300);
    console.log('canvas created');
  }


  init(){
    grid = document.querySelector(".grid-container")
    canvas = document.querySelector("#canvas")
    this.ctx = canvas.getContext('2d')
    this.resizeObserver.observe(document.querySelector(".grid-container"));
    
    canvas.width = grid.offsetWidth
    canvas.height = grid.offsetHeight
  }

  render(){
    this.ctx.fillStyle = 'rgb(200, 0, 0)';
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.ctx.fillRect(30, 30, 50, 50);
  }

  size(){
    // console.log('this');
    // debounce(() =>{
    
      // canvas.width = grid.clientWidth-5
      // canvas.height = grid.clientHeight-5
      console.log('this');
    // },100)()
  }

  onResize(){
    canvas.width = grid.offsetWidth
    canvas.height = grid.offsetHeight
    // const grid = document.querySelector(".grid-container")
    // const canvas = document.querySelector("#canvas")
    // this.canvas.width = this.grid.clientWidth
    // this.canvas.height = this.grid.clientHeight
    console.log(canvas);
    // console.log('resizing ' +  grid.clientWidth,  grid.clientHeight);
  }

}//class ends here


<template>
  <div  class="bg-dark grid " ref="grid">
    <!-- <Loader v-if="loading"/> -->

    <div class="grid-container "> 
      <canvas id="canvas" ref="canvas" class="border"></canvas>
    </div><!-- grid container ends here -->
  </div><!-- root container ends here -->
</template>


<script setup>
  import Loader from '@/components/misc/loading.vue'
  import { CANVAS } from '@/libs/canvas'

  import { ref, onMounted, watch } from 'vue';
  import debounce from "lodash.debounce";

  const loading = ref(true)
  const timeout = ref(null)

  // const grid  = ref(null)
  // const width = ref(null)
  // const height= ref(null)
  
  const canvas = new CANVAS()


  // const resize =  debounce((width, height) => {
  //   console.log(' resize');
  //   //canvas.resize(width, height)
  // }, 500)


  // watch([width, height], ([newWidth, newHeight], [oldWidth, oldHeight]) =>{
  //   console.log(width.value, height.value);
  //   resize(newWidth, newHeight)
  // })


  onMounted(_ =>{
    setTimeout(_ =>{
      loading.value = false
    }, timeout.value)

    // grid.value = document.getElementById('grid')
    // height.value = grid.offsetHeight
    // width.value = grid.offsetWidth

    canvas.init()
    canvas.render()
  })



 


</script>

<style scoped>

  .grid-container{
    /* width: 100%;
    height: 100%;
    background-image: url('@/assets/img/jungle-background.webp');
    background-repeat: no-repeat;
    background-size: 100% 100%; */
  }

  .grid{
    /* max-height: 10.5vh; */
    /* width: 95%;  */
    /* max-height: 61.5vh; */
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4); */
  }

#canvas{
   /* width: 100%; */
  object-fit: contain;
}



</style>