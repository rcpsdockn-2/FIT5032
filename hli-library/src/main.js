import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none',
      cssLayer: false
    }
  }
})

app.use(router)

app.mount('#app')
