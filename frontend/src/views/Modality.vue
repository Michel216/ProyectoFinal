<template>
  <div class="q-pa-md">
    <TreatsTable :title="title" :columns="columns" :rows="rows" />
    
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from './../services/apiClient.js';
import TreatsTable from '../components/tables/TableWithOptions.vue'


let title = "Modalidades"
const columns = [
  { name: 'name', align: "center", label: 'Nombre', field: 'name', sortable: true },
  { name: 'hourInstructorFollow', align: "center", label: 'Horas del instructor de seguimineto', field: 'hourInstructorFollow' },
  { name: 'hourInstructorTechnical', align: "center", label: 'Horas del instructor técnico', field: 'hourInstructorTechnical' },
  { name: 'hourInstructorProject', align: "center", label: 'Horas del instructor de proyecto', field: 'hourInstructorProject' },
]

const rows = ref([])

async function bring() {
  try {
    let data = await getData('/modality/listallmodality');
    rows.value = data.listAllModalities;
    console.log(rows.value);
    
  } catch (error) {
    console.log(error);
  }
}

onBeforeMount(() => {
  bring();
})



</script>