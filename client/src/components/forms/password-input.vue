<template>
  <div class="input-group input-group-lg">
    <span class="inputIcon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person opacity-50" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      </svg>
    </span>
    <input  class="form-control rounded-2  fs-6 px-5 py-sm-2"  
      :autocomplete="autocomplete"  placeholder="password" 
      pattern="^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{8,30}$"
      @keyup="updateText" :value="modelValue" :type="inputType" 
    >

    <span class="passwordIcon">
      <svg v-if="hidden"  @mousedown="showPassword('text')" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash opacity-50"   viewBox="0 0 16 16">
        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
      </svg>
      <svg v-else @mousedown="showPassword('password')"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye opacity-50"   viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      </svg>
    </span>

  </div>
</template>

<script>
  import {reactive, toRefs } from 'vue'
  export default{
    name:'input-password',
    props: {
      modelValue: String,
      autocomplete: String
    },
    setup(props, {emit}){
      const state = reactive({
        hidden: true,
        inputType: 'password'
      })

      function showPassword(type){
        state.inputType = type
        state.hidden = !state.hidden
      }

      function updateText(e){
        emit('update:modelValue', e.target.value)
      }

      return { ...toRefs(state), showPassword, updateText  }
    }
  }
</script>


<style scoped>
  .inputIcon{
    opacity: 1;
    position: absolute;
    z-index: 2;
    left: 10px;
    top: 8px;
  }

  .passwordIcon{
    opacity: 1;
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 8px;
  }

  .input-group > .form-control:focus, .input-group > .form-select:focus{
    z-index: 1 !important;
  }
</style>

