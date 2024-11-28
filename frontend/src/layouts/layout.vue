<template>
  <q-layout view="hHh Lpr lff">
    <!-- Componente Header con evento para alternar el menú lateral -->
    <Header @toggle-drawer="toggleLeftDrawer" />
    
    <!-- Componente Menu, pasando propiedades y escuchando el evento para actualizar el estado del menú -->
    <Menu 
      :leftDrawerOpen="leftDrawerOpen" 
      :menuItems="menuItems" 
      :isActiveRoute="isActiveRoute" 
      @update:leftDrawerOpen="leftDrawerOpen = $event"
    />
    
    <!-- Contenedor de la página donde se renderiza el contenido de las rutas -->
    <q-page-container>
      <router-view />
    </q-page-container>
    
    <!-- Componente Footer -->
    <Footer />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/layouts/header.vue';
import Menu from '../components/layouts/menu.vue';
// import Footer from '../components/layouts/Footer.vue';
import { useRoute } from 'vue-router';

const leftDrawerOpen = ref(false);
const route = useRoute();

const menuItems = [
  { label: 'Home', path: '/home', icon: ['fas', 'home'], rol: ["ADMIN", "INSTRUCTOR", "ETAPA PRODUCTIVA"] },
  { label: 'Bitácora', path: '/Binnacles', icon: ['fas', 'book'], rol: ["ADMIN", "ETAPA PRODUCTIVA", "INSTRUCTOR"] },
  // { label: 'Modalidades', path: '/Modality', icon: ['fas', 'tasks'], rol: [ "ETAPA PRODUCTIVA"] },
  { label: 'Asignaciones', path: '/Assignment', icon: ['fas', 'file-alt'], rol: ["ADMIN", "ETAPA PRODUCTIVA","INSTRUCTOR"] },
 { label: 'Modalidad EP', path: '/Modality', icon: ['fas', 'tasks'], rol: ["ADMIN", "ETAPA PRODUCTIVA",] },
  { label: 'Registros', path: '/Register', icon: ['fas', 'user'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Aprendices', path: '/Apprentice', icon: ['fas', 'user-graduate'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Seguimientos', path: '/FollowUp', icon: ['fas', 'chart-line'], rol: ["ADMIN", "ETAPA PRODUCTIVA", "INSTRUCTOR"] },
  // { label: 'Informes', path: '/reports', icon: ['fas', 'user-graduate'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Fichas', path: '/fiches', icon: ['fas', 'chart-line'], rol: ["ADMIN" ] },
  { label: 'Registro de Horas', path: '/reports', icon: ['fas', 'user-graduate'], rol: ["INSTRUCTOR" ] },
  { label: 'Certificaciones', path: '/Certification', icon: ['fas', 'user-graduate'], rol: ["ADMIN","INSTRUCTOR" ] },
  { label: 'Informe Horas Instructor EP', path: '/HoursInstructor', icon: ['fas', 'user-graduate'], rol: ["ADMIN","INSTRUCTOR" ] },
  { label: 'History', path: '/History', icon: ['fas', 'chart-line'], rol: ["CONSULTOR" ] },

];


function isActiveRoute(to) {
  return route.path === to;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
