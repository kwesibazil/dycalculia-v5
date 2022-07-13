<template>
  <div class="d-flex align-items-center justify-content-center h-100 bg-dark">
    <div class="d-flex flex-column justify-content-center align-items-center h-75 pb-5 pb-sm-0">
      <img src="@/assets/img/icon-sm-white.png" alt="logo">
      <h1 class="text-white text-center mt-4  fs-4">Loading</h1>
      <img src="@/assets/img/ajax-loader-white.gif" class="my-4" alt="loader">
    </div> 
  </div>
</template>



<script>
  export default{
    name: 'loading',
  }

</script>

<style scoped>
  .loading{
    height: 100%;
    /* background-repeat: no-repeat; */
    /* background-image: url('@/assets/img/loading.jpg'); */
    background-size: cover;  
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

</style>