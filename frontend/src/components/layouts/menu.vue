<template>
  <q-drawer  :model-value="leftDrawerOpen" @update:model-value="$emit('update:leftDrawerOpen', $event)" side="left"
    overlay bordered :width="300" :breakpoint="400">

    <q-scroll-area  style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding class="drawer-content">
        <q-item clickable v-ripple v-for="item in filteredMenuItems" :key="item.label" :to="item.path"
          active-class="active-item" class="custom-button">
          <q-item-section avatar>
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
      style="height: 150px; display: flex; justify-content: center; align-items: center; background-color: gainsboro;">
      <div class="absolute-bottom bg-transparent">
        <div class="logo"
          style="display: flex; justify-content: center; align-items: center; width: 25%; height: 100%;">

          <img src="https://senasofiaplus.xyz/wp-content/uploads/2023/10/logo-del-sena-01.png"
            style="max-width: 100%; max-height: 100%; margin-left: 195px;">
        </div>

        <div class="titulo" v-if="rol === 'INSTRUCTOR'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 18px;">INSTRUCTOR
        </div>
        <div class="titulo" v-if="rol === 'ADMIN'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 14px;">USUARIO EP
        </div>
        <div class="titulo" v-if="rol === 'ADMIN' || role === 'INSTRUCTOR'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 10px;">{{ nombre }}</div>
        <div style="display: flex; justify-content: center; align-items: center; color: black;font-size: 12px;">
          {{ correo }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../store/useAuth'; // Ajusta la ruta según sea necesario

const authStore = useAuthStore();
const role = computed(() => authStore.getRole()); // Asegúrate de que esto devuelva el rol correctamente
// Computados para nombre y correo
const nombre = computed(() => authStore.getName());
const correo = computed(() => authStore.getEmail());

const props = defineProps({
  leftDrawerOpen: Boolean,
  menuItems: Array,
  isActiveRoute: Function
});

const rol= role.value

const filteredMenuItems = computed(() =>
  props.menuItems.filter(item => item.rol.includes(role.value))
);
</script>

<style scoped>
.custom-button {
  background-color: green;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
  color: white;
  font-size: 18px;
  margin-left: 5%;
  width: 90%;
  transition: box-shadow 0.3s ease;
}

.custom-button .icon {
  font-size: 20px;
}

.custom-button:hover {
  background-color: #005500;
  /* Color verde un poco más oscuro en hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}

.indicator-icon{
  color: white;
}

</style>