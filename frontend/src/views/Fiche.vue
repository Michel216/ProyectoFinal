<template>
    <div class="q-pa-md q-gutter-md">
        <router-link
      to="/home"
      class="iconExit"
      style="display: flex; text-decoration: none"
    >
      <q-btn
        dense
        unelevated
        round
        color="primary"
        icon="arrow_back"
        text-color="white"
      />
    </router-link>
      <h3 class="title-table">Fichas</h3>
      <hr id="hr" class="bg-green-9" />
      
      <fichesTable
        :title="title"
        :columns="columns"
        :rows="rows"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from "vue";
  import { getData } from "../services/apiClient.js";
  import fichesTable from "../components/tables/SecondTable.vue";

  
  let title = "fichas";
  let btnLabel = "Crear";
  const rows = ref([]);
  const columns = [
  { name: "name", align: "center", label: "Nombre ficha", field: "name", sortable: true },
  { name: "codeFicha", align: "center", label: "Cod/Ficha", field: "codeFicha" },
  { name: 'status', label: 'ESTADO', align: 'center', field: 'status' },
  { name: "viewStudents", align: "center", label: "Ver aprendices", field: "viewStudents" },
];

  onBeforeMount(() => {
    bring();
  });
  
  async function bring() {
  
  }
  
  function openModal() {

  }
  </script>
  
  <style scoped>
  .bg-green-9 {
    color: green;
    width: 99%;
    height: 3.5px;
    border-radius: 10px;
    align-items: center;
  }
  
  .title-table {
    text-align: center;
    margin-bottom: 0;
    font-size: 45px;
  }
  h3 {
  text-align: center;
  margin-bottom: 0;
  font-weight: bold;
}
  </style>
  
  