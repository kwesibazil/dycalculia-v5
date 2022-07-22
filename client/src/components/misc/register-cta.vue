<template>
  <div>
    <div class="form-text text-muted fs-8">
      <p class="mb-2">8-30 characters, with at least one number, one lowercase and one uppercase letter.</p>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-lg text-white py-1 mt-0 fs-6 btn-primary">Create</button>
    </div>

    <div class="text-center">
      <span class="text-dark fs-8 opacity-75 me-1">Already a member?</span>
      <button  @click="[swapAuthForm('signIn'), closeAuthErr()]" class="text-warning text-decoration-none btn btn-link btn-sm px-0 "  type="button">Login</button>
    </div>
  </div>
</template>

<script setup>
  import {mapMutations} from '@/libs/vuex'
  const {swapAuthForm, closeAuthErr} = mapMutations()
</script>
