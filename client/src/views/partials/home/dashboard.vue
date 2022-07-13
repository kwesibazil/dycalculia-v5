<template>
  <transition name="fade" mode="out-in">
    <div class="h-100 px-4 py-2" >
      <section class="d-flex flex-column pb-3 mt-2 pt-2 h-100">
        <h2 class="fs-5 fw-bold mb-lg-0">Math Games</h2>
        <div class="d-flex flex-column justify-content-center h-100 ">
          <p class="text-muted text-center mb-3 py-">What do you want to practice today?</p>
          <GameCard />
        </div>
      </section>
    </div><!-- container ends here -->
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