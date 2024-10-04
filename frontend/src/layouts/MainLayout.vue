<template>
  <q-layout view="hHh LpR lff">
    <q-header reveal elevated class="bg-green-8 text-white">
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
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
  <q-img class="absolute-top"
    src="https://img.freepik.com/vector-premium/fondo-diferentes-formas-verdes_23-2148358648.jpg"
    style="height: 150px; display: flex; justify-content: center; align-items: center;">
    <div class="absolute-bottom bg-transparent" style="display: flex; flex-direction: column; align-items: center;">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://lostramites.com.co/wp-content/uploads/logo-de-Sena-sin-fondo-Blanco-300x300.png" />
      </q-avatar>
      <div class="text-weight-bold">Razvan Stoenescu</div>
      <div>@rstoenescu</div>
    </div>
  </q-img>
</q-drawer>

<q-page-container>
  <div>
    <q-banner rounded :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" style="text-align: center">
      <div style="display: flex; flex-direction: column; align-items: center">
        <img src="https://sena.edu.co/Style%20Library/alayout/images/logoSena.png"
          style="width: 100px; height: 85px; margin-bottom: 0" />
        <div>BIENVENIDO `${usuario}`</div>
      </div>
    </q-banner>
  </div>
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

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>