<template>
  <div class="q-pa-md q-gutter-md">
    <ApprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData } from '../services/apiClient.js';
import ApprenticeTable from '../components/tables/BasicTable.vue'

let title = 'Asignación'
const rows = ref([])
const columns = ref([
  { name: 'register', label: 'Registro', align: 'center', field: 'register' },
  { name: 'followInstructor', label: 'Instructor Seguimiento', align: 'center', field: 'followInstructor' },
  { name: 'technicalInstructor', label: 'Instructor Técnico', align: 'center', field: 'technicalInstructor' },
  { name: 'proyectInstructor', label: 'Instructor Proyecto', align: 'center', field: 'proyectInstructor' },
  { name: 'certificationdoc', label: 'Certificado', align: 'center', field: 'certificationdoc' },
  { name: 'judymenthphoto', label: 'Foto Juicio', align: 'center', field: 'judymenthphoto' },
  // { name: 'observation', label: 'Observación', align: 'center', field: 'observation' }
])


onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/assignment/listallassignment');
    console.log(data);
    rows.value = data.assignments
  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/assignment/enableassignmentbyid/${rows}` : `/assignment/disableassignmentbyid/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);
  }

};
</script>