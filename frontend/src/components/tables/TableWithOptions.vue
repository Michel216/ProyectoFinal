<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="combinedColumns">
      <!-- Slot para la celda de editar -->
      <template v-slot:body-cell-editar="scope">
        <q-td :props="scope" class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="onClickEdit(scope.row)">📝</q-btn>
        </q-td>
      </template>

      <!-- Slot para la celda de activar/desactivar -->
      <template v-slot:body-cell-activar="scope">
        <q-td :props="scope">
          <q-btn class="q-pa-sm" v-if="scope.row.status===1" @click="toggleActivate(scope.row._id)">❌</q-btn>
          <q-btn class="q-pa-sm" v-else @click="toggleActivate(scope.row._id)">✅</q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
  }
});

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
const combinedColumns = computed(() => [
  ...props.columns,
  { name: "editar", label: "Editar", align: "center" },
  { name: "activar", label: "Activar/Desactivar", align: "center" }
]);

// // Manejador para la acción de activar/desactivar
const toggleActivate = (row) => {
  props.onToggleActivate(row);
  
}
const toggleUpdate = (row) => {
  props.onClickEdit(row);
}
</script>