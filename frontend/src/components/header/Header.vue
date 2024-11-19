<template>
  <div>
  <div id="en">
    <q-btn to="/home" dense unelevated round color="primary" icon="arrow_back" text-color="white" class="iconExit" />
    <h1 id="programas">{{title}}</h1>
  </div>
  <hr color="primary"></div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title:{
    type:String,
    required:true,
    default:'Title'
  },
})

</script>

<style>
#en {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  padding-top: 0px;
  width: 100%; /* O el ancho que desees */
  display: flex;
  justify-content: center;
}

#programas {
  font-size: 37px;
  font-weight: 700;
  text-align: center;
  flex-grow: 1;
  padding-top: 20px;
  margin-bottom: 0px;
}

#atras {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  /* background-color: #2F7D32; */
  color: white;
  margin-left: 3%;
  margin-top: 20px;
  cursor: pointer;
  position: absolute;
  box-shadow: 10px 10px 10px black
}

#atras:focus {
  outline: none;
}

hr {
    border: 2px solid green;
  width: 66rem;            /* Define el ancho de la línea */
  border-radius: 10px;
   margin: auto auto !important;
   margin-top: -1% !important;
   margin-bottom: 5% !important
}

.iconExit{
    font-size: 50px; /* Aumenta el tamaño del icono */
  color: #ffffff; /* Asegura que el color sea blanco */

}
</style>