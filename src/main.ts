import './assets/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin) // Tanstack needs to be mounted to app

app.mount('#app')
