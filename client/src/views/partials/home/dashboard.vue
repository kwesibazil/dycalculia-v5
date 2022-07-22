<template>
  <transition name="fade" mode="out-in">
    <div class="d-flex flex-column  px-3 bg-light h-100 overflow-auto">  
      <div class="shadow-sm bg-white mb-3">
        <div class="d-flex flex-column justify-content-center align-items-center mx-auto col col-sm-10 p-2 p-sm-3">
          <h1 class="fs-5 fw-bold text-center">Dyscalculic Games</h1>
          <p class="col col-sm-10 px-2 px-sm-0 mb-0 text-center fs-xs-7 fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis iusto, enim iure nisi minus sunt ea expedita eius praesentium .</p>
        </div>
      </div>
      
      <section class="d-flex flex-column flex-grow-1 ">
        <p class="text-muted px-2 text-center">Below are a few games design to aid dyscalculic adults</p>
        <GameCard />
      </section>

    </div><!-- root container ends here -->
  </transition>
</template>

<script setup>
  import {mapMutations} from '@/libs/vuex'
  import GameCard from '@/components/cards/game-card.vue'
  const {toggleModal } = mapMutations()
</script>


<style scoped>
  .fade-enter-active {
    transition: opacity .5s ease;
  }
  .fade-leave-active {
    transition: opacity .2s linear;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0
  }
</style>