<template>
  <q-card class="my-card">
    <q-img :src="imageSrc" class="card-image">
     
    </q-img>
    <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 18px; background-color: green;  border-radius: 8px 8px 0 0; height: 50px; color: white; text-align: center; ">
        <p style="margin-top: 15px">{{ title }}</p>
      </div>
    
    <q-card-section class="card-section">
      <q-btn id="btn" color="primary" clickable :to="buttonLink" v-ripple>
        {{ buttonText }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Define las propiedades
const props = defineProps({
  title: {
    type: String,
    default: 'USUARIOS',
  },
  imageSrc: {
    type: String,
    required: true, 
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
.card-image {
  height: 150px; /* Ajusta la altura de la imagen a 120px o el valor que prefieras */

  width: 200px;
  align-items: center;
  margin-top: 60px;
}

.card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px; /* Espaciado para el contenido */
  
}

#btn {
  width: 80%; /* Aumenté el tamaño del botón */
  border-radius: 5px;
  margin-top: 8px; /* Añadí un margen superior */
  transition: box-shadow 0.3s ease;
}

#btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  /* Sombra al pasar el mouse, sin cambiar el color */
  text-shadow: 0px 0px 10px white;
}
</style>
