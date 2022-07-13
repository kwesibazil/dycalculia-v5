<template>
  <div class="d-flex flex-column h-100 justify-content-center align-items-center ">
    <div class="d-flex flex-column justify-content-center align-items-center  my-5 py-4 w-75 p-md-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="currentColor" class="bi bi-exclamation-circle-fill fill-danger" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
      <h1 class="my-2 text-danger">503 Service unavailable</h1>
      <p class="fs-5 mb-1 ">The Hosting Server currently offline</p>
      <p class="fs-6 mb-1 ">Please try again a few minutes</p>
      <p class="fs-6">Feel free to contact us if the problem persists
        <a href="mailto:kwesibazi@gmai.com" class="">contact us</a>
      </p>
      <router-link  class="my-4 btn btn-secondary text-white" to="/">
        <span class="">Back to Home</span>
      </router-link>
    </div>
  </div><!-- root container ends here -->
</template>

<script>
  export default{
    name: 'server-maintenance'
  }
</script>