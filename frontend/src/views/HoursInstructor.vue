<template>
    <div class="q-pa-md q-gutter-md">
      <Header title="Proyección Horas Instructor EP" />
      <div
      style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-end; margin: -30px 0px">
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div class="text-primary" style="margin-bottom: -30px;">Realizar filtro por</div>

        <!-- Contenedor de los radio buttons y el input, alineados en una fila -->
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; width: 100%;">
          <!-- Radio buttons -->
          <div style="display: flex; flex-direction: row; align-items: flex-start; margin-right: 10px;">
            <q-radio v-model="selectedValue" val="year" label="Año" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="month" label="Mes" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="instructor" label="Instructor" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
          </div>

          <!-- Input de búsqueda alineado a la izquierda -->
          <div class="q-pa-md" style="flex-grow: 1; display: flex; justify-content: flex-start;">
            <div class="rounded-input" style=" width: 370px;">
              <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" @input="handleFilter" outlined
                :disable="!selectedValue" />
            </div>
          </div>

        </div>
      </div>
    </div>
  
      <ficheTable
        :title="title"
        :columns="columns"
        :rows="rowsForTable"
        :options="options"
        :toggleSeeApprentice="handleViewApprentices"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import Header from '../components/header/Header.vue';
  import ficheTable from '../components/tables/SecondTable.vue';
  import { getDataRepfora } from '../services/apiRepfora.js';
  
  const router = useRouter();
  const rows = ref([]);
  const rowsForTable = ref([]);
  const selectedValue = ref('');
  const text = ref(''); // Para el input de búsqueda
  
  const columns = [
    { name: "index", label: "N°", align: "center", field: 'index' },
    { name: "name", label: "NOMBRE INSTRUCTOR", align: "center", field: "name" },
    { name: "hour", label: "HORAS EJECUTADAS", align: "center", field: "hour", sortable: true },
    { name: "hourP", label: "HORAS PENDIENTES", align: "center", field: "hourP", sortable: true },
    { name: "hourProgram", label: "HORAS PROGRAMADAS", align: "center", field: "hourProgram", sortable: true },
    { name: "year", label: "AÑO", align: "center", field: "year" },
    { name: "month", label: "MES", align: "center", field: "month", sortable: true },
  ];
  
  onBeforeMount(async () => {
    try {
      const response = await getDataRepfora("/fiches");
      rows.value = response.data;
      rowsForTable.value = response.data.map((item, idx) => ({
        ...item.program,
        ficheId: item._id,
        index: idx + 1,
      }));
    } catch (error) {
      console.error("Error al traer los datos:", error);
    }
  });
  
  function handleViewApprentices(row) {
    if (row?.ficheId) {
      router.push({
        path: './Apprentice/:ficheId?',
        query: { ficheId: row.ficheId }
      });
      console.log('Navigating to ficheId:', row.ficheId);
    } else {
      console.error('ID de la ficha no encontrado en la fila.');
    }
  }
  </script>
  
  <style scoped>
  /* Estilo adicional si es necesario */
  </style>
  