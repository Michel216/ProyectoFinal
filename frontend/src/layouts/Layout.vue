<template>
  <q-layout view="hHh Lpr lff">
    <q-header  elevated class="bg-green-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://lostramites.com.co/wp-content/uploads/logo-de-Sena-sin-fondo-Blanco-300x300.png" />
          </q-avatar>
          SENA
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered :width="300" :breakpoint="400">

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">

        <q-list padding class="drawer-content">
          <q-item clickable v-ripple v-for="item in menuItems" :key="item.label" :to="item.path"
            active-class="active-item" class="custom-button">
            <q-item-section avatar>
              <!-- <q-icon :name="item.icon" class="icon" /> -->
              <font-awesome-icon :icon="item.icon" class="icon" />
            </q-item-section>
            <q-item-section>
              <span class="button-text">{{ item.label }}</span>
            </q-item-section>
            <q-item-section side v-if="isActiveRoute(item.path)">
              <q-icon name="arrow_right" class="indicator-icon" />
            </q-item-section>
          </q-item>
        </q-list>

      </q-scroll-area>

      <q-img class="absolute-top"
        src="https://img.freepik.com/vector-premium/fondo-diferentes-formas-verdes_23-2148358648.jpg"
        style="height: 150px; display: flex; justify-content: center; align-items: center;">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://lostramites.com.co/wp-content/uploads/logo-de-Sena-sin-fondo-Blanco-300x300.png">
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-grey-4 text-black text-center text-h6 text-weight-bold text-subtitle1">
      <q-toolbar>
        <q-toolbar-title>
          <div>REPFORA - Sena 2024 © Todos los derechos reservados</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faBook, faTasks, faFileAlt, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';

// Añadir iconos a la librería FontAwesome
library.add(faHome, faBook, faTasks, faFileAlt, faUser, faChartLine);

const route = useRoute();

const menuItems = [
  { label: 'Home', path: '/home', icon: ['fas', 'home'] },
  { label: 'Bitácora', path: '/Binnacles', icon: ['fas', 'book'] },
  { label: 'Modalidades', path: '/Modality', icon: ['fas', 'tasks'] },
  { label: 'Asignaciones', path: '/Assignment', icon: ['fas', 'file-alt'] },
  { label: 'Registros', path: '/Register', icon: ['fas', 'user'] },
  { label: 'Aprendices', path: '/Apprentice', icon: ['fas', 'user-graduate'] },
  { label: 'Seguimientos', path: '/FollowUp', icon: ['fas', 'chart-line'] }
];


function isActiveRoute(to) {
  return route.path === to;
}

const leftDrawerOpen = ref(false);
const drawer = ref(false)
// const toggleLeftDrawer = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<style scoped>
.custom-button {
  background-color: green;
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  color: white;
  width: 90%;
  /* max-width: 250px; */
  font-size: 16px;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.icon {
  color: white;
  height: 20px;
  margin-right: 10px;
}

.button-text {
  color: white;
}

.active-item {
  background-color: #005500;
  color: #ffffff;
  font-weight: bold;
}

.indicator-icon {
  color: rgb(255, 255, 255);
  margin-left: 5px;
}
</style>
