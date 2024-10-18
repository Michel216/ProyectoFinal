import Logs from "./../views/Logs.vue"
import Base from "./../layouts/Layout.vue"
import Home from "./../views/Home.vue"
import Binnacles from "./../views/Binnacles.vue"
import Modality from "./../views/Modality.vue"
import Assignment from "./../views/Assignment.vue"
import ForgotPassword from "./../views/ForgotPassword.vue"
import Apprentice from "./../views/Apprentice.vue"
import FollowUp from "./../views/FollowUp.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import Register from "../views/Register.vue"

const routes = [  {path: "/", component: Logs},{
  
    path: "/Base", component: Base, children: [
        {path: "/Home", component: Home},
        { path: "/Binnacles", component: Binnacles },
        { path: "/Modality", component: Modality },
        { path: "/Assignment", component: Assignment },
        { path: "/Register", component: Register },
        { path: "/ForgotPassword", component: ForgotPassword },
        { path: "/Apprentice", component: Apprentice },
        { path: "/FollowUp", component: FollowUp },
    ]
}]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})