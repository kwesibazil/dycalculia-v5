<template>
  <div class="container-fluid px-0 bg-light ">
    <MainNav />
    
    <teleport to="#modal-root">
      <Modal>
        <keep-alive>
          <component :is="getObjState({obj:'modal', prop:'current'})"></component>
        </keep-alive>
      </Modal>
    </teleport>

    <main class="d-flex mt-1  bg-info">
      <SideNav />
      <div class="flex-grow-1">
        <router-view v-slot="{ Component }">
            <component :is="Component" mode="out-in"/>
        </router-view>
      </div>
    </main>
  </div>
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
      const { games } = this.$store.state

      if(!games.length)
        await this.$store.dispatch('fetchGame')
    } 
  }
</script>

<style scoped>
  main{
    height: 91.5vh;
  }
</style>


