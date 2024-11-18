<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="columns">
      <template v-slot:body-cell-options="scope">
        <q-td :props="scope">
          <div class="q-pa-md" align="center">
            <q-select outlined v-model="scope.row.status" style="width: 200px;" :options="options" label="Estado"
              emit-value map-options @update:model-value="updateStatus($event, scope.row._id)" default="Ejecutada" />
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
            <q-btn round color="primary" icon="search" @click="handleClick(scope.row._id, true)" />
            <q-btn round color="primary" icon="add_circle_outline" @click="handleClick(scope.row._id, false)" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-apprentice="props">
        <q-td :props="props" align="center">
          <Btn dense unelevated round color="primary" @click="toggleSeeApprentice(props.row)" label=" ">
            <template v-slot:prepend>
              <font-awesome-icon icon="eye" />
            </template>
          </Btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons';
import Btn from "./../buttons/Button.vue";
import { getData } from './../../services/apiClient'

library.add(faMagnifyingGlass, faEye);
const router = useRouter();
let loading = ref(false)
const props = defineProps({
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
  },
  onClickFunction: {
    type: Function
  },
  toggleSeeApprentice: {
    type: Function,
    required: true,
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

// function handleClick(row, change) {
//   props.onClickFunction(row, change) // Emite el evento al componente padre
// }
// const emit = defineEmits(['openModal']);

// // Función para abrir el modal con la observación seleccionada
// function openModalWithObservation(observation) {
//   emit('openModal', observation); // Emite el evento al componente padre
// }
// function openAddModal(row) {
//   emit('openModal'); // Emite el evento al componente padre
// }
</script>