import { createApp } from 'vue'

import App from '@/App.vue'
import '@/assets/css/style.css'
import { router } from '@/utils/router'
import { store } from '@/utils/store'

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')