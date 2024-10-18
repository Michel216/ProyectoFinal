<template>
  <div>Cambiar Contraseña

    <Btn :label='btnLabel' :onClickFunction='ClickFunction' />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import Btn from '../components/buttons/Button.vue'

let btnLabel = "Cambiar Contraseña"
const router = useRouter();

const ClickFunction = async () => {
  router.replace("/")
}

</script>