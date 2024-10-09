<template>
    <div>
      <MyTable
        :title='Register'
        :rows="tableRows"
        :columns="tableColumns"
        :onClickEdit="handleEdit"
        :onToggleActivate="handleToggleActivate"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import MyTable from '../components/tables/TableWithOptions.vue'
  
  const tableRows = ref([
  ])

//   async function bring(){
// let res = await 
//   }
  
  const tableColumns = ref([
  { name: 'startDate', label: 'Fecha de Inicio', align: 'center', field: 'startDate' },
  { name: 'endDate', label: 'Fecha de Fin', align: 'center', field: 'endDate' },
  { name: 'company', label: 'Empresa', align: 'center', field: 'company' },
  { name: 'phonecompany', label: 'Teléfono de Empresa', align: 'center', field: 'phonecompany' },
  { name: 'addresscompany', label: 'Dirección de Empresa', align: 'center', field: 'addresscompany' },
  { name: 'owner', label: 'Propietario', align: 'center', field: 'owner' },
  { name: 'docAlternative', label: 'Documento Alternativo', align: 'center', field: 'docAlternative' },
  { name: 'hour', label: 'Hora', align: 'center', field: 'hour' }
  ])
  
  const handleEdit = (row) => {
    console.log('Editando fila:', row)
    // Lógica para editar la fila
  }
  
  const handleToggleActivate = (row) => {
    row.estado = row.estado === 1 ? 0 : 1
    console.log('Estado cambiado:', row)
  }
  </script>
  