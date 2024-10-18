<template>
  <div class="q-pa-md">
    <modalityTable :title="title" :columns="columns" :rows="rows" :onToggleActivate="handleToggleActivate"/>
    
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from '../services/apiClient.js'
import modalityTable from '../components/tables/Table.vue'


let title = "Modalidades"
const rows = ref([])
const columns = [
  { name: 'name', align: "center", label: 'Nombre', field: 'name', sortable: true },
  { name: 'hourInstructorFollow', align: "center", label: 'Horas del instructor de seguimineto', field: 'hourInstructorFollow' },
  { name: 'hourInstructorTechnical', align: "center", label: 'Horas del instructor técnico', field: 'hourInstructorTechnical' },
  { name: 'hourInstructorProject', align: "center", label: 'Horas del instructor de proyecto', field: 'hourInstructorProject' },
  { name: "status", label: "Estado", align: "center", field: "status" },
  { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "Activar/Desactivar", align: "center" }
]

onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/modality/listallmodality');
    console.log(data);
    rows.value = data.listAllModalities;
    
  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/modality/enablemodalitybyid/${rows}` : `/modality/disablemodalitybyid/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);

  }

};


</script>