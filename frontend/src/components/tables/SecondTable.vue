<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="combinedColumns">
      <template v-slot:body-cell-options="scope">
        <q-td :props="scope">
          <div class="q-pa-md" align="center">
            <q-select outlined v-model="scope.row.status" style="width: 200px;" :options="options" label="Estado" emit-value map-options @update:model-value="updateStatus($event, scope.row._id)"/>
          </div>
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
  options: {
    type: Array
  },
  onUpdateStatus: {
    type: Function
  }
});

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
const combinedColumns = computed(() => [
  ...props.columns,
  // { name: "options", label: "Editar", align: "center", field: "status" }
]);

// Manejador para la acción de activar/desactivar
function updateStatus(status, row){
  props.onUpdateStatus(status,row);
}
</script>