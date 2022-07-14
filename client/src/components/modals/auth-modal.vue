<template>
  <div class=" d-flex flex-column pb-2 pb-sm-3">
    <h1 class="text-center fs-6 fw-bold mb-3">Please login to continue</h1>
    <section class="bg-white border border-top-0 flex-grow-1 bg-danger ">
      <Tabs />
      <form @submit.prevent="submitForm" class="bg-white  p-3 pb-0  mt-2">
        <Email v-model="email"/>
        <div v-show="!getAuthState('signInModal')">
          <Password  v-model="signUpPassword" autocomplete="new-password"/>
          <RegisterCTA />
        </div><!-- Sign In -->

        <div v-show="getAuthState('signInModal')">
          <Password v-model="signInPassword" autocomplete="current-password"/>
          <LoginCTA />
        </div><!-- Sign Up -->
  
        <div :class="{invisible: !getAuthState('err')}" class="alert-danger alert d-flex flex-row-reverse justify-content-between align-items-center py-0 pe-0 pe-sm-1 my-1 mb-2 ">
          <button @click="closeAuthErr()" class="btn p-1 pe-0 align-self-end py-0 " type="button" >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x border-0 fill-danger" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <span class="fs-xs-7 fs-6">{{ getAuthState('errMsg')}}</span> 
        </div>
      </form>
    </section>
  </div>
</template>


<script>
  import DOMPurify from 'dompurify';
  import {reactive, toRefs } from 'vue'
  import {mapGetters, mapMutations} from '@/libs/vuex'

  import Tabs from '@/components/misc/auth-tab-buttons.vue'
  import Email from '@/components/forms/email-input.vue'
  import Password from '@/components/forms/password-input.vue'
  import LoginCTA from  '@/components/misc/login-cta.vue'
  import RegisterCTA from  '@/components/misc/register-cta.vue'

  export default {
    name: 'auth-modal',
    components: { Email, LoginCTA, RegisterCTA, Password, Tabs },
    setup(){
      const {getAuthState} = mapGetters()
      const {closeAuthErr} = mapMutations()

      const formData = reactive({
        email: '',
        signUpPassword: '',
        signInPassword: ''
      })

      return {closeAuthErr, getAuthState, ...toRefs(formData)}
    },

    methods:{
      async submitForm() {
        const email = DOMPurify.sanitize(this.email);
        const signInPwd = DOMPurify.sanitize(this.signInPassword);
        const signUpPwd = DOMPurify.sanitize(this.signUpPassword);

        const signInForm = this.$store.state.auth.signInModal     

        if(signInForm && (Object.keys(signInPwd).length > 0))          // 👉 true = signIn form && signInPwd != empty
          await this.$store.dispatch('login', {email, pwd:signInPwd})
        else if(!signInForm && (Object.keys(signUpPwd).length > 0))        // 👉 true = signUp form && signUpPwd != empty
          await this.$store.dispatch('register', {email, pwd:signUpPwd})
        else
          this.$store.commit('setErrMsg', 'password required')
      }
    },

    mounted(){
      const body = document.querySelector("body")
      body.classList.add('overflow-hidden')
    },
    beforeUnmount(){
      const body = document.querySelector("body")
      body.classList.remove('overflow-hidden')
      this.$store.commit('resetModal')
    }
  }
</script>


<style scoped>
 
</style>

