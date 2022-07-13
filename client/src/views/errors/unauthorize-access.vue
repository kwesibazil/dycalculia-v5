<template>
  <div class="d-flex flex-column h-100 justify-content-center align-items-center ">
    <div class="d-flex flex-column justify-content-center align-items-center  my-5 py-4 w-75 p-md-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="currentColor" class="bi bi-exclamation-triangle-fill fill-warning" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <h1 class="my-2 text-warning">401 Unauthorize Access</h1>
      <p class="fs-6 ">You do not have permission to view this page using the credentials that you supplied.</p>
      <router-link  class="my-4 btn btn-secondary text-white" to="/">
        <span class="">Back to Home</span>
      </router-link>
    </div>
  </div><!-- root container ends here -->
</template>



<script>
  export default{
    name: 'Unauthorize Access',
  }

</script>