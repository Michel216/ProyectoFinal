<template>
    <div class="btn">
      <q-btn
        color="primary"
        @click="handleClick"
        :label="label"
        class="custom-btn"
      >
        <slot name="prepend"></slot>
      </q-btn>
    </div>
  </template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';

library.add( faEye);

const props = defineProps({
    label:{
        type:String,
        require:true,
        default:"No tengo texto"
    },
    onClickFunction:{
        type:Function
    }
})

function handleClick (){
    props.onClickFunction()
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
</style>

