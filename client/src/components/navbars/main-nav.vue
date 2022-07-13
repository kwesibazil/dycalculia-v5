<template>
  <header class="shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-2">
      <div class="container-fluid">
        <div class="d-flex justify-content-between justify-content-lg-start col">
          <button @click="toggleSideNav(true)" class="navbar-toggle me-3" type="button">
            <span class="navbar-toggler-icon "></span>
          </button>
          <router-link to="/" class="my-auto hvr-grow">
            <img  src="@/assets/img/icon-sm-dark.png" class="img-fluid" alt="home" width="28">
          </router-link>
        </div>
        <div class="text-center d-none d-lg-block col ">
          <h3 class="d-inline-block  m-0  fw-bold fs-7">{{getUser('status')}}</h3> 
        </div>
        <div class="d-flex align-items-center justify-content-end col mx-2">
          <img  src="@/assets/img/user-profile.jpg" class="d-block d-sm-none rounded-circle border border-secondary ms-2 " alt="dyscalculia" width="31" height="25" >
          <h3 class="d-none d-sm-block fs-7 m-0 text-muted">{{getUser('username')}}</h3>
        </div>
      </div>
    </nav><!-- nav container ends here -->
  </header><!-- header ends here -->
</template>


<script>
  import { ref} from 'vue'
  import { mapMutations, mapGetters } from '@/libs/vuex'

  export default{
    name: 'main-nav',
    setup(){
      const date = new Date().toDateString()
      const today = ref(date)

      const {getUser} = mapGetters()
      const {toggleSideNav} = mapMutations()
      return {today, toggleSideNav, getUser}
    }
    
  }
</script>

<style scoped>
.user-image{
  vertical-align: middle;
  width: 50px;
  height: 50px;
}
.navbar-toggle{
    padding: 0.188rem 0.313rem;
    font-size: 1rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: box-shadow .15s ease-in-out;
  }
</style>
