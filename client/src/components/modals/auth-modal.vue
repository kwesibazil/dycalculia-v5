<template>
  <div class="h-100 overflow-hidden ">
    <h1 class="text-center fs-6 fw-bold mb-3">Please login to continue</h1>
    <section class="bg-white border border-top-0 ">
      <Tabs />
      <form @submit.prevent="submitForm" class="bg-white h-100 p-3 pb-0  mt-2">
        <Email v-model="email"/>
        <div v-show="!getAuthState('signInModal')">
          <Password  v-model="signUpPassword" autocomplete="new-password"/>
          <RegisterCTA />
        </div><!-- Sign In -->

        <div v-show="getAuthState('signInModal')">
          <Password v-model="signInPassword" autocomplete="current-password"/>
          <LoginCTA />
        </div><!-- Sign Up -->

  
        <div :class="{invisible: !getAuthState('err')}" class="alert-danger alert d-flex flex-row-reverse justify-content-between align-items-center py-1 my-1 h-100">
          <button @click="closeAuthErr()" class="btn-close align-self-end py-1 " type="button" aria-label="Close"></button>
          <span class="fs-6">{{ getAuthState('errMsg')}}</span> 
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
    }
  }
</script>


<style scoped>
 
</style>

