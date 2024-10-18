<template>
  <div class="q-pa-md">
    <apprenticeTable 
    :title="title" 
    :rows="rows" 
    :columns="columns" 
    :onToggleActivate="handleToggleActivate" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData } from '../services/apiClient.js';
import apprenticeTable from "../components/tables/Table.vue";

let title = 'Aprendices'
const rows = ref([]);
const columns = ref([
  { name: "tpdocument", label: "Tipo de Documento", align: "center", field: "tpdocument" },
  { name: "numDocument", label: "Número de Documento", align: "center", field: "numDocument" },
  { name: "firstName", label: "Nombre", align: "center", field: "firstName" },
  { name: "lastName", label: "Apellido", align: "center", field: "lastName" },
  { name: "phone", label: "Télefono", align: "center", field: "phone" },
  { name: "email", label: "Correo", align: "center", field: "email" },
  { name: "fiche", label: "Ficha", align: "center", field: "fiche" },
  { name: "status", label: "Estado", align: "center", field: "status" },
  { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "Activar/Desactivar", align: "center" }
]);

onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/apprentice/listallapprentice');
    

    rows.value = data.listApprentice

  } catch (error) {
    console.log(error);
  }
}

// function handleEdit(rows) {
//   console.log("Editando fila:", rows);
//   // Lógica para editar la fila
// };

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/apprentice/enableapprentice/${rows}` : `/apprentice/disableapprentice/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);

  }

};
</script>