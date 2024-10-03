import { createApp } from 'vue'
import { router } from './router/routes.js'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const pinia = createPinia()

const myApp = createApp(App)
pinia.use(piniaPluginPersistedstate)
myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

myApp.use(router)
myApp.use(pinia)
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')