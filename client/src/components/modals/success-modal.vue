<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-75 ">
    <img src="@/assets/img/icon-sm-dark.png" alt="logo">
    <h1 class="text-center mt-4  fs-3">
      {{getObjState({obj:'redirectMsg', prop:'primaryMsg'})}}
    </h1>
    <span class="text-muted">
      {{getObjState({obj:'redirectMsg', prop:'secondaryMsg'})}}
    </span>
    
    <img v-if="isVisible('ajaxLoader')" src="@/assets/img/ajax-loader.gif" class="mt-4" alt="loader">

  </div>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default{
    name: 'success-modal',
    computed:mapGetters(['getObjState', 'isVisible'])
  }
</script>