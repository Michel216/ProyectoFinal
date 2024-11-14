<template>
  <div class="q-pa-md q-gutter-md">

      <h3 class="title-table">Fichas</h3>
      <hr id="hr" class="bg-green-9" />

      <binnacleTable
:title="title"
:columns="columns"
:rows="rows"
:options="options"
:onUpdateStatus="handleUpdateStatus"
:loading="loading"
>
<!-- Scoped slot para la columna 'apprentice' -->
<template v-slot:body-cell-apprentice="props">
  <q-td :props="props" align="center">
    <Btn
      icon="fa-eye"
      color="primary"
      @click="handleViewApprentices(props.row)"
      label="Ver"
    />
  </q-td>
</template>
</binnacleTable>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from 'vue-router';
import { getDataRepfora } from "../services/apiRepfora.js";
import binnacleTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
"../composables/Notify";

let loading = ref(false);
let title = "Fichas";
let btnLabel = "Crear ";
import { useAuthStore } from '../store/useAuth.js';

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
  }
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

      rows.value = data.map(item => item.program);
  } catch (error) {
      console.log(error);
  }
}

function handleViewApprentices(row) {
console.log("Detalles de la fila:", row);
router.replace("./Apprentice");
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