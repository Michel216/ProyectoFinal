<template>
  <div class="home">
    <div class="cards">
      <UserCard
        v-for="(card, index) in filteredCards"
        :key="index"
        :title="card.title"
        :buttonLink="card.buttonLink"
        :buttonText="card.buttonText"
        :icon="card.icon"
      />
    </div>
  </div>
</template>

<script setup>
import UserCard from "../components/cards/cards.vue"; // Asegúrate de que esta ruta sea correcta
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCamera, faUsers, faTasks, faClipboardList, faBook, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from '../store/useAuth.js'; // Asegúrate de importar tu store

// Registra los íconos
library.add(faCamera, faUsers, faTasks, faClipboardList, faBook, faChartLine);

const authStore = useAuthStore();
const role = authStore.getRole(); // Obtiene el rol del usuario actual

// Define las tarjetas con datos
const cards = [
  {
    title: "Aprendices",
    buttonLink: "/apprentice",
    buttonText: "Ver",
    icon: ["fas", "users"], 
    rol: ["ADMIN",],
  },
  {
    title: "Asignación",
    buttonLink: "/assignment",
    buttonText: "Ver",
    icon: ["fas", "tasks"], 
    rol: ["ADMIN","INSTRUCTOR"],
  },
  {
    title: "Seguimiento",
    buttonLink: "/followup",
    buttonText: "Ver",
    icon: ["fas", "clipboard-list"], 
    rol: ["ADMIN", "INSTRUCTOR"],
  },
  {
    title: "Bitacoras",
    buttonLink: "/binnacles",
    buttonText: "Ver",
    icon: ["fas", "book"], 
    rol: ["ADMIN", "INSTRUCTOR", "APRENDIZ"],
  },
  {
    title: "Informes",
    buttonLink: "/reports",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], 
    rol: ["ADMIN"],
  },
  {
    title: "Registro de Horas",
    buttonLink: "/reports",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], 
    rol: ["ADMIN", "INSTRUCTOR"],
  },
];

// Filtra las tarjetas según el rol del usuario
const filteredCards = cards.filter((item) => item.rol.includes(role));

// Asegúrate de registrar el componente FontAwesomeIcon
</script>

<style scoped>
.cards {
  width: 50%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  gap: 40px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>