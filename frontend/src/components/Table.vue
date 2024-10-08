<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="combinedColumns" row-key="name">
      <!-- Slot para la celda de editar -->
      <template v-slot:body-cell-editar="scope">
        <q-td :props="scope" class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="onClickEdit(scope.row)" flat icon="edit" round></q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="scope">
        <q-td :props="scope" v-if="scope.row.estado === 1" class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="toggleActivate(scope.row)" flat dense icon="cancel" color="red" round></q-btn>
        </q-td>
        <q-td :props="scope" v-else class="q-pa-sm">
          <q-btn class="q-pa-sm" @click="toggleActivate(scope.row)" flat dense icon="check_circle" color="green"
            round></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-estado="scope">
        <q-td :props="scope" v-if="scope.row.estado == 1">
          <q-chip square outline color="green">Activo</q-chip>
        </q-td>
        <q-td :props="scope"  v-else>
          <q-chip square outline color="red">Inactivo</q-chip>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
    type: Function,
    required: true
  },
  onToggleActivate: {
    type: Function,
    required: true
  }
})

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
const combinedColumns = computed(() => [
  ...props.columns,
  { name: "editar", label: "Editar", align: "center" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" }
])

// Manejador para la acción de activar/desactivar
const toggleActivate = (row) => {
  props.onToggleActivate(row)
}
</script>