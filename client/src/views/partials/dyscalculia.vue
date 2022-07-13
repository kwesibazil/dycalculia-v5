<template>
  <div class="overflow-auto px-4">
    <div class="container ">
      <section class="w-md-75 mb-5">
        <h2>What is Dyscalculia?</h2>
        <p> Dyscalculia is a condition that affects the ability to acquire arithmetical skills. Dyscalculic learners may have difficulty understanding simple number concepts, lack an intuitive grasp of numbers, and have problems learning number facts and procedures. Even if they produce a correct answer or use a correct method, they may do so mechanically and without confidence.</p> 
        <p>However, <strong>Dyscalculia is not a reflection of low intelligence</strong>, nor does it mean a person will not be successful working through higher order mathematical reasoning. Rather, persons with dyscalculia simply think and learn differently from others, and are be more prone to making mistakes when working with numbers.</p>
      </section>
      <section class="w-md-75 mb-5">
        <h2 class="">How common is it?</h2>
        <p>Dyscalculia is under studied and under resourced in comparison with dyslexia. However, it is estimated that dyscalculia is likely to occur in approximately 3–7% of all children, adolescents, and adults. Additionally, unlike some other specific learning difficulties, dyscalculia is as likely to affect females as males.</p>
      </section>
      <section class="w-md-75 mb-5">
        <h2>Does this sound like you?</h2>
        <ul>
          <li class="py-1 py-md-2">I  find math puzzling, frustrating, and difficult to learn</li>
          <li class="py-1 py-md-2">As long as I use a calculator, I'm fine. Just don't ask me to math by hand.</li>
          <li class="py-1 py-md-2">I haven't a clue about basic algebra calculus nor geometry</li>
          <li class="py-1 py-md-2">I really can't estimate quantity much at all. I usually say how much can I buy with this amount.</li>
          <li class="py-1 py-md-2">People say I'm careless and forgetful, but I really try and I get furious with myself</li>
          <li class="py-1 py-md-2">I've found ways to hide my problems, but I'm really struggling</li>
        </ul>
        <div class="d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-exclamation-triangle text-warning" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
          </svg>
          <div class="my-auto">
            <p class="align-self-md-center mb-0 ms-3"><strong>Having difficulties in math does not mean having dyscalculia!</strong></p>
            <router-link to="/screener" class="align-self-md-center ms-3 btn-link">click here to get tested</router-link>
          </div>
        </div>
      </section>
      <section class="w-md-75 mb-3">
        <h2>We can help you to succeed and achieve</h2>
        <p>There is no cure for dyscalculia but with the right teaching and support, persons living with dyscalculia can overcome their difficulties with mathematics and achieve great things.</p>
        <router-link to="/games" class="btn btn-warning text-white">Try our online quiz games</router-link>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dyscalculia-info',
  }
</script>

<style scoped>
</style>