import { createApp } from 'vue'
import './bootstrap'
import './style.css'
import store from './store'
import App from './App.vue'
import dayjs from 'dayjs'
window.dayjs = dayjs

createApp(App)
  .use(store)
  .mount('#app')
