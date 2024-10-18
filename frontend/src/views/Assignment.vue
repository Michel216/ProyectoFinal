<template>
  <div class="q-pa-md q-gutter-md">
    <!-- <Btn :label="btnLabel" :onClickFunction='ClickFunctionLogin' /> -->
    <ApprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate" />
    <!-- <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel" /> -->
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData } from '../services/apiClient.js';
import ApprenticeTable from '../components/tables/Table.vue'
// import Btn from "../components/buttons/Button.vue";
// import Modal from "../components/modals/Modal.vue";

let title = 'Asignación'
// let btnLabel = 'Crear asignación'
// const showModal = ref(false);
const rows = ref([])
const columns = ref([
  { name: 'register', label: 'Registro', align: 'center', field: 'register' },
  { name: 'followInstructor', label: 'Instructor Seguimiento', align: 'center', field: 'followInstructor' },
  { name: 'technicalInstructor', label: 'Instructor Técnico', align: 'center', field: 'technicalInstructor' },
  { name: 'proyectInstructor', label: 'Instructor Proyecto', align: 'center', field: 'proyectInstructor' },
  { name: 'certificationdoc', label: 'Certificado', align: 'center', field: 'certificationdoc' },
  { name: 'judymenthphoto', label: 'Foto Juicio', align: 'center', field: 'judymenthphoto' },
  // { name: 'observation', label: 'Observación', align: 'center', field: 'observation' },
  { name: 'status', label: 'Estado Numérico', align: 'center', field: 'status' },
  { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "Activar/Desactivar", align: "center" }
])


onBeforeMount(() => {
  bring();
})

// function handleAction() {
//   showModal.value = false;
// }

// function updateInputAmount(newAmount) {
//   inputAmount.value = newAmount;
// }

async function bring() {
  try {
    let data = await getData('/assignment/listallassignment');
    console.log(data);
    rows.value = data
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

// function ClickFunctionLogin() {
//   showModal.value = true; // Abre el modal
// }
</script>