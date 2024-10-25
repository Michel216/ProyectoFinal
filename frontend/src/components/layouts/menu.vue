<template>
    <q-drawer 
      :model-value="leftDrawerOpen" 
      @update:model-value="$emit('update:leftDrawerOpen', $event)" 
      side="left" 
      overlay 
      bordered 
      :width="300" 
      :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding class="drawer-content">
          <q-item clickable v-ripple v-for="item in menuItems" :key="item.label" :to="item.path"
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
  </template>
  
  
  <script>  
  export default {
    name: 'Menu',
    props: {
      leftDrawerOpen: Boolean,
      menuItems: Array,
      isActiveRoute: Function
    }
  };
  </script>
  