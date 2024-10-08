import Logs from "./../views/Logs.vue"
import Base from "./../layouts/Layout.vue"
import Home from "./../views/Home.vue"
import Binnacles from "./../views/Binnacles.vue"
import Modality from "./../views/Modality.vue"
import Assignment from "./../views/assignment.vue"
import ForgotPassword from "./../views/ForgotPassword.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", component: Logs },
    {
        path: "/Base", component: Base, children: [
            { path: "/Home", component: Home },
            { path: "/binnacles", component: Binnacles },
            { path: "/modality", component: Modality },
            { path: "/assignment", component: Assignment },
        ]
    },
    { path: "/forgotpassword", component: ForgotPassword }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})