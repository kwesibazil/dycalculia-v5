import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3TouchEvents from "vue3-touch-events";


//dependencies & libraries  
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/hover.css/css/hover-min.css'
import '../node_modules/animate.css/animate.min.css'
import './assets/scss/custom.scss'
import './assets/css/custom.css'



createApp(App)
.use(store).use(router).use(Vue3TouchEvents)
.mount('#app')