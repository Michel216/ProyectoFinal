<template>
  <div class="q-pa-md q-gutter-md">
    <FollowupTable :title="title" :columns="columns" :rows="rows" :options="options"
      :onUpdateStatus="handleUpdateStatus" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from '../services/apiClient.js';
import { formatMonth } from '../utils/formatMonth.js';
import FollowupTable from '../components/tables/SecondTable.vue';

let title = 'Seguimientos'
const rows = ref([]);
const columns = ref([
  { name: 'assignment', label: 'Asignación', align: 'center', field: 'assignment' },
  { name: 'instructor', label: 'Instructor', align: 'center', field: 'instructor' },
  { name: 'number', label: 'Número', align: 'center', field: 'number' },
  { name: 'month', label: 'Mes', align: 'center', field: 'month' },
  { name: 'document', label: 'Documento', align: 'center', field: 'document' },
  { name: 'users', label: 'Usuarios', align: 'center', field: 'users' },
  // { name: 'observations', label: 'Observaciones', align: 'center', field: 'observations' }
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
    let data = await getData('/followup/listallfollowup');
    console.log(data);

    rows.value = data.listallFollowup.map(followup => {
      return {
        ...followup,
        assignment: followup.assignment.judymenthphoto,
        month: formatMonth(followup.month)
      }
    })

  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateStatus(status, row) {
  try {
    let data = await putData(`/followup/updatestatus/${row}/${status}`)
    bring()
  } catch (error) {
    console.log(error);
  }
}


</script>