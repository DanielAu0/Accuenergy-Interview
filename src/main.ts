import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import { createApp } from 'vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(SmartTable)

app.mount('#app')


