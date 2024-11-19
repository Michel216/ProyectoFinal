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
        :imageSrc="card.imageSrc"
        class="card-item"
      />
    </div>
  </div>
</template>

<script setup>
import UserCard from "../components/cards/cards.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import {
//   faCamera,
//   faUsers,
//   faTasks,
//   faClipboardList,
//   faBook,
//   faChartLine,
// } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../store/useAuth.js";
import Button from "../components/buttons/Button.vue";

// Registra los íconos
// library.add(faCamera, faUsers, faTasks, faClipboardList, faBook, faChartLine);

const authStore = useAuthStore();
const role = authStore.getRole(); // Obtiene el rol del usuario actual

// Define las tarjetas con datos
const cards = [
  {
    title: "Aprendices",
    buttonLink: "/apprentice",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-estudiantes-universitarios_114360-28349.jpg?t=st=1731616374~exp=1731619974~hmac=64509e851a8d21d580c9d5b5fd3f7a6bfeb33398bf2590813c5e4bfaf1af5c12&w=740", // Cambia esta ruta a la ubicación de tu imagen
  rol: ["ADMIN"],
},
 
  {
    title: "Asignación",
    buttonLink: "/assignment",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-auditoria_114360-6397.jpg?ga=GA1.1.1307591831.1699306440&semt=ais_hybrid",
    rol: ["ADMIN", "INSTRUCTOR"],
  },
  {
    title: "Seguimiento",
    buttonLink: "/followup",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-estadisticas-sitio_114360-1434.jpg?ga=GA1.1.1307591831.1699306440&semt=ais_hybrid",
    rol: ["ADMIN", "INSTRUCTOR"],
  
  },
  {
    title: "Registros",
    buttonLink: "/register",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-archivos-texto_114360-4402.jpg?t=st=1731616623~exp=1731620223~hmac=1e22267e40bfabae391d948ff2a03b97dcb02013895a306e3da34be7602189db&w=740",
    rol: ["ADMIN"],
  },
  {
    title: "Bitacoras",
    buttonLink: "/binnacles",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/edicion-ilustracion-concepto-texto-cuerpo_114360-5501.jpg?ga=GA1.1.1307591831.1699306440&semt=ais_hybrid",
    rol: ["ADMIN", "INSTRUCTOR", "APRENDIZ"],
  },
  {
    title: "Informes",
    buttonLink: "/reports",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-papel-investigacion_114360-8312.jpg?t=st=1731616658~exp=1731620258~hmac=94866a5855fba1ed6478cdc22e7eac191e8b420ada89bac3166bbb8c33325a6f&w=740",
    rol: ["ADMIN"],
  },
  {
    title: "Registro de Horas",
    buttonLink: "/reports",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/tabla-conversacion-concepto-gestion-tiempo_23-2148831728.jpg?t=st=1731616413~exp=1731620013~hmac=bde5de7cabc1e62980faded2e4aada181107a77a1b24cb17fe53556009b7b45b&w=740",
    rol: [, "INSTRUCTOR"],
  },
  {
    title: "Fichas",
    buttonLink: "/fiches",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-actividad-desarrollador_114360-2801.jpg?t=st=1731616785~exp=1731620385~hmac=d8dd9657be88b5d4115df3355918f21341a7fc70c1c1f03a8c05e66b17a68410&w=740",
    rol: [, "ADMIN"],
  },
  {
    title: "Instructores",
    buttonLink: "/Instructors",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/gerente-presentando-solucion-tecnica_74855-7614.jpg?t=st=1731616873~exp=1731620473~hmac=c218c5acf507e543b0948d98e6c793700fbac8544849db406d9f18295065e432&w=740",
    rol: [, "ADMIN"],
  },
  {
    title: "Modalidades",
    buttonLink: "/modality",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-desarrollo-software-sistema_335657-4892.jpg?t=st=1731617033~exp=1731620633~hmac=b70ad9c71b2e5b47f95cd828be8046dc70e0b223ddcea7ec0b60d69077dbecaa&w=740",
    rol: [, "ADMIN"],
    
  },
  {
    title: "Certificados",
    buttonLink: "/reports",
    buttonText: "Ver",
    imageSrc: "https://img.freepik.com/vector-gratis/socios-comerciales-que-firman-documento-pequenos-personajes-boligrafo-papel-firma-sello-plano-ilustracion_74855-10491.jpg?ga=GA1.1.1307591831.1699306440&semt=ais_hybrid",
    rol: [, "INSTRUCTOR","ADMIN"],
  },
  {
    title:"Informe Horas Instructores EP",
    buttonLink:"/hoursInstructor",
    buttonText:"Ver",
    imageSrc:"https://img.freepik.com/vector-gratis/concepto-landing-page-control-tiempo_52683-21296.jpg?t=st=1731976679~exp=1731980279~hmac=9e524f6784021f660134d8b0aa82db70d4a316ad12aef95f332b290b9416b1db&w=826",
    rol:[,"ADMIN"],
  },
 
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
