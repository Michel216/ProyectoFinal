<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="columns">
      <template v-slot:body-cell-options="scope">
        <q-td :props="scope">
          <div class="q-pa-md" align="center">
            <q-select outlined v-model="scope.row.status" style="width: 200px;" :options="options" label="Estado"
              emit-value map-options @update:model-value="updateStatus($event, scope.row._id)" default="Ejecutada"/>
          </div>
          <!-- <div>
            <strong v-if="scope.row.status === 1">Programado</strong>
            <strong v-if="scope.row.status === 2">Ejecutado</strong>
            <strong v-if="scope.row.status === 3">Pendiente</strong>
            <strong v-if="scope.row.status === 4">Verificado</strong>
          </div> -->
        </q-td>
      </template>
      <!--valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4 -->
      <template v-slot:body-cell-validateHours="scope">
        <q-td :props="scope">
          <div class="q-pa-md">
            <q-checkbox />
          </div>

        </q-td>
      </template>
      <template v-slot:body-cell-observations="scope">
  <q-td :props="scope">
    <div class="q-pa-md q-gutter-xs">
      <!-- Botón para ver observaciones -->
      <q-btn 
        round 
        color="primary" 
        icon="search" 
        @click="openModalWithObservation(scope.row.observations)" 
      />
      <!-- Botón para agregar observación -->
      <q-btn 
        round 
        color="primary" 
        icon="add_circle_outline" 
        @click="openAddModal(scope.row)" 
      />
    </div>
  </q-td>
</template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass);
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
    type: Array,
    required: true
  },
  onUpdateStatus: {
    type: Function,
    required: true
  },
  val: {
    type: String
  }
});

// Combinar las columnas pasadas con las columnas de acciones "editar" y "activar"
// const combinedColumns = computed(() => [
//   ...props.columns,
//   { name: "options", label: "Estado", align: "center", field: "status" }
// ]);

// const combinedColumns = computed(() => {
//   const columns = [...props.columns];
//   const optionsColumn = { name: "options", label: "Estado", align: "center", field: "status" };
//   columns.splice(4, 0, optionsColumn); // Inserta en la posición 1
//   return columns;
// });

// Manejador para la acción de activar/desactivar
function updateStatus(status, row) {
  props.onUpdateStatus(status, row);
}

const emit = defineEmits(['openModal']);

// Función para abrir el modal con la observación seleccionada
function openModalWithObservation(observation) {
  emit('openModal', observation); // Emite el evento al componente padre
}
function openAddModal(row) {
  emit('openModal'); // Emite el evento al componente padre
}
</script>