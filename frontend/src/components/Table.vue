<template>
    <div>
      <q-table :title="title" :rows="rows" :columns="combinedColumns" row-key="name">
        <!-- Slot para la celda de editar -->
        <template v-slot:body-cell-editar="scope">
          <q-td :props="scope" class="q-pa-sm">
            <q-btn class="q-pa-sm" @click="onClickEdit(scope.row)">📝</q-btn>
          </q-td>
        </template>
  
        <!-- Slot para la celda de activar/desactivar -->
        <template v-slot:body-cell-activar="scope">
          <q-td :props="scope" v-if="scope.row.estado === 1" class="q-pa-sm">
            <q-btn class="q-pa-sm" @click="toggleActivate(scope.row)">❌</q-btn>
          </q-td>
          <q-td :props="scope" v-else class="q-pa-sm">
            <q-btn class="q-pa-sm" @click="toggleActivate(scope.row)">✅</q-btn>
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
    { name: "activar", label: "Activar/Desactivar", align: "center", field: "estado" }
  ])
  
  // Manejador para la acción de activar/desactivar
  const toggleActivate = (row) => {
    props.onToggleActivate(row)
  }
  </script>
  