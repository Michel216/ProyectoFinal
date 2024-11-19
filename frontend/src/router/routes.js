import Logs from "./../views/Logs.vue";
import Home from "./../views/Home.vue";
import Binnacles from "./../views/Binnacles.vue";
import Modality from "./../views/Modality.vue";
import Certification from "./../views/Certification.vue";
import Assignment from "./../views/Assignment.vue";
import ForgotPassword from "./../views/ForgotPassword.vue";
import Apprentice from "./../views/Apprentice.vue";
import FollowUp from "./../views/FollowUp.vue";
import Fiche  from './../views/Fiche.vue';
import HoursInstructor from "../views/HoursInstructor.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Register from "../views/Register.vue";
import { useAuthStore } from '../store/useAuth.js'; 
import Instructors from "../views/Instructors.vue";
import Layout from "./../layouts/layout.vue";

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
        component: Layout,
        children: [
            { path: "/Home", component: Home, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
            { path: "/Binnacles", component: Binnacles, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR","APRENDIZ"] } },
            { path: "/Instructors", component: Instructors, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Modality", component: Modality, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Assignment", component: Assignment, beforeEnter: auth, meta: { rol: ["ADMIN","INSTRUCTOR"] } },
            { path: "/Register", component: Register, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/ForgotPassword", component: ForgotPassword, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Apprentice/:ficheId?", component: Apprentice, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/FollowUp", component: FollowUp, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
            { path: "/fiches", component: Fiche, beforeEnter: auth, meta: { rol: ["ADMIN"] } },
            { path: "/Certification", component: Certification, beforeEnter: auth, meta: { rol: ["ADMIN", "INSTRUCTOR"] } },
            { path: "/HoursInstructor", component: HoursInstructor, beforeEnter: auth, meta: { rol:["ADMIN"]}},
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    const role = authStore.getRole();

    // Verificar si no está autenticado y la ruta requiere autenticación
    if (to.meta.requiresAuth && !token) {
        next({ path: '/login' }); // Redirigir al login si no hay token
    } 
    // Verificar si es "APRENDIZ" y está intentando acceder a algo que no sea "Binnacles"
    // else if (role === 'APRENDIZ' && to.path !== '/Binnacles') {
    //     next({ path: '/Binnacles' }); // Redirigir automáticamente a la única ruta permitida
    // } 
    // Verificar si el rol no coincide con el rol requerido por la ruta
    else if (to.meta.rol && !to.meta.rol.includes(role)) {
        next({ path: '/unauthorized' }); // Redirigir si el rol no coincide
    } else {
        next(); // Continuar a la ruta solicitada
    }
});

export default router;
