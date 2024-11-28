<template>
    <div class="q-pa-md q-gutter-md">
      
      <Header title="Historial Programas Académicos Cursados" />
    
      <!-- Tabla -->
      <div class="table-container">
        <historyTable :title="title" :columns="columns" :rows="rows" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .table-container {
    margin-top: 20px;
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  import Header from '../components/header/Header.vue';
  import historyTable from '../components/tables/SecondTable.vue'; 
  
  const title = "Historial Programas Académicos Cursados"; 
  
  const columns = [
    { name: "index", label: "N°", align: "center", field: "index" },
    { name: "name", label: "NOMBRE DEL APRENDIZ", align: "center", field: "name" },
    { name: "program", label: "FICHA", align: "center", field: "program" },
    { name: "code", label: "CÓDIGO ", align: "center", field: "code", sortable: true },
    { name: "status", label: "ESTADO", align: "center", field: "status" },
  ];
  
  const rows = ref([]);
  </script>
  