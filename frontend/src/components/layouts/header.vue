<!-- <template>
  <q-header elevated class="bg-green-8 text-white">
    <q-layout view="hHh Lpr lff">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <router-link to="/home" class="q-toolbar-title" style="text-decoration: none; color: white;">
          <q-avatar>
            <img src="https://lostramites.com.co/wp-content/uploads/logo-de-Sena-sin-fondo-Blanco-300x300.png" />
          </q-avatar>
        </router-link>
        <router-link to="/" class="iconExit" style="display: flex; align-items: center;">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="exit-icon" />
        </router-link>
      </q-toolbar>
    </q-layout>
  </q-header>

</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Añadir iconos a la librería
library.add(faRightFromBracket);

const route = useRoute();

const menuItems = [
  { label: 'Logs', path: '/Logs', icon: ['fas', 'right-from-bracket'] },
];

function isActiveRoute(to) {
  return route.path === to;
}

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script> -->

<template>
  <q-header elevated class="bg-green-8 text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        <span>{{ title }}</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const  props= defineProps({
  title:{
    type: String,
    default: "REPFORA"
  },
  drawerOpen:{
    type: Boolean,
    default: false
  }
});
 const emit 
</script>