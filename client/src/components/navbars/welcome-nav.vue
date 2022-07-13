<template>
  <nav class="d-flex align-items-center justify-content-end justify-content-sm-between py-3">
    <button class="d-none d-sm-block btn btn-link hvr-grow " type="button">
        <img src="@/assets/img/dyscalculia.png" class="img-fluid" alt="logo" width="150">
    </button>
    <div>
      <button @click="[toggleModal('login'), swapAuthForm('signUp')]" class="btn btn-outline-primary me-3 hvr-glow" type="button">Sign Up</button>
      <button @click="[toggleModal('login'), swapAuthForm('signIn')]" class="btn btn-primary text-white hvr-glow" type="button">Sign In</button>
    </div>
  </nav>
</template>

<script>
  import { mapMutations} from '@/libs/vuex'
  
  export default{
    name: 'welcome-nav',
    setup(){
      const {swapAuthForm, toggleModal} = mapMutations()
      return {toggleModal, swapAuthForm}
    }
  }
</script>
