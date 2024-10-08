<template>
  <div class="q-pa-md">
    <TableTable :title="title" :columns="columns" :rows="rows" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from './../services/apiClient.js';
import TableTable from '../components/tables/TableWithOutOption.vue'


let title = "Bitácoras"
const rows = ref([])
let columns = ref([
  { name: 'number', align: "center", label: 'Número de bitácora', field: 'number', sortable: true },
  { name: 'document', align: "center", label: 'Documento', field: 'document' },
  { name: "status1", align: "center", label: "Estado", field: "status" },
]);

async function bring() {
  try {
    let data = await getData('/binnacles/listallbinnacles');
    rows.value = data.ListAllBinnacles;
    
  } catch (error) {
    console.log(error);
  }
}

// async function bring() {
//   try {
//     let data = await getData('/modality/listallmodality');
//     rows.value = data.listAllModalities;
//     console.log(rows.value);
    
//   } catch (error) {
//     console.log(error);
//   }
// }

// onBeforeMount(() => {
//   bring();
// })

// async function handleToggleActive(row){
//   console.log(row);
//   let data = await putData(`/binnacles/updatestatus/${row}/2`);
//   bring();
// }

// function handleEdit(row) {
//   console.log("Editar", row);
// }

onBeforeMount(() => {
  bring();
})
</script>
