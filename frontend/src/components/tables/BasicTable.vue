<template>
  <!-- <div class="q-pa-md q-gutter-sm">
    <q-btn  class="btn-fixed-width" color="green-9" label="Crear" icon="add_circle_outline " />
  </div> -->
  <div>
    <q-table :title="title" :rows="rows" :columns="combinedColumns" :loading="loading">
      <!-- Slot para la celda de editar -->
      <!-- <template v-slot:body-cell-editar="scope">
        <q-td :props="scope" class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="toggleUpdate(scope.row._id)">📝</q-btn>
        </q-td>
      </template> -->
      <!-- Slot para la celda de activar/desactivar -->
      <template v-slot:body-cell-activar="scope">
        <q-td :props="scope">
          <q-btn dense unelevated round color="red" class="q-pa-none"  style="height: 0px" v-if="scope.row.status === 1"
            @click="toggleActivate(scope.row._id, scope.row.status)"><i class="fas fa-times fa-2x text-white"></i></q-btn>
          <q-btn dense unelevated round color="primary" class="q-pa-none"  style="height: 0px" v-else @click="toggleActivate(scope.row._id, scope.row.status)"><i class="fas fa-check fa-2x text-white"></i></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-status="scope">
        <q-td :props="scope">
          <h7 style="font-size: 110%; color: white; background-color: green; padding:8% 25%; border-radius:5px" v-if="scope.row.status === 1">Activo</h7>
          <h7 style="font-size: 110%; color: white; background-color: red; padding:8% 15%; border-radius:5px" v-else>Inactivo</h7>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

let loading = ref(false)
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'My Table'
  },
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  onClickEdit: {
    type: Function
  },
  onToggleActivate: {
    type: Function
  },
  options: {
    type: Array
  },
  onUpdateStatus: {
    type: Function
  },
  loading: {
    type: Boolean
  }
});

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
const combinedColumns = computed(() => [
  ...props.columns,
  { name: 'status', label: 'ESTADO', align: 'center', field: 'status' },
  // { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "Activar/Desactivar", align: "center" }
]);

// // Manejador para la acción de activar/desactivar
const toggleActivate = (row, status) => {
  props.onToggleActivate(row, status);
}
const toggleUpdate = (row) => {
  props.onClickEdit(row);
}
</script>
<style scoped>
.q-pa-none{
  height: 10px !important; width: 10px !important;
}
 </style>