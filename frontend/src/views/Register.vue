<template>
  <div class="q-pa-md q-gutter-md">
    <RegisterTable :title="title" :columns="columns" :rows="rows" :onToggleActivate="handleToggleActivate" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData } from '../services/apiClient.js';
import RegisterTable from "../components/tables/BasicTable.vue";
import { formatDate } from '../utils/formatDate.js';

let title = 'Registros'
const rows = ref([])
const columns = ref([
  { name: 'apprentice', label: 'Aprendiz', align: 'center', field: 'apprentice' },
  { name: 'modality', label: 'Modalidad', align: 'center', field: 'modality' },
  { name: 'startDate', label: 'Fecha de Inicio', align: 'center', field: 'startDate' },
  { name: 'endDate', label: 'Fecha de Fin', align: 'center', field: 'endDate' },
  { name: 'company', label: 'Empresa', align: 'center', field: 'company' },
  { name: 'phonecompany', label: 'Teléfono de Empresa', align: 'center', field: 'phonecompany' },
  { name: 'addresscompany', label: 'Dirección de Empresa', align: 'center', field: 'addresscompany' },
  { name: 'owner', label: 'Propietario', align: 'center', field: 'owner' },
  { name: 'docAlternative', label: 'Documento Alternativo', align: 'center', field: 'docAlternative' },
  { name: 'hour', label: 'Hora', align: 'center', field: 'hour' }
])

onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/register/listallregister');
    console.log(data);
    

    rows.value = data.register.map(register => {
      return {
        ...register,
        assignment: register.apprentice.firstName,
        startDate: formatDate(register.startDate),
        endDate: formatDate(register.endDate),
      }
    })

  } catch (error) {
    console.log(error);
  }
}


// const handleEdit = (row) => {
//   console.log('Editando fila:', row)
//   // Lógica para editar la fila
// }

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/register/enableregister/${rows}` : `/register/disableregister/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);

  }

};
</script>