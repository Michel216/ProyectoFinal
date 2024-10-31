<template>
  <q-layout view="hHh Lpr lff">
    <Header @toggle-drawer="toggleLeftDrawer" />
    <Menu 
      :leftDrawerOpen="leftDrawerOpen" 
      :menuItems="menuItems" 
      :isActiveRoute="isActiveRoute" 
      @update:leftDrawerOpen="leftDrawerOpen = $event"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/layouts/header.vue';
import Menu from '../components/layouts/menu.vue';
import Footer from '../components/layouts/footer.vue';
import { useRoute } from 'vue-router';

const leftDrawerOpen = ref(false);
const route = useRoute();

const menuItems = [
  { label: 'Home', path: '/home', icon: ['fas', 'home'], rol: ["ADMIN", "INSTRUCTOR", "ETAPA PRODUCTIVA"] },
  { label: 'Bitácora', path: '/Binnacles', icon: ['fas', 'book'], rol: ["ADMIN", "ETAPA PRODUCTIVA", "INSTRUCTOR"] },
  { label: 'Modalidades', path: '/Modality', icon: ['fas', 'tasks'], rol: ["ADMIN", "ETAPA PRODUCTIVA",] },
  { label: 'Asignaciones', path: '/Assignment', icon: ['fas', 'file-alt'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Registros', path: '/Register', icon: ['fas', 'user'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Aprendices', path: '/Apprentice', icon: ['fas', 'user-graduate'], rol: ["ADMIN", "ETAPA PRODUCTIVA"] },
  { label: 'Seguimientos', path: '/FollowUp', icon: ['fas', 'chart-line'], rol: ["ADMIN", "ETAPA PRODUCTIVA", "INSTRUCTOR"] }
];

function isActiveRoute(to) {
  return route.path === to;
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
