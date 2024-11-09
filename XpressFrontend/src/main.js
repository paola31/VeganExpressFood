import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apiClient from './api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$apiClient = apiClient

app.mount('#app')

