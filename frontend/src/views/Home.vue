<template>
  <div class="home">
 
    <div class="titulo" v-if="role === 'INSTRUCTOR'">
      <h5>SEGUIMIENTO ETAPAS PRODUCTIVAS ASIGNADAS Y REGISTRO DE HORAS LABORADAS</h5>
    </div>
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
import UserCard from "../components/cards/cards.vue"; 
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCamera, faUsers, faTasks, faClipboardList, faBook, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from '../store/useAuth.js'; 

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
    rol: ["ADMIN", "INSTRUCTOR"],
  },
];

// Filtra las tarjetas según el rol del usuario
const filteredCards = cards.filter((item) => item.rol.includes(role));

// Asegúrate de registrar el componente FontAwesomeIcon
</script>

<style scoped>
.cards {
  width: 70%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  gap: 40px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra básica */
    margin-bottom: 20px; 
}


.titulo{
  text-align: center;

  max-width: 600px; /* Ajusta el ancho máximo según tus necesidades */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  line-height: 1.2; /* Ajusta el espaciado entre líneas */
}
h5{
   font-weight: bold;
  margin: 1;
  /* margin-top: 80px; */
}
</style>
