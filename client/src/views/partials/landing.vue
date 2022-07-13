<template>
  <div class="container-md h-100">
    <WelcomeNav />

    <teleport to="#modal-root">
      <Modal>
        <keep-alive>
          <component :is="getObjState({obj:'modal', prop:'current'})"></component>
        </keep-alive>
      </Modal>
    </teleport>

    <div class="text-center mt-5">
      <img src="@/assets/img/logo-lg.png" class="img-fluid mx-auto" alt="logo">
      <p class="overflow-hidden my-3 mx-auto landing__p">
        Hello participants, we are inviting you to participate 
        in our <strong>undergraduate research</strong> on Dyscalculia 
        and Game-Based Learning. We thank you in advance for your participation.
        Please be assured that the data collected will remain confidential and 
        used <strong>solely for academic purposes</strong>.
      </p>
      <button @click="toggleModal('research')" class="btn btn-primary my-4 text-white hvr-glow" type="button">Learn more</button>
    </div>


  </div>
</template>

<script>
  import {mapGetters, mapMutations } from '@/libs/vuex'
  
  //components
  import Login from '@/components/modals/auth-modal.vue'
  import Research from '@/components/modals/research-modal.vue'
  import Modal from '@/components/modals/modal-container.vue'
  import Success from '@/components/modals/success-modal.vue'
  import WelcomeNav from '@/components/navbars/welcome-nav.vue'

  export default{
    name: 'landing-page',
    components: { Login, Modal, Research, Success, WelcomeNav },
    setup(){
      const {getObjState} = mapGetters()
      const {toggleModal} = mapMutations()
      return {getObjState, toggleModal}
    }
  }
</script>

<style scoped>
  .landing__p{
    max-height: 145px;
    width: 90%
  }

  @media (min-width:576px){
    .landing__p{
      width: 70%;
    }
  }
</style>