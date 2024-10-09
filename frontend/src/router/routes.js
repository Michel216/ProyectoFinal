import Logs from "./../views/Logs.vue"
import Base from "./../layouts/Layout.vue"
import Home from "./../views/Home.vue"
import Binnacles from "./../views/Binnacles.vue"
import Modality from "./../views/Modality.vue"
import Assignment from "./../views/assignment.vue"
import ForgotPassword from "./../views/ForgotPassword.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import Register from "../views/Register.vue"

const routes = [  {path: "/", component: Logs},{
  
    path: "/Base", component: Base, children: [
        {path: "/Home", component: Home},
        { path: "/Binnacles", component: Binnacles },
        { path: "/Modality", component: Modality },
        { path: "/Assignment", component: Assignment },
        { path: "/Register", component: Register },
    ]
}]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})