<template>
    <div>Cambiar Contraseña
 
          <Btn :label='"Cambiar Contraseña"'
          :onClickFunction='ClickFunction'></Btn>
    </div>
</template>
<script setup>
  import { useRouter } from 'vue-router';

  import Btn from '../components/Button.vue'
  const router = useRouter();

  const ClickFunction = async () => {
    router.replace("/")
  }
    
</script>