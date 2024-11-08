<template>
  <q-drawer :model-value="leftDrawerOpen" @update:model-value="$emit('update:leftDrawerOpen', $event)" side="left"
    overlay bordered :width="300" :breakpoint="400">

    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
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

        <div class="titulo" v-if="role === 'INSTRUCTOR'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 18px;">INSTRUCTOR
        </div>
        <div class="titulo" v-if="role === 'ADMIN'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 14px;">USUARIO EP
        </div>
        <div class="titulo" v-if="role === 'ADMIN', 'INSTRUCTOR'"
          style="display: flex; justify-content: center; align-items: center; color: black; font-size: 10px;">NOMBRE DE
          USUARIO</div>
        <div style="display: flex; justify-content: center; align-items: center; color: black;font-size: 12px;">
          @rstoenescu</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../store/useAuth'; // Adjust the path as necessary

const props = defineProps({
  leftDrawerOpen: Boolean,
  menuItems: Array,
  isActiveRoute: Function
});

const authStore = useAuthStore();
const role = authStore.getRole();

const filteredMenuItems = computed(() =>
  props.menuItems.filter(item => item.rol.includes(role))
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
}

.custom-button .icon {
  font-size: 20px;
}

.custom-button:hover {
  background-color: #066b0b;
  /* Color verde un poco más oscuro en hover */
}
</style>