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
      <!-- Mostrar el botón de menú si el rol no es "CONSULTOR" -->
      <q-btn 
        v-if="role !== 'CONSULTOR'" 
        dense 
        flat 
        round 
        icon="menu" 
        @click="$emit('toggle-drawer')" 
      />
      <!-- Enlace al inicio -->
      <router-link 
        to="/home" 
        class="q-toolbar-title" 
        style="text-decoration: none; color: white; font-weight: bold;"
      >
        ETAPAS PRODUCTIVAS
      </router-link>
      <!-- Enlace para salir -->
      <router-link 
        to="/" 
        class="iconExit" 
        style="display: flex; text-decoration: none; color: white; margin-left: auto;"
        @click="tokenDelete()"
      >
        <q-btn dense flat round icon="logout" />
      </router-link>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../store/useAuth'; // Ajusta la ruta según sea necesario

// Usar el store de autenticación
const authStore = useAuthStore();

function tokenDelete() {
  authStore.deleteToken()
}

// Obtener el rol del usuario desde el store
const role = computed(() => authStore.getRole());
</script>



