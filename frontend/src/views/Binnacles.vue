<template>
  <div class="q-pa-md q-gutter-md">
    <!-- Encabezado -->
    <Header title="Bitácoras" />
    <!-- Filtro -->
    <div style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-end; margin: -30px 0px">
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; width: 100%;">
          <!-- Radio buttons -->
          <!-- <div style="display: flex; flex-direction: row; align-items: flex-start; margin-right: 10px;">
            <q-radio v-model="selectedValue" val="instructor" label="Instructor" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="assignment" label="Aprendiz" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: -10px;" />
          </div> -->

          <!-- Input de búsqueda alineado a la izquierda -->
          <div class="q-pa-md" style="flex-grow: 1; display: flex; justify-content: flex-start;">
            <div class="rounded-input" style=" width: 370px;">
              <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" @input="handleFilter" outlined
                :disable="!selectedValue" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botón crear -->
    <Btn :icon="icons" :label="btnLabel" :onClickFunction="openModalCreate" :loading="loading"
      v-if="role === 'INSTRUCTOR'" />
      <!-- Tabla -->
    <binnacleTable :title="title" :columns="columns" :rows="filteredRows" :options="options"
      :onUpdateStatus="handleUpdateStatus" :val="true" :onClickFunction="openModalObservations"
      @update:loading="(val) => (loading = val)" :loading="loading" />
      <!-- Modal "crear bitácora" -->
    <Modal :onClickFunction="onReset" :isVisible="showModalCreate" @update:isVisible="showModalCreate = $event"
      label="DILIGENCIA LA INFORMACION">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select outlined v-model="assignment" label="Seleccione una asignación" :options="optionsAssignment"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterAssignment"
            lazy-rules :rules="[(val) => (val.trim() && val.length > 0) || 'Por favor, seleccione una asignación']">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-hand-pointer" />
            </template>
          </q-select>

          <q-input outlined type="number" v-model="numBinnacle" label="N° Bitacora" lazy-rules
            :rules="[(val) => (val.trim() && val.length > 0) || 'Por favor, dígite el número de la bitácora']">
            <template v-slot:prepend>
              <q-icon name="123" />
            </template>
          </q-input>

          <q-input outlined v-model="document" label="Documento" lazy-rules
            :rules="[(val) => (val.trim() && val.length > 0) || 'Por favor, ingrese un documento']">
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <div align="center">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />
            <q-btn label="Cerrar" type="reset" icon="close" v-close-popup class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </Modal>
    <!-- Modal "observaciones" -->
    <Modal :onClickFunction="onReset" :isVisible="showModalObservations"
      @update:isVisible="showModalObservations = $event" :label="'OBSERVACIONES'">
      <div class="q-pa-md" style="max-width: 400px">
        <!-- Crear observacióon -->
        <q-form v-if="!change" @submit="onSubmitObservation" @reset="onReset" class="q-gutter-md">
          <q-input outlined type="textarea" v-model="observation" label="Observación" lazy-rules
            :rules="[(val) => (val.trim() && val.length > 0) || 'Por favor, ingrese una observación']" />

          <div align="center">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />
            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
        <!-- Ver observaciones -->
        <q-form v-else @submit="onSubmitObservation" @reset="onReset">
          <div v-for="(item, index) in listObservations" :key="index">
            <div v-if="listObservations.length > 0">
              <q-chat-message v-if="item.user === user" sent style="margin-left: 50px;">
                <p style="padding: 5px;">
                  <span class="text-h7 text-primary"><strong> {{ item.user
                      }}</strong></span> <br>
                  <span class=" text-dark">{{ item.observation
                    }}</span> <br><br>
                  <span class="text-h7 text-primary" style="float: right;"><strong> {{ formatDate(item.observationDate)
                      }}</strong></span>
                </p>
              </q-chat-message>
              <q-chat-message v-else bg-color="green-3" style="margin-right: 50px;">
                <p style="padding: 5px;">
                  <span class="text-h7 text-dark"><strong> {{ item.user
                      }}</strong></span> <br>
                  <span class=" text-dark">{{ item.observation
                    }}</span> <br><br>
                  <span class="text-h7 text-dark" style="float: right;"><strong> {{ formatDate(item.observationDate)
                      }}</strong></span>
                </p>
              </q-chat-message>
            </div>

          </div>
          <div v-if="listObservations.length <= 0">
            <q-card bordered class="bg-grey-5 my-card">
              <q-card-section align="center" class="text-h5 text-bold text-grey-8">
                No hay observaciones
              </q-card-section>
            </q-card>
          </div>
          <br>
          <div align="center">
            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm full-width" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getDataRepfora } from '../services/apiRepfora.js'
import { getData, putData, postData } from "../services/apiClient.js";
import binnacleTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest } from "../composables/Notify";
import { formatDate } from "../utils/formatDate.js";
import moment from "moment-timezone"
import { useAuthStore } from './../store/useAuth.js'
import Header from '../components/header/Header.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendarDay, faChalkboardUser, faHandPointer } from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarDay, faChalkboardUser, faHandPointer);
const authStore = useAuthStore();
const role = computed(() => authStore.getRole());
const user = computed(() => authStore.getEmail());
const icons = "control_point"
const title = "Bitácoras";
const btnLabel = "Crear";
const instructor = ref("67105c23bad722df0d908a25");
let loading = ref(false);
let change = ref()
let assignment = ref("");
let numBinnacle = ref("");
let document = ref("");
let observation = ref("");
let observationDate = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss')
let listObservations = ref("")
let idBinnacle = ref("")
let showModalCreate = ref(false);
let showModalObservations = ref(false);
let optionsAssignment = ref();
let rows = ref([]);
let submitResult = ref([]);
let searchTerm = ref("");
let searchLabel = ref('Buscar')
let selectedValue = ref('');
let columns = computed(() => {
  let baseColumns = [
    {
      name: "index",
      label: "N°",
      align: "center",
      field: 'index'
    },
    {
      name: "assignment",
      label: "Etapa Productiva Asignada",
      align: "center",
      field: "assignment",
    },
    {
      name: "number",
      label: "N° Bitácora",
      align: "center",
      field: "number",
      sortable: true,
    },
    {
      name: "options",
      label: "Estado",
      align: "center",
      field: "status"
    },
    {
      name: "observations",
      label: "Observaciones",
      align: "center",
      field: "observations",
    },
  ];

  if (role.value === 'ADMIN') {
    baseColumns.splice(2, 0,
      {
        name: "instructor",
        label: "Instructor",
        align: "center",
        field: "instructor"
      },)
  }
  return baseColumns;
});

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
    if (role.value === 'ADMIN') {
      data = await getData("/binnacles/listallbinnacles");

      if (Array.isArray(data.ListAllBinnacles) && data.ListAllBinnacles.length > 0) {
        rows.value = await Promise.all(data.ListAllBinnacles.map(async (item, idx) => {

          let instructorId = item.instructor;
          let instructorData;
          if (role.value === "ADMIN") {
            instructorData = await getDataRepfora(`/instructors/${instructorId}`)
          }

          const assignmentApprentice = item.assignment && item.assignment.apprentice
            ? item.assignment.apprentice
            : { firstName: 'N/A', lastName: 'N/A' };

          return {
            ...item,
            assignment: `${assignmentApprentice.firstName} ${assignmentApprentice.lastName}`,
            instructor: role.value === "ADMIN" ? instructorData.data.name : '',
            index: idx + 1,
          };
        }));
      } else {
        console.log("El campo 'ListAllBinnacles' no es un array o está vacío.");
      }
    } else {
      data = await getData(`/binnacles/listbinnaclesbyinstructor/${instructor.value}`);

      rows.value = data.listBinnalcesByInstructor.map((item, idx) => {
        const assignmentApprentice = item.assignment && item.assignment.apprentice
        ? item.assignment.apprentice
        : { firstName: 'N/A', lastName: 'N/A' };

        return {
          ...item,
          assignment: `${assignmentApprentice.firstName} ${assignmentApprentice.lastName}`,
          index: idx + 1,
        }
      })
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
    let data = {
      assignment: assignment.value.trim(),
      instructor: instructor.value,
      number: numBinnacle.value.trim(),
      document: document.value.trim(),
      data: "Creó bitácora"
    };
    let url = await postData(`/binnacles/addbinnacles`, data);
    notifySuccessRequest("Bitácora creada exitosamente");
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
  loading.value = true
  try {
    let data = {
      observations: [
        {
          observation: observation.value.trim(),
          observationDate: observationDate,
          user: user.value
        }
      ],
      data: "Creó observación bitácora",
      idBinnacle: idBinnacle.value
    }
    let url = await putData(`/binnacles/addobservation/${idBinnacle.value}`, data)
    notifySuccessRequest("Observación guardada exitosamente");
    showModalObservations.value = false
    bring();
    onReset();
  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");
  } finally {
    loading.value = false
  }
}

function openModalCreate() {
  showModalCreate.value = true;
}

async function openModalObservations(id, changes) {
  showModalObservations.value = true;
  idBinnacle.value = id
  change.value = changes
  try {
    let data = await getData(`/binnacles/listbinnaclesbyid/${id}`);
    listObservations.value = data.listBinnacleById.observations
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateStatus(status, id) {
  try {
    let data = await putData(`/binnacles/updatestatus/${id}/${status}`, { data: "Cambió estado bitácora", status: status, idBinnacle: id });
    bring();
  } catch (error) {
    console.log(error);
  }
}

function radiobtn(evt) {
  const formData = new FormData(evt.target)
  const data = []

  for (const [name, value] of formData.entries()) {
    data.push({ name, value })
  }

  submitResult.value = data
}

const handleFilter = () => {
  if (selectedValue.value === "assignment") {
    searchLabel.value = "Ingrese el nombre del aprendiz";
  } else if (selectedValue.value === "instructor") {
    searchLabel.value = "Ingrese el nombre del instructor";
  } else {
    searchLabel.value = "Buscar";
  }
};

function onReset() {
  assignment.value = "";
  numBinnacle.value = "";
  document.value = "";
  observation.value = "";
}

const filteredRows = computed(() => {
  if (!searchTerm.value) return rows.value;

  return rows.value.filter(row => {
    if (selectedValue.value === "instructor") {
      return (
        (row.instructor.toLowerCase().startsWith(searchTerm.value.toLowerCase()))
      );
    } else if (selectedValue.value === "assignment") {
      return (
        (row.assignment.toLowerCase().startsWith(searchTerm.value.toLowerCase()))
      );
    }
    return false;
  });
});

async function filterAssignment(val, update) {
  let assignment = await getData('/register/listallregister');

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
</style>