<template>
  <q-layout view="hHh Lpr lff">
    <Header @toggle-drawer="toggleLeftDrawer" />
    <Menu :leftDrawerOpen="leftDrawerOpen" :menuItems="menuItems" :isActiveRoute="isActiveRoute" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import Header from '../components/layouts/Header.vue';
import Menu from '../components/layouts/Menu.vue';
import Footer from '../components/layouts/Footer.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Header,
    Menu,
    Footer,
  },
  setup() {
    const leftDrawerOpen = ref(false);
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

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      menuItems,
      isActiveRoute
      
    };
  },
};
</script>