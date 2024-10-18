import { createApp } from 'vue'
import { router } from './router/routes.js'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faCheck, faXmark, faEnvelope, faUser, faLock, faHome, faBook, faTasks, faFileAlt, faUserGraduate, faChartLine } from '@fortawesome/free-solid-svg-icons';// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const pinia = createPinia()
const myApp = createApp(App)
pinia.use(piniaPluginPersistedstate)
myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
library.add(faPenToSquare, faCheck, faXmark, faEnvelope, faUser, faLock, faHome, faBook, faTasks, faFileAlt, faUserGraduate, faChartLine);

myApp.use(router)
myApp.use(pinia)
myApp.component('font-awesome-icon', FontAwesomeIcon);
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')