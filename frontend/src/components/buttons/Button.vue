<template>
    <div class="btn">
      <q-btn
      :icon="icon"
      color="primary"
      @click="handleClick"
      :label="isLoading ? '' : label" 
      :disabled="isLoading" 
      class="custom-btn"
      >
      <template v-if="isLoading">
        <q-spinner/>
      </template>
        <slot name="prepend"></slot>
        <!-- <i v-if="icon" :class="`material-icons`">{{ icon }}</i> -->
  
      </q-btn>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';

library.add( faEye);

const props = defineProps({
    icon: {
      type: String, // Define que es un string para el nombre del ícono
      default: null // Si no se pasa, no mostrará nada
    },
    label:{
        type:String,
        require:true,
        default:"No tengo texto"
    },
    onClickFunction:{
        type:Function,
        required: false 
    },

})


const isLoading = ref(false);
function handleClick (){
  isLoading.value = true;

setTimeout(() => {

  if (props.onClickFunction) {
    props.onClickFunction();
  }

  isLoading.value = false;
});
}

</script>
<style scoped>
.custom-btn {
  transition: all 0.3s ease;
}

.custom-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  text-shadow: 0px 0px 10px white;
}

.material-icons {
  font-size: 20px; /* Ajusta el tamaño del ícono */
}
</style>

