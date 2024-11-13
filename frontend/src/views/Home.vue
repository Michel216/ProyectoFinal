<template>
  <div class="home">
    <div class="titulo" v-if="role === 'INSTRUCTOR'">
      <h5>
        SEGUIMIENTO ETAPAS PRODUCTIVAS ASIGNADAS Y REGISTRO DE HORAS LABORADAS
      </h5>
    </div>

    <div class="titulo" v-if="role === 'ADMIN'">
      <h5>
        REGISTRO Y ASIGNACION DE SEGUIMIENTO A ESTAPAS PRODUCTIVAS DE LOS
        APRENDICES
      </h5>
    </div>
    <div class="cards">
      <UserCard
        v-for="(card, index) in filteredCards"
        :key="index"
        :title="card.title"
        :buttonLink="card.buttonLink"
        :buttonText="card.buttonText"
        :icon="card.icon"
        class="card-item"
      />
    </div>
  </div>
</template>

<script setup>
import UserCard from "../components/cards/cards.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCamera,
  faUsers,
  faTasks,
  faClipboardList,
  faBook,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../store/useAuth.js";

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
    rol: ["ADMIN"],
  },
  {
    title: "Asignación",
    buttonLink: "/assignment",
    buttonText: "Ver",
    icon: ["fas", "tasks"],
    rol: ["ADMIN", "INSTRUCTOR"],
  },
  {
    title: "Seguimiento",
    buttonLink: "/followup",
    buttonText: "Ver",
    icon: ["fas", "clipboard-list"],
    rol: ["ADMIN", "INSTRUCTOR"],
  },
  {
    title: "Registros",
    buttonLink: "/register",
    buttonText: "Ver",
    icon: ["fas", "clipboard-list"],
    rol: ["ADMIN"],
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
    rol: [, "INSTRUCTOR"],
  },
  {
    title: "Fichas",
    buttonLink: "/fiches",
    buttonText: "Ver",
    icon: ["fas", "chart-line"],
    rol: [, "ADMIN"],
  },
  {
    title: "Instructores",
    buttonLink: "/Instructors",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], 
    rol: [, "ADMIN"],
  },
  {
    title: "Modalidades",
    buttonLink: "/modality",
    buttonText: "Ver",
    icon: ["fas", "chart-line"],
    rol: [, "ADMIN"],
  },
  {
    title: "Certificados",
    buttonLink: "/reports",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], 
    rol: [, "INSTRUCTOR","ADMIN"],
  },
  {
    title: "Programas",
    buttonLink: "/reports",
    buttonText: "Ver",
    icon: ["fas", "chart-line"], 
    rol: [, "INSTRUCTOR","ADMIN"],
  }
];

// Filtra las tarjetas según el rol del usuario
const filteredCards = cards.filter((item) => item.rol.includes(role));

// Asegúrate de registrar el componente FontAwesomeIcon
</script>

<style scoped>
.cards {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr)); 
  gap: 30px; 
  justify-items: center;  
  align-items: center;  
  margin-bottom: 20px; 
  text-align: center;  
}


.card-item {
  /* background-color: #fff; */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
  /* padding: 16px; */
  width: 90%; 
  justify-content: center;
  text-align: center;
  align-items: center;

}

.titulo {
  text-align: center;

  max-width: 600px;
  /* Ajusta el ancho máximo según tus necesidades */
  margin: 0 auto;
  /* Centra el contenedor horizontalmente */
  line-height: 1.2;
  /* Ajusta el espaciado entre líneas */
}

h5 {
  font-weight: bold;
  margin: 1;
  /* margin-top: 80px; */
}
</style>
