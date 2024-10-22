import Home from "../views/Home.vue"; // Importa Home como componente principal
import Binnacles from "../views/Binnacles.vue";
import Modality from "../views/Modality.vue";
import Assignment from "../views/Assignment.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Apprentice from "../views/Apprentice.vue";
import FollowUp from "../views/FollowUp.vue";
import Register from "../views/Register.vue";
import Logs from "../views/Logs.vue"; // Mantén Logs si aún es necesario
import { createRouter, createWebHashHistory } from "vue-router"


// Define las rutas sin el layout, utilizando Home como principal
const routes = [
  { path: "/", component: Logs }, // Si Logs es la página de inicio, la dejamos
  {
    path: "/base",
    component: Home, // Usa Home como el componente base en lugar de Layout
    children: [
      { path: "binnacles", component: Binnacles },
      { path: "modality", component: Modality },
      { path: "assignment", component: Assignment },
      { path: "register", component: Register },
      { path: "forgotPassword", component: ForgotPassword },
      { path: "apprentice", component: Apprentice },
      { path: "followUp", component: FollowUp },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
