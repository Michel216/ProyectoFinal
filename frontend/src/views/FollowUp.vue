<template>
  <div class="q-pa-md q-gutter-md">
    <!-- Encabezado -->
    <Header title="Seguimientos" />
    <!-- Filtro -->
    <div style="
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end;
        margin: -20px 0;
        margin-top: -60px;
      ">
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start">
        <!-- Contenedor de los radio buttons y el input, alineados en una fila -->
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
          ">
          <!-- Input de búsqueda alineado a la izquierda -->
          <div class="q-pa-md" style="flex-grow: 1; display: flex; justify-content: flex-start">
            <div class="rounded-input" style="width: 370px">
              <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" outlined />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón crear -->
    <Btn :icon="icons" :label="btnLabel" :onClickFunction="openModalCreate" :loading="loading"
      v-if="role === 'INSTRUCTOR'" />
    <!-- Tabla -->
    <FollowupTable :title="title" :columns="columns" :rows="filteredRows" :options="options"
      :onUpdateStatus="handleUpdateStatus" :onClickFunction="openModalObservations"
      @update:loading="(val) => (loading = val)" :loading="loading" />
    <!-- Modal "crear seguimiento" -->
    <Modal :onClickFunction="onReset" :isVisible="showModalCreate" @update:isVisible="showModalCreate = $event"
      :label="'DILIGENCIA LA INFORMACION'">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select outlined v-model="assignment" label="Seleccione una asignación" :options="optionsAssignment"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterAssignment"
            lazy-rules :rules="[
              (val) =>
                (val.trim() && val.length > 0) ||
                'Por favor, seleccione una asignación',
            ]">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-hand-pointer" />
            </template>
          </q-select>

          <q-input outlined v-model="month" label="Fecha inicial" mask="date" :rules="[
            (val) =>
              (val.trim() && val.length > 0) || 'Por favor, dígite la fecha inicio',
          ]">
            <template v-slot:prepend>
              <font-awesome-icon icon="calendar-day" class="cursor-pointer" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="month" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>

          <q-input outlined type="number" v-model="numFollowUp" label="N° seguimiento" lazy-rules :rules="[
            (val) =>
              (val.trim() && val.length > 0) ||
              'Por favor, dígite el número de la bitácora',
          ]">
            <template v-slot:prepend>
              <q-icon name="123" />
            </template>
          </q-input>

          <q-input outlined v-model="document" label="Documento" lazy-rules :rules="[
            (val) =>
              (val.trim() && val.length > 0) || 'Por favor, ingrese un documento',
          ]">
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <div align="center">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />
            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
    <!-- Modal "observaciones" -->
    <Modal :onClickFunction="onReset" :isVisible="showModalObservations"
      @update:isVisible="showModalObservations = $event" :label="'OBSERVACIONES'">
      <div class="q-pa-md" style="max-width: 600px">
        <!-- Crear observación -->
        <q-form v-if="!change" @submit="onSubmitObservation" @reset="onReset" class="q-gutter-md">
          <q-input outlined type="textarea" v-model="observation" label="Observación" lazy-rules :rules="[
            (val) =>
              (val.trim() && val.length > 0) || 'Por favor, ingrese una observación',
          ]" />

          <div align="center">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />

            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm" v-close-popup />
          </div>

        </q-form>
        <!-- Observaciones -->
        <q-form v-else @submit="onSubmitObservation" @reset="onReset" class="q-gutter-md">
          <div v-for="(item, index) in listObservations" :key="index" :loading="loadingObs">
            <div v-if="listObservations.length > 0" :loading="loadingObs">
              <q-chat-message v-if="item.user === user" sent style="margin-left: 50px;">
                <p style="padding: 5px">
                  <span class="text-h7 text-primary"><strong> {{ item.user }}</strong></span>
                  <br />
                  <span class="text-dark">{{ item.observation }}</span>
                  <br /><br />
                  <span class="text-h7 text-primary" style="float: right"><strong>
                      {{ formatDate(item.observationDate) }}</strong></span>
                </p>
              </q-chat-message>
              <q-chat-message v-else bg-color="green-3" style="margin-right: 50px;">
                <p style="padding: 5px">
                  <span class="text-h7 text-dark"><strong> {{ item.user }}</strong></span>
                  <br />
                  <span class="text-dark">{{ item.observation }}</span>
                  <br /><br />
                  <span class="text-h7 text-dark" style="float: right"><strong>
                      {{ formatDate(item.observationDate) }}</strong></span>
                </p>
              </q-chat-message>
            </div>
          </div>
          <div v-if="listObservations.length <= 0" :loading="loadingObs">
            <q-card bordered class="bg-grey-4 my-card">
              <q-card-section align="center" class="text-h5 text-bold text-grey-8">
                No hay observaciones
              </q-card-section>
            </q-card>
          </div>

          <br />
          <div align="center">
            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getData, putData, postData } from "../services/apiClient.js";
import FollowupTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest } from "../composables/Notify";
import { formatMonth } from "../utils/formatMonth.js";
import moment from "moment-timezone";
import { formatDate } from "../utils/formatDate.js";
import { useAuthStore } from "./../store/useAuth.js";
import Header from "../components/header/Header.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendarDay, faChalkboardUser, faHandPointer } from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarDay, faChalkboardUser, faHandPointer);

