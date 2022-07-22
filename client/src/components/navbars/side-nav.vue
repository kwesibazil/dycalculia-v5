<template>
  <div class="">
    <div @click="toggleSideNav" class="overlay" :class="{'overlay--collapse': !isVisible('sideNav')}"></div>

    <div class="sideNav shadow d-flex justify-content-center bg-white h-100 " :class="{'sideNav--collapse': !isVisible('sideNav')}">
      <nav class="navbar navbar-light py-0 px-xl-3 h-100">
        <div class="d-flex flex-column justify-content-between h-100">

          <div @click="currentLink" id="sideNavLinks" ref="sideNavLinks" class="active navbar-nav d-flex flex-column justify-content-between align-items-start h-30">
            <router-link @click="toggleSideNav(false)" class="nav-link d-flex  align-items-center justify-content-start rounded-2 px-6 py-2  mt-3 hvr-shadow hvr-icon-pulse-shrink" aria-current="page" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill me-2 hvr-icon" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
              </svg>
              <span class="">Home</span>
            </router-link>
            <router-link @click="toggleSideNav(false)" class="nav-link d-flex align-items-center justify-content-start rounded-2 px-6 py-2 hvr-shadow mt-1 hvr-icon-pulse-shrink" to="/information">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-fill me-2 hvr-icon" viewBox="0 0 16 16">
                <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
              </svg>
              <span class="">Dyscalculia</span> 
            </router-link>
            <router-link @click="toggleSideNav(false)" class="nav-link d-flex align-items-center justify-content-start rounded-2 px-6 py-2 hvr-shadow mt-1 hvr-icon-pulse-shrink" to="/statistics">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill me-2 hvr-icon" viewBox="0 0 16 16">
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
              </svg>
              <span class="">Statistics</span> 
            </router-link>
          </div><!-- navbar-nav ends here -->

          <button @click="logout" class="hvr-icon-back btn btn-danger logout--btn mx-auto rounded" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right me-2 fill-white hvr-icon" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <span class="text-white">logout</span> 
          </button>
        </div>
      </nav>
    </div>
    

  </div><!-- root container ends here -->
</template>


<script setup>
  import { mapGetters, mapMutations, mapActions, mapState } from '@/libs/vuex'

  const {isVisible} = mapGetters()
  const {toggleSideNav} = mapMutations()
  const {logout}  = mapActions()
  
  
  const currentLink = (e) =>{
    const target = e.target                      
    const current = target.closest('.nav-link')   
    const sideNavLinks = this.$refs.sideNavLinks
    const routerLinks = sideNavLinks.getElementsByClassName('nav-link')

    Array.from(routerLinks).forEach(link => {
      link.classList.remove('active')
      link.removeAttribute('aria-current');
    });

    Array.from(routerLinks).forEach(link => {
      if(link === current ){
        link.classList.toggle('active')
        link.ariaCurrent = "page"
      }
    });

  }
 
</script>

<style scoped>
  .logout--btn{
    padding: .75rem 3rem;
    display: flex;
    margin-bottom: .25rem ;
    align-items: center;
    justify-items: center;
    background-color: rgb(197, 9, 9);
  }

  @media (min-width:768px){
    .sideNav{
      width:auto;
      max-width:250px; 
      /* height: 91.5vh; */
      margin-right: .5rem;
      z-index: 5;
      overflow:hidden;    
      transition: all 0.4s linear; 
    }
    .sideNav--collapse{
      max-width:0;
      margin-right: 0;
      transition: all 0.5s;
    } 
  }

@media (max-width:767px){
  .overlay-box{
    top: 1;
    left: 0;
    width: 0%;
    z-index: 10;
    overflow: auto;
    position: fixed;
  }
  .overlay--collapse{
    z-index: 3;
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow-x: auto ;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .sideNav{
    top: 1;
    z-index: 13;
    width: 210px;
    height: calc(100vh - 52px) !important;
    position: absolute;
    transform: translate(-100%);
    transition: all 0.3s linear;
  }.sideNav--collapse{
    transition: 0.5s;
    transform: translate(0);
  }
}

</style>