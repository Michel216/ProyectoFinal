<template>
  <!-- <div class="q-pa-md q-gutter-sm">
    <q-btn  class="btn-fixed-width" color="green-9" label="Crear" icon="add_circle_outline " />
  </div> -->
  <div>
    <q-table :title="title" :rows="rows" :columns="combinedColumns" :loading="localLoading">
      <!-- Slot para la celda de editar -->
      <!-- <template v-slot:body-cell-editar="scope">
        <q-td :props="scope" class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="toggleUpdate(scope.row._id)">📝</q-btn>
        </q-td>
      </template> -->
      <!-- Slot para la celda de activar/desactivar -->
      <template v-slot:body-cell-activar="scope">
        <q-td :props="scope" class="q-pa-md q-gutter-xs">
          <q-btn dense unelevated round @click="toggleUpdate(scope.row._id)" icon="edit_square" color="primary" />
          <q-btn dense unelevated round color="red" class="q-pa-none" style="height: 0px" v-if="scope.row.status === 1"
            @click="toggleActivate(scope.row._id, scope.row.status)"><i
              class="fas fa-times fa-2x text-white"></i></q-btn>
          <q-btn dense unelevated round color="primary" class="q-pa-none" style="height: 0px" v-else
            @click="toggleActivate(scope.row._id, scope.row.status)"><i
              class="fas fa-check fa-2x text-white"></i></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-status="scope">
        <q-td :props="scope">
          <span style="font-size: 110%; color: white; background-color: green; padding:8% 25%; border-radius:5px"
            v-if="scope.row.status === 1">Activo</span>
          <span style="font-size: 110%; color: white; background-color: red; padding:8% 25%; border-radius:5px" v-else>
            Inactivo</span>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  title: {
    type: String
  },
  rows: {
    type: Array,
  },
  columns: {
    type: Array,
  },
  onClickEdit: {
    type: Function
  },
  onToggleActivate: {
    type: Function
  },
  onUpdateStatus: {
    type: Function
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['update:loading']);
let localLoading = ref(props.loading);
console.log(localLoading.value);


// Sincronizar `loading` local con prop externa
watch(
  () => props.loading,
  (newVal) => {
    localLoading.value = newVal;
  }
);

function updateLoadingState(isLoading) {
  localLoading.value = isLoading;
  emits('update:loading', isLoading);
}

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
const combinedColumns = computed(() => [
  ...props.columns,
  { name: 'status', label: 'ESTADO', align: 'center', field: 'status' },
  // { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "OPCIONES", align: "center" }
]);

// // Manejador para la acción de activar/desactivar
async function toggleActivate(row, status) {
  props.loading
  try {
    props.onToggleActivate(row, status);
  } catch (error) {
    console.log(error);
  } finally {
    props.loading
  }
}
async function toggleUpdate(row) {
  props.loading
  try {
    props.onClickEdit(row);
  } catch (error) {
    console.log(error);
  } finally {
    props.loading
  }
}
</script>
<style scoped>
.q-pa-none {
  height: 10px !important;
  width: 10px !important;
}
</style>