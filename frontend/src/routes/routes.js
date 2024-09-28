import Home from "./../components/Home.vue"
import Binnacles from "./../views/Binnacles.vue"
import Modality from "./../views/Modality.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [{
    path: "/", component: Home, children: [
        { path: "/binnacles", component: Binnacles },
        { path: "/modality", component: Modality }
    ]
}]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})