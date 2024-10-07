<template>
    <div>
      <MyTable
        :title="Assignment"
        :rows="tableRows"
        :columns="tableColumns"
        :onClickEdit="handleEdit"
        :onToggleActivate="handleToggleActivate"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import MyTable from '../components/Table.vue'
  
  const tableRows = ref([
    { name: 'John', estado: 1 },
    { name: 'Jane', estado: 0 },
    { name: 'Sam', estado: 1 },
  ])
  
  const tableColumns = ref([
    { name: 'name', label: 'Nombre', align: 'center', field: 'name' },
    { name: 'estado', label: 'Estado', align: 'center', field: 'estado' }
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
  