<template>
    <div class="q-pa-md q-gutter-md">
      <Header title="Certificaciones"></Header>
    
      <ficheTable :title="title" :columns="columns" :rows="rowsForTable" :options="options" :toggleSeeApprentice="handleViewApprentices">
      </ficheTable>
  
    </div>
  </template>

<script setup>
import ficheTable from '../components/tables/SecondTable.vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getDataRepfora } from '../services/apiRepfora.js';
import Header from '../components/header/Header.vue';

const router = useRouter();
const rows = ref([]); // Almacena la respuesta completa
const rowsForTable = ref([]); // Solo los datos de `program` para mostrar en la tabla
const columns = ref([
{
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  { name: "name", label: "NOMBRE DEL APRENDIZ", align: "center", field: "name" },
  { name: "status", label: "ESTADO", align: "center", field: "status" },
  { name: "document", label: "DOCUMENTO DE CERTIFICACION", align: "center", field: "code", sortable: true },
  { name: "apprentice", label: "DOCUMENTO DE JUICIO", align: "center", field: "apprentice" },
]);


</script>