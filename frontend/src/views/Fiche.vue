<template>
  <div class="q-pa-md q-gutter-md">

    <h3 class="title-table">Fichas</h3>
    <hr id="hr" class="bg-green-9" />

    <binnacleTable :title="title" :columns="columns" :rows="rows" :options="options" :loading="loading">
      <!-- Scoped slot para la columna 'apprentice' -->
      
    </binnacleTable>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenToSquare, faCheck, faXmark, faUsersBetweenLines, faEnvelope, faPhone, faAddressCard, faUserGraduate, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { getDataRepfora } from "../services/apiRepfora.js";
import binnacleTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import "../composables/Notify";
import { useAuthStore } from "../store/useAuth.js";


library.add(faPenToSquare, faCheck, faXmark, faUsersBetweenLines, faEnvelope, faPhone, faAddressCard, faUserGraduate, faFileSignature);
const router = useRouter();
const authStore = useAuthStore();
const rows = ref([]);
let columns = ref([
  {
    name: "name",
    label: "NOMBRE FICHA",
    align: "center",
    field: "name",
  },
  {
    name: "code",
    label: "COD. FICHA",
    align: "center",
    field: "code",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
  },
  {
    name: "apprentice",
    label: "VER APRENDICES",
    align: "center",
    field: "apprentice",
  },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let response = await getDataRepfora("/fiches");
    console.log(response); // Verifica la estructura de la respuesta completa

    // Accede al array dentro de la respuesta
    let data = response.data;

    // Aquí es importante que 'program' contenga la información adecuada para 'apprentice'
    rows.value = data.map(item => ({
      ...item.program,
      apprentice: item.apprentice, // Asegúrate de que 'apprentice' esté en la fila
    }));
  } catch (error) {
    console.log(error);
  }
}


</script>

<style scoped>
.bg-green-9 {
  color: green;
  width: 99%;
  height: 3.5px;
  border-radius: 10px;
  align-items: center;
}

.title-table {
  text-align: center;
  margin-bottom: 0;
  font-size: 45px;
}
</style>
