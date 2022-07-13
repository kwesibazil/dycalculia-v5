<template>
  <div class="d-flex">

    <div class="d-grid w-50">
      <button class="btn btn-dark opacity-25 rounded-0 py-2 py-sm-3 btn-highlight-none" type="button"
        @click="[swapAuthForm('signUp'), closeAuthErr()]" 
        :class="{'btn--current':!getAuthState('signInModal')}"
      >
      SignUp
      </button>
    </div>
    <div class="d-grid w-50">
      <button class="btn btn-dark opacity-25 rounded-0 py-2 py-sm-3 btn-highlight-none" type="button"
        @click="[swapAuthForm('signIn'), closeAuthErr()]" 
        :class="{'btn--current':getAuthState('signInModal')}"
      >
      SignIn
      </button>
    </div>

  </div>
</template>


<script setup>
  import {mapMutations, mapGetters} from '@/libs/vuex'
  const {getAuthState} = mapGetters()
  const {swapAuthForm, closeAuthErr} = mapMutations()
</script>


<style scoped>
  .btn--current {
    border: none;
    color: black;
    opacity: 1 !important;
    background-color: transparent;
    border-top: 2px solid var(--primary);
    transition: all .2s;
  } 
</style>