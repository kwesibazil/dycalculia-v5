<template>
  <draggable class="square rounded rounded-circle h-75 w-75 ">
    <div class="w-100 h-100">
    </div>
  </draggable>
</template>


<script>
 import { VueDraggableNext } from 'vue-draggable-next'

  export default{
    name: 'square',
    components:{
      draggable: VueDraggableNext,
    
    },
  }
</script>

