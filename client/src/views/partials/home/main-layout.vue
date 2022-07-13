<template>
  <main class="container-fluid d-flex flex-column px-0 bg-light h-100 ">
    <MainNav />
    
    <teleport to="#modal-root">
      <Modal>
        <keep-alive>
          <component :is="getObjState({obj:'modal', prop:'current'})"></component>
        </keep-alive>
      </Modal>
    </teleport>

    <div class="d-flex flex-grow-1 mt-1 height ">
      <SideNav />
      <div class="d-flex flex-column flex-grow-1 overflow-auto h-100 pt-1 page-view">
        <router-view v-slot="{ Component }">
            <component :is="Component" mode="out-in"/>
        </router-view>
      </div>
    </div>
  </main>
</template>

<script>
  import {mapGetters} from '@/libs/vuex'

  import MainNav from '@/components/navbars/main-nav.vue'
  import SideNav from '@/components/navbars/side-nav.vue'
  import Modal from '@/components/modals/modal-container.vue'
 
  export default{
    name: 'main-layout',
    components: { MainNav, Modal, SideNav },
    setup(){
      const {getObjState} = mapGetters()
      return {getObjState}
    },
    async created(){
      const { testimonies, games } = this.$store.state

      if(!testimonies.length)
        await this.$store.dispatch('fetchTestimonies')

      if(!games.length)
        await this.$store.dispatch('fetchGame')
    } 
  }
</script>

<style scoped>
  .height{
    min-height: 500px;
  }

  @media(min-width:575px) {
    /*Width */
    /* .page-view::-webkit-scrollbar {
      width: 10px;
    } */

    /* Track */
    /* .page-view::-webkit-scrollbar-track {
      background: rgb(187, 185, 185); ;
    } */

    /* Handle*/
    /* .page-view::-webkit-scrollbar-thumb, .page-view::-webkit-scrollbar-thumb:hover {
      background: var(--bs-primary);
    } */
  }


</style>


