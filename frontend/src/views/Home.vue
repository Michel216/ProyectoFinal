<template>
  <div class="home">
    <div class="cards">
      <UserCard
        v-for="(card, index) in cards"
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

// Registra los íconos
library.add(faCamera, faUsers, faTasks, faClipboardList, faBook, faChartLine);

// Define las tarjetas con datos
const cards = [
  {
    title: "Instructor",
    buttonLink: "/instructor",
    buttonText: "Ver",
    icon: ["fas", "user"], 
  },
  {
    title: "Aprendices",
    buttonLink: "/apprentice",
    buttonText: "Ver",
    icon: ["fas", "users"], 
  },
  {
    title: "Asignación",
    buttonLink: "/assignment",
    buttonText: "Ver",
    icon: ["fas", "tasks"], // Ícono de tareas
  },
  {
    title: "Seguimiento",
    buttonLink: "/followup",
    buttonText: "Ver",
    icon: ["fas", "clipboard-list"], // Ícono de lista
  },
  {
    title: "Bitacoras",
    buttonLink: "/binnacles",
    buttonText: "Ver",
    icon: ["fas", "book"], // Ícono de libro
  },
  {
    title: "Informes",
    buttonLink: "/reports",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], // Ícono de gráfico
  },
];

// Asegúrate de registrar el componente FontAwesomeIcon
const components = {
  FontAwesomeIcon
};
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