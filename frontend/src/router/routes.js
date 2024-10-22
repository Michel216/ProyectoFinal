import Logs from "./../views/Logs.vue";
import Base from "./../layouts/Layout.vue";
import Home from "./../views/Home.vue";
import Binnacles from "./../views/Binnacles.vue";
import Modality from "./../views/Modality.vue";
import Assignment from "./../views/Assignment.vue";
import ForgotPassword from "./../views/ForgotPassword.vue";
import Apprentice from "./../views/Apprentice.vue";
import FollowUp from "./../views/FollowUp.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Register from "../views/Register.vue";
import { useAuthStore } from '../store/useAuth.js'; 

// Definir la función de autenticación
const auth = (to, from, next) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    const role = authStore.getRole();

    // Verificar si la ruta requiere autenticación
    if (to.meta.rol && !to.meta.rol.includes(role)) {
        next({ path: '/unauthorized' }); // Redirigir si el rol no coincide
    } else if (to.meta.requiresAuth && !token) {
        next({ path: '/login' }); // Redirigir al login si no hay token
    } else {
        next(); // Continuar a la ruta solicitada
    }
};

const routes = [
    { path: "/", component: Logs },
    {
        path: "/Base",
        component: Base,
        children: [
            { path: "/Home", component: Home, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
            { path: "/Binnacles", component: Binnacles, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
            { path: "/Modality", component: Modality, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Assignment", component: Assignment, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Register", component: Register, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/ForgotPassword", component: ForgotPassword, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Apprentice", component: Apprentice, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/FollowUp", component: FollowUp, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Verificación adicional antes de cada ruta
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    const role = authStore.getRole();

    if (to.meta.requiresAuth && !token) {
        next({ path: '/login' }); // Redirigir al login si no hay token
    } else if (to.meta.role && to.meta.role !== role) {
        next({ path: '/unauthorized' }); // Redirigir si el rol no coincide
    } else {
        next(); // Continuar a la ruta solicitada
    }
});

export default router;
