<template>
  <div class="q-pa-md">
    <binnacleTable :title="title" :columns="columns" :rows="rows" :options="options"
      :onUpdateStatus="handleUpdateStatus" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from '../services/apiClient.js';
import binnacleTable from '../components/tables/Table.vue'


let title = "Bitácoras"
const rows = ref([])
let columns = ref([
  { name: 'assignment', label: 'Asignación', align: 'center', field: 'assignment' },
  { name: 'instructor', label: 'Instructor', align: 'center', field: 'instructor' },
  { name: 'number', align: "center", label: 'Número de bitácora', field: 'number', sortable: true },
  { name: 'document', align: "center", label: 'Documento', field: 'document' },
  { name: "options", label: "Editar", align: "center", field: "status" }
]);

// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4
let options = ref([{
  label: "Programado",
  value: 1
}, {
  label: "Ejecutado",
  value: 2
}, {
  label: "Pendiente",
  value: 3
}, {
  label: "Verificado",
  value: 4
}])

onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/binnacles/listallbinnacles');
    console.log(data);
    
    rows.value = data.ListAllBinnacles.map(binnacle => {
      return {
        ...binnacle,
        instructor: binnacle.instructor.name
      }
    })
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateStatus(status, row) {
  try {
    let data = await putData(`/binnacles/updatestatus/${row}/${status}`)
    bring()
  } catch (error) {
    console.log(error);
  }
}

</script>
