<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Fichas"></Header>
    <!-- <hr id="hr" class="bg-green-9" /> -->
    <ficheTable :title="title" :columns="columns" :rows="rowsForTable" :options="options" :toggleSeeApprentice="handleViewApprentices">
    </ficheTable>
    <!-- <h3 class="title-table">Fichas</h3> -->
  </div>
</template>

<script setup>
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
import ficheTable from '../components/tables/SecondTable.vue';
// import Btn from '../components/buttons/Button.vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getDataRepfora } from '../services/apiRepfora.js';
import Header from '../components/header/Header.vue';

// library.add(faEye);

const router = useRouter();
const rows = ref([]); // Almacena la respuesta completa
const rowsForTable = ref([]); // Solo los datos de `program` para mostrar en la tabla

const columns = ref([
{
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  { name: "name", label: "NOMBRE DEL PROGRAMA", align: "center", field: "name" },
  { name: "code", label: "CÓDIGO DEL PROGRAMA", align: "center", field: "code", sortable: true },
  { name: "status", label: "ESTADO", align: "center", field: "status" },
  { name: "apprentice", label: "VER APRENDICES", align: "center", field: "apprentice" },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let response = await getDataRepfora("/fiches");

    // Guarda la respuesta completa en `rows`
    rows.value = response.data;
console.log(response);

    // Crea `rowsForTable` con solo los datos de `program` para la tabla y el ID de la ficha completa
    rowsForTable.value = response.data.map((item, idx) => ({
      ...item.program,  // Incluye las propiedades de `program` para mostrar en la tabla
      ficheId: item._id,
      index: idx + 1,
    }));
  } catch (error) {
    console.error("Error al traer los datos:", error);
  }
}

function handleViewApprentices(row) {
  if (row && row.ficheId) {
    router.push({
      path: './Apprentice/:ficheId?',
      query: { ficheId: row.ficheId }
    });
    console.log('Navigating to ficheId:', row.ficheId);
  } else {
    console.error('ID de la ficha no encontrado en la fila.');
  }
}
</script>

<style scoped>
/* .bg-green-9 {
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
} */
</style>
