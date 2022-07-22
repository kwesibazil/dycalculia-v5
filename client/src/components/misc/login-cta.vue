<template>
  <div>
    <div class="text-end">
      <button type="button" class="text-primary opacity-75 btn btn-link btn-sm px-0 my-1">forgot password?</button>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-lg text-white py-1 mt-2 fs-6 btn-primary">Login</button>
    </div>
    <div class="text-center">
      <span class="text-dark fs-8 opacity-75 me-1">Need an account?</span>
      <button @click="[swapAuthForm('signUp'), closeAuthErr()]" class="text-warning text-decoration-none btn btn-link btn-sm px-0 my-xl-2" type="button">Sign up</button>
    </div>
  </div>
</template>

<script setup>
  import {mapMutations} from '@/libs/vuex'
  const {swapAuthForm, closeAuthErr} = mapMutations()
</script>
