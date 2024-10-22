<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <Header
      :title="'REPFORA'"
      :drawerOpen="drawerOpen"
      @toggleDrawer="toggleDrawer"
    />
        <Menu :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />
  
    <q-page-container>
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
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import Header from "../components/layouts/header.vue";
import Menu from "../components/layouts/menu.vue";
import Footer from "../components/layouts/footer.vue";
import UserCard from "../components/cards/cards.vue";

// Estado para controlar el drawer del menú lateral
const drawerOpen = ref(false);

// Función para abrir/cerrar el drawer
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

// Función para abrir un diálogo (ejemplo, puedes adaptarla a tu necesidad)
const openDialog = () => {
  // Lógica para abrir un diálogo o hacer alguna acción
};

// Datos para las tarjetas (ya los tienes definidos)
const cards = [
  {
    title: "Instructor",
    buttonLink: "/instructor",
    buttonText: "Ver",
    icon: ["fas", "user"],
  },
  // Otras tarjetas...
];
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
