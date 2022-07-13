import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//dependencies & libraries  
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/hover.css/css/hover-min.css'
import '../node_modules/animate.css/animate.min.css'
import './assets/scss/custom.scss'
import './assets/css/custom.css'



createApp(App).use(store).use(router).mount('#app')