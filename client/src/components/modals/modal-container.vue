<template>
  <transition mode="out-in" name="nested">
    <div v-if="getObjState({obj:'modal', prop:'isActive'})" @click="shakeX"  class="overlay">
      <div :class="{'animate__shakeX  border border-2 border-dark': disabled }" class="animate__animated modal-container d-flex flex-column shadow bg-light px-3 px-sm-4 rounded-3 h-100">
        <button @click="toggleModal" class="btn-close align-self-end pt-3 pb-2  my-1" type="button" aria-label="Close"></button>
        
        <div class="flex-grow-1 mb-3 h-75  modal-slot">
          <slot></slot>
        </div><!-- modal content ends here -->

      </div><!-- modal container ends here -->
    </div><!-- overlay ends here -->
  </transition>
</template>

<script setup>
  import { ref } from 'vue'
  import {mapGetters, mapMutations } from '@/libs/vuex'

  const {toggleModal,  resetModal} = mapMutations()
  const {getObjState} = mapGetters()
  const disabled = ref(false)

  const shakeX  = e => {
    if(e.target === e.currentTarget){
      disabled.value = true
      setTimeout(_ => disabled.value = false, 1000 )
    }
  }

</script>

<style scoped>

  .modal-slot::-webkit-scrollbar {
    display: none;
  }
  .overlay{
    top: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow-x: auto ;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-container{
    top: 10%;
    z-index: 4;
    max-width: 90%;
    min-width: 300px;
    max-height: 60%;
    min-height: 400px; 
    position: relative;
    margin-left: auto;
    margin-right: auto;
    overflow-y:auto;
  }

  @media (min-width:576px){
    .modal-container{
      top: 5%;
      max-height: 77%;
      max-width: 490px;
    }
  }

  .modal-container::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  .modal-container::-webkit-scrollbar-track {
    background: rgb(187, 185, 185); ;
  }

  /* Handle*/
  .modal-container::-webkit-scrollbar-thumb, .content-box::-webkit-scrollbar-thumb:hover {
    background: var(--bs-secondary);
  }


  .nested-enter-active, .nested-leave-active {
    transition: all .3s ease-in-out;
  }.nested-enter-from, .nested-leave-to {
    opacity: 0;
  }

  /* delay leave of parent element and  delay enter of nested element */ 
  .nested-leave-active, .nested-enter-active .modal-container{ 
    transition-delay: 0.25s;
  }.nested-enter-active .modal-container, .nested-leave-active .modal-container { /* transition nested elements */
    transition: all 0.3s ease-in-out;
  }.nested-enter-from .modal-container, .nested-leave-to .modal-container {
    transform: translateY(-115%);
    opacity: .1;
  }

</style>