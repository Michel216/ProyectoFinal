<template>
  <div class="q-pa-md q-gutter-md">
    <h3 class="title-table">Bitacoras</h3>
    <hr id="hr" class="bg-green-9" />

    <Btn :label="btnLabel" :onClickFunction="openModal" :loading="loading"    />
    <binnacleTable
      :title="title"
      :columns="columns"
      :rows="rows"
      :options="options"
      :onUpdateStatus="handleUpdateStatus"
      :loading="loading"
    />
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      :label="btnLabel"
    >
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select
            outlined
            v-model="assignment"
            label="Asignación"
            :options="optionsAssignment"
            emit-value
            map-options
            clearable
            use-input
            input-debounce="0"
            behavior="menu"
            @filter="filterAssignment"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, dígite la asignación',
            ]"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-select
            outlined
            v-model="instructor"
            label="Instructor"
            :options="optionsInstructor"
            emit-value
            map-options
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, dígite el instructor',
            ]"
          />
          <q-input
            outlined
            type="number"
            v-model="num"
            label="Número de la bitácora"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el número de la bitácora',
            ]"
          />
          <q-input
            outlined
            v-model="document"
            label="Documento"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, ingrese un documento',
            ]"
          />
          <q-input
            outlined
            v-model="observation"
            label="Observación"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, dígite una observación',
            ]"
          />
          <q-input
            outlined
            v-model="observationDate"
            label="Fecha de la observación"
            mask="date"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite la fecha de la observación',
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="observationDate" today-btn>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div>
            <q-btn
              label="guardar"
              type="submit"
              color="primary"
              :loading="loading"
            />
            <q-btn
              label="cerrar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData, postData } from "../services/apiClient.js";
import binnacleTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";

let loading = ref(false);
let title = "Bitácoras";
let btnLabel = "Crear ";
let assignment = ref("");
let instructor = ref("");
let num = ref("");
let document = ref("");
let observation = ref("");
let observationDate = ref("");
const showModal = ref(false);
let optionsAssignment = ref();
let optionsInstructor = ref(["6704a1cb514834375739c7a0"]);
const rows = ref([]);
let columns = ref([
  {
    name: "assignment",
    label: "Asignación",
    align: "center",
    field: "assignment",
  },
  {
    name: "instructor",
    label: "Instructor",
    align: "center",
    field: "instructor",
  },
  {
    name: "number",
    align: "center",
    label: "Número de bitácora",
    field: "number",
    sortable: true,
  },
  { name: "document", align: "center", label: "Documento", field: "document" },
]);

// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4
let options = ref([
  {
    label: "Programado",
    value: 1,
  },
  {
    label: "Ejecutado",
    value: 2,
  },
  {
    label: "Pendiente",
    value: 3,
  },
  {
    label: "Verificado",
    value: 4,
  },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData("/binnacles/listallbinnacles");
    console.log(data);
    rows.value = data.ListAllBinnacles;
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateStatus(status, row) {
  try {
    let data = await putData(`/binnacles/updatestatus/${row}/${status}`);
    bring();
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true;
  try {
    let data = {
      assignment: assignment.value,
      instructor: instructor.value,
      number: num.value,
      document: document.value,
      observations: [
        {
          observation: observation.value,
          user: "66eb7269c249bb3aaed686e1",
          observationDate: observationDate.value,
        },
      ],
    };
    let url = await postData(`/binnacles/addbinnacles`, data);
    notifySuccessRequest("Bitácora creada exitosamente");
    showModal.value = false;
    bring();
    onReset();
  } catch (error) {
    console.log(error);
    notifyErrorRequest(
      error?.response?.data?.errors?.[0]?.msg || "Error desconocido"
    );
  } finally {
    loading.value = false;
  }
}

function onReset() {
  assignment.value = "";
  instructor.value = "";
  num.value = "";
  document.value = "";
  observation.value = "";
  observationDate.value = "";
}

function openModal() {
  showModal.value = true;
}

async function filterAssignment(val, update) {
  let assignment = await getData("/assignment/listallassignment");
  console.log(assignment);

  let theAssignment = assignment.assignments;
  if (val === "") {
    update(() => {
      optionsAssignment.value = theAssignment.map((assignment) => ({
        label: assignment.judymenthphoto,
        value: assignment._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsAssignment.value = theAssignment
      .map((assignment) => ({
        label: assignment.judymenthphoto,
        value: assignment._id,
      }))
      .filter((option) => option.label.toLowerCase().includes(needle));
  });
}
</script>

<style scoped>
.bg-green-9 {
  color: green;
  width: 99%;
  height: 3.5px;
  border-radius: 10px;

  align-items: center;
}
.title-table {
  text-align: center;
  margin-bottom: 0;
}

</style>