<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Fichas" />
    <div class="q-gutter-md row q-select-container">
      <q-select filled v-model="model" use-input input-debounce="0" label="Ingrese el nombre o número de la ficha"
        :options="options" @filter="filterFn" style="width: 370px" behavior="menu" clearable>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="table-container">
      <ficheTable :title="title" :columns="columns" :rows="rowsForTable" :options="options"
        :toggleSeeApprentice="handleViewApprentices" />
    </div>
  </div>
</template>

<style scoped>
.q-select-container {
  display: flex;
  justify-content: flex-end;
  /* Alinea el contenido hacia la derecha */
}
</style>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/header/Header.vue';
import ficheTable from '../components/tables/SecondTable.vue';
import { getDataRepfora } from '../services/apiRepfora.js';

const router = useRouter();
const model = ref(null);
const rows = ref([]);
const rowsForTable = ref([]);
const stringOptions = ['Option 1', 'Option 2', 'Option 3'];
const options = ref([...stringOptions]);

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = [...stringOptions];
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

const columns = [
  { name: "index", label: "N°", align: "center", field: 'index' },
  { name: "name", label: "NOMBRE DEL PROGRAMA", align: "center", field: "name" },
  { name: "code", label: "CÓDIGO DEL PROGRAMA", align: "center", field: "code", sortable: true },
  { name: "status", label: "ESTADO", align: "center", field: "stateButton" },
  { name: "apprentice", label: "VER APRENDICES", align: "center", field: "apprentice" },
];

onBeforeMount(async () => {
  try {
    const response = await getDataRepfora("/fiches");
    rows.value = response.data;
    rowsForTable.value = response.data.map((item, idx) => ({
      ...item.program,
      ficheId: item._id,
      index: idx + 1,
      status: item.status === undefined ? true : item.status // Valor predeterminado: "Activo"
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

