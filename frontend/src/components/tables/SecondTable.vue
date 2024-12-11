<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="columns" :loading="localLoading">
      <template v-slot:body-cell-options="scope">
        <q-td :props="scope">
          <div class="q-pa-md" align="center" v-if="role === 'ADMIN'">
            <q-select
              outlined
              v-model="scope.row.status"
              style="width: 200px"
              :options="options"
              label="Estado"
              emit-value
              map-options
              @update:model-value="updateStatus($event, scope.row._id)"
              default="Ejecutada"
            /> 
          </div>
          <div v-if="role === 'INSTRUCTOR'">
            <strong v-if="scope.row.status === 1">Programado</strong>
            <strong v-if="scope.row.status === 2">Ejecutado</strong>
            <strong v-if="scope.row.status === 3">Pendiente</strong>
            <strong v-if="scope.row.status === 4">Verificado</strong>
            <strong v-if="scope.row.status === 5">Verificado técnico</strong>
            <strong v-if="scope.row.status === 6">Verificado proyecto</strong>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="scope">
        <q-td :props="scope">
          <q-btn
          :label="scope.row.status ? 'Activo' : 'Inactivo'"
          :color="scope.row.status ? 'green' : 'red'"
          :unelevated="true"
          @click="toggleState(scope.row)"
          />
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
            <q-btn
              round
              color="primary"
              icon="search"
              @click="handleClick(scope.row._id, true)"
            />
            <q-btn
              round
              color="primary"
              icon="add_circle_outline"
              @click="handleClick(scope.row._id, false)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-apprentice="props">
        <q-td :props="props" align="center">
          <Btn
            dense
            unelevated
            round
            color="primary"
            @click="toggleSeeApprentice(props.row)"
            label=" "
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="eye" />
            </template>
          </Btn>
        </q-td>
      </template>

      <template v-slot:body-cell-statusApprentice="scope">
        <q-td :props="scope">
          <q-btn
            :label="scope.row.status === 4 ? 'Certificado' : 'Por certificar'"
            :color="scope.row.status === 4 ? 'primary' : 'grey'"
            :unelevated="true"
            :text-color="scope.row.status === 4 ? 'white' : 'black'"
            class="status-btn"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-certificationDoc="scope">
        <q-td :props="scope">
          <a :href="scope.row.certificationDoc" target="_blank"
            ><i class="fas fa-folder-open"></i></a>
        </q-td>
      </template>
      <template v-slot:body-cell-judymentPhoto="scope">
        <q-td :props="scope">
          <a :href="scope.row.judymentPhoto" target="_blank"
            ><i class="fas fa-folder-open"></i></a>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import {
  faMagnifyingGlass,
  faEye,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import Btn from "./../buttons/Button.vue";
import { getData } from "./../../services/apiClient";
import { useAuthStore } from "../../store/useAuth";

const authStore = useAuthStore();
const role = computed(() => authStore.getRole());
library.add(faMagnifyingGlass, faEye, faFolder);
const router = useRouter();
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
  options: {
    type: Array,
  },
  onUpdateStatus: {
    type: Function,
  },
  val: {
    type: Boolean,
  },
  onClickFunction: {
    type: Function,
  },
  toggleSeeApprentice: {
    type: Function
  },
  loading: {
    type: Boolean,
    default: false
  }
});
function toggleState(row) {
  row.status = !row.status;
  console.log(`El estado del programa con ID ${row._id} es ahora ${row.status ? 'Activo' : 'Inactivo'}`);
  updateStatus(row.status, row._id);
}

let title = ref(props.title);

const emits = defineEmits(['update:loading']);
let localLoading = ref(props.loading);


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

function handleClick(row, change) {
  props.onClickFunction(row, change); // Emite el evento al componente padre
}
// const emit = defineEmits(['openModal']);

// // Función para abrir el modal con la observación seleccionada
// function openModalWithObservation(observation) {
//   emit('openModal', observation); // Emite el evento al componente padre
// }
// function openAddModal(row) {
//   emit('openModal'); // Emite el evento al componente padre
// }
</script>

<style scoped>
.status-btn {
  border-radius: 8px;
  /* Bordes redondeados */
  font-size: 12px;
}
</style>