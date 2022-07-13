<template> 
  <div class="d-flex flex-column h-100">
    <h1 class="fs-6 fw-bold text-center mb-3">Efficacy of a Game-Based Learning Program for Dyscalculic Adults Struggling with Money Management</h1>
    <div class="flex-grow-1 content-box px-2 px-sm-3 overflow-auto h-100">
      <div class="my-2">
        <h3 class="fs-6 fw-bold mb-1">About the Research</h3>
        <p class="fs-7">
          <em>Game-based learning</em>  refers to the borrowing of certain gaming principles and applying them to real-life settings to engage users.
          While <em>Development Dyscalculia</em> is a specific learning disability that affects the normal acquisition of arithmetic skill. 
          Despite the absence of commonality between the two terms, this research aims to add to our existing knowledge on both topic by designing and evaluating 
          the effectiveness of a Game-Based solution to aid adults struggling with dyscalculia.
        </p>
      </div>
      <div class="my-2">
        <h3 class="fs-6 fw-bold mb-1">Purpose of the Research</h3>
        <p class="fs-7">
          The present research is being carried out as part of an undergraduate research conducted by students
          at the University of Guyana. Participation in this research will enable the researchers to gain insight 
          into the effectiveness of Game-Based learning, as well as identify possible ways to better assist dyscalculic 
          adults struggling with money management.
        </p>
      </div>

      <div class="my-3">
        <h3 class="fs-6 fw-bold mb-0">Expected Duration</h3>
        <p class="fs-7">This research will be conducted this year during the period <em>June 30, 2022</em> to <em>July 06, 2022</em>.</p>
      </div>
      <div class="my-2">
        <h3 class="fs-6 fw-bold mb-1">Assurance of Strictest Confidentiality </h3>
        <p class="fs-7">
          Please note that we understand the sensitivity of this information, and would never compromise your 
          trust in us. As such we guarantee that the information provided will remain confidential and won’t be
          shared with any third parties.
        </p>
      </div>
      <div class="mt-4 bg-dark p-2 text-white ">
        <p class="fs-8 mb-1">
          If you're unable to assess a certain feature, or required further assistance kindly forward an email to this address 
            <a href="mailto:kwesibazi@gmai.com" class="text-primary">dyscalculia_fyp@gmail.com</a>
        </p>
      </div>
    </div>
  </div> 
</template>


<script setup>
  import { onBeforeUnmount, onMounted} from 'vue'
 
  onMounted( _ =>{
    const body = document.querySelector("body")
    body.classList.add('overflow-hidden')
    console.log(body)
  })

  onBeforeUnmount(_ => {
    const body = document.querySelector("body")
    body.classList.remove('overflow-hidden')
    console.log(body)
  })


</script>




<style scoped>
  p{
    text-indent: 25px;
  }
  /* width */
  .content-box::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  .content-box::-webkit-scrollbar-track {
    background: rgb(187, 185, 185); ;
  }

  /* Handle*/
  .content-box::-webkit-scrollbar-thumb, .content-box::-webkit-scrollbar-thumb:hover {
    background: var(--bs-primary);
  }

</style>

