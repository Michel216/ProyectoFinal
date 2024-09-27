import Login from "./../news/login.vue"
import { createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {path: "/", component: Login}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})