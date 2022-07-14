<template>
  <main class="container-fluid d-flex flex-column px-0 bg-light h-100  overflow-hidden">
    <MainNav />
    
    <teleport to="#modal-root">
      <Modal>
        <keep-alive>
          <component :is="getObjState({obj:'modal', prop:'current'})"></component>
        </keep-alive>
      </Modal>
    </teleport>

    <div class="d-flex flex-grow-1 mt-1 overflow-hidden">
      <SideNav />
      <router-view v-slot="{ Component }">
          <component :is="Component" mode="out-in"/>
      </router-view>
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
      const { games } = this.$store.state

      if(!games.length)
        await this.$store.dispatch('fetchGame')
    } 
  }
</script>

<style scoped>
  .height{
    min-height: 500px;
  }

</style>