const title = "Seguimientos";
const authStore = useAuthStore();
const role = computed(() => authStore.getRole());
const user = computed(() => authStore.getEmail());
const icons = "control_point";
const btnLabel = "Crear";
const instructor = ref("67105c23bad722df0d908a25");
let loading = ref(false);
let change = ref();
let assignment = ref("");
let numFollowUp = ref("");
let loadingObs = ref(false)
let document = ref("");
let month = ref("");
let observation = ref("");
let rows = ref([]);
let observationDate = moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
let showModalCreate = ref(false);
let showModalObservations = ref(false);
let listObservations = ref([]);
let idFollowUp = ref("");
let optionsAssignment = ref();
let searchTerm = ref("");
let searchLabel = ref("Ingrese el nombre do número de documento");
let selectedValue = ref("");
let columns = ref([
  {
    name: "index",
    label: "N°",
    align: "center",
    field: "index"
  },
  {
    name: "register",
    label: "Etapa Productiva Asignada",
    align: "center",
    field: "register",
  },
  {
    name: "number",
    label: "N° Seguimiento",
    align: "center",
    field: "number"
  },
  {
    name: "options",
    label: "Estado",
    align: "center",
    field: "status",
  },
  {
    name: "observations",
    label: "Observaciones",
    align: "center",
    field: "observations",
  },
  {
    name: "month",
    label: "Mes",
    align: "center",
    field: "month"
  },
]);

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
  {
    label: "Verificado técnico",
    value: 5,
  },
  {
    label: "Verificado proyecto",
    value: 6,
  },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  loading.value = true
  let data;
  try {
    if (role.value === "ADMIN") {
      data = await getData("/followup/listallfollowup");
      rows.value = data.listallFollowup.map((followup, idx) => ({
        ...followup,
        register: followup.assignment.apprentice.firstName + " " + followup.assignment.apprentice.lastName,
        month: formatMonth(followup.month),
        index: idx + 1,
      }));
    } else {
      data = await getData(`/followup/listfollowupbyinstructor/${instructor.value}`);

      rows.value = data.listFollowupByInstructor.map((followup, idx) => {
        return {
          ...followup,
          register: `${followup.assignment.apprentice.firstName} ${followup.assignment.apprentice.lastName}`,
          month: formatMonth(followup.month),
          index: idx + 1,
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  loading.value = true;
  try {
    const data = {
      assignment: assignment.value,
      instructor: instructor.value,
      number: numFollowUp.value.trim(),
      document: document.value.trim(),
      month: month.value.trim(),
      data: "Creó seguimiento",
    };
    await postData(`/followup/addfollowup`, data);
    notifySuccessRequest("Seguimiento creado exitosamente");
    showModalCreate.value = false;
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

async function onSubmitObservation() {
  loading.value = true;
  try {
    let data = {
      observations: [
        {
          observation: observation.value.trim(),
          observationDate: observationDate,
          user: user.value,
        },
      ],
      data: "Creó observación seguimiento",
      idFollowUp: idFollowUp.value,
    };

    let url = await putData(
      `/followup/addobservation/${idFollowUp.value}`,
      data
    );
    notifySuccessRequest("Observación guardada exitosamente");
    showModalObservations.value = false;
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

function openModalCreate() {
  showModalCreate.value = true;
}

async function openModalObservations(id, changes) {
  showModalObservations.value = true;
  idFollowUp.value = id;
  change.value = changes;
  loadingObs.value = true

  try {
    let data = await getData(`/followup/listfollowupbyid/${id}`);
    listObservations.value = data.listFollowupById.observations;
  } catch (error) {
    console.log(error);
  } finally {
    loadingObs.value = false
  }
}

async function handleUpdateStatus(status, id) {
  try {
    await putData(`/followup/updatestatus/${id}/${status}`, {
      data: "Cambió estado seguimiento",
      status: status,
      idBinnacle: id,
    });
    bring();
  } catch (error) {
    console.log(error);
  }
}

function onReset() {
  assignment.value = "";
  numFollowUp.value = "";
  document.value = "";
  month.value = "";
  observation.value = "";
  idFollowUp.value = "";
}

const filteredRows = computed(() => {
  if (!searchTerm.value) return rows.value; // Si no hay término de búsqueda, devolver todos los registros
  return rows.value.filter((row) => {
    return row.register
      .toLowerCase()
      .startsWith(searchTerm.value.toLowerCase());
  });
});

async function filterAssignment(val, update) {
  let assignment = await getData("/register/listallregister");

  let theAssignment = assignment.register;
  if (val === "") {
    update(() => {
      optionsAssignment.value = theAssignment.map((assignment) => ({
        label: `${assignment.apprentice.firstName} ${assignment.apprentice.lastName} - ${assignment.apprentice.numDocument}`,
        value: assignment._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsAssignment.value = theAssignment
      .map((assignment) => ({
        label: `${assignment.apprentice.firstName} ${assignment.apprentice.lastName} - ${assignment.apprentice.numDocument}`,
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
  font-size: 45px;
}

h3 {
  text-align: center;
  margin-bottom: 0;
  font-weight: bold;
}

.full-width {
  transition: box-shadow 0.3s ease;
}

.full-width:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}

.observation-box {
  background-color: #f9f9f9;
  /* Fondo gris claro */

  padding: 10px;
  /* Espaciado interno */
  margin-bottom: 10px;
  /* Espaciado entre los cuadros */
  border-radius: 8px;
  /* Bordes redondeados */
}
</style>