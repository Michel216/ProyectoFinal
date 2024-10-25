<template>
  <q-card class="my-card">
    <q-img :src="imageSrc" class="card-image">
      <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 15px; background-color: green;">{{ title }}
      </div>
    </q-img>
    <q-card-section class="card-section">
      <font-awesome-icon :icon="icon" class="icon" /> <!-- Agrega una clase para el ícono -->
      <q-btn id="btn" color="primary" clickable :to="buttonLink" v-ripple>
        {{ buttonText }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue'; // Importa defineProps
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Importa el componente

// Define las propiedades
const props = defineProps({
  title: {
    type: String,
    default: 'USUARIOS',
  },
  icon: {
    type: Array,
    required: true, // El ícono es requerido
  },
  buttonLink: {
    type: String,
    default: '/usuario',
  },
  buttonText: {
    type: String,
    default: 'Ver',
  },
});
</script>

<style scoped>
.card-section {
  display: flex;
  flex-direction: column; /* Para apilar el ícono y el botón verticalmente */
  align-items: center; /* Centrar el contenido horizontalmente */
  text-align: center; /* Asegurarse de que el texto esté centrado */
}

.icon {
  margin-top: -30%;
  font-size: 8em; /* Cambia el tamaño del ícono a lo que prefieras */
  margin-bottom: 50px; /* Espacio entre el ícono y el botón */
}

#btn {
  width: 55%;
  border-radius: 5px;
}

#btn:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.493);
}
</style>
