<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Modalidad EP"></Header>
    <div style="display: flex; align-items: center; justify-content: space-between;  margin: -30px 0">
      <div class="btn" style="display: flex; flex-direction: row;  gap: 10px; margin-left: 10%">
        <Btn :label="btnLabel" :onClickFunction="bringId" :loading="loading" />
      </div>
      <!-- Formulario de radio centrado -->
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div class="q-pa-md">
          <div class="rounded-input" style="width: 350px; ">
            <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" @input="handleFilter" outlined />
          </div>
        </div>
      </div>
    </div>
  
  <modalityTable :title="title" :columns="columns" :rows="filteredRows" :onToggleActivate="handleToggleActivate"
    :onClickEdit="bringId" />
    <Modal :onClickFunction="onReset"
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      :label="btnLabel"
    >
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            outlined
            v-model="name"
            label="Nombre de la modalidad"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el nombre de la modalidad',
            ]"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-person-chalkboard" />
            </template>
          </q-input>
          <q-input
            outlined
            type="number"
            v-model="hourInstructorFollow"
            label="Hora instructor de seguimiento"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-clock" />
            </template>
          </q-input>
          <q-input
            outlined
            type="number"
            v-model="hourInstructorProject"
            label="Hora instructor de projecto"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-clock" />
            </template>
          </q-input>
          <q-input
            outlined
            type="number"
            v-model="hourInstructorTechnical"
            label="Hora instructor técnico"
          >
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-clock" />
            </template>
          </q-input>
          <div>
            <q-btn
              label="guardar"
              type="submit"
              color="primary"
              :loading="isLoading"  :disable="isLoading" 
              class="full-width"
            />
            <q-btn label="Cerrar"  type="reset" icon="close"  class="full-width"  v-close-popup
            style="background-color: white; color: black; box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);" />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { getData, putData, postData } from "../services/apiClient.js";
import modalityTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";
import Header from '../components/header/Header.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faClock, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

library.add(faClock, faPersonChalkboard)

let title = "Modalidades";
let loading = ref(false);
const isLoading = ref(false);
let btnLabel = "Crear";
const showModal = ref(false);
let name = ref("");
let hourInstructorProject = ref();
let hourInstructorTechnical = ref();
let hourInstructorFollow = ref();
let idModality = ref("");
let searchTerm = ref("");
let searchLabel = ref('Ingrese el nombre de la modalidad')

let change = ref(); // true: crear, false: modificar
const rows = ref([]);
const columns = [
  {
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  {
    name: "name",
    align: "center",
    label: "NOMBRE MODALIDAD",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "HORAS INS. SEGUIMIENTO",
    field: "hourInstructorFollow",
    format: (val) => (val === 0 ? "N/A" : val),
  },
  {
    name: "hourInstructorTechnical",
    align: "center",
    label: "HORAS INS. TÉCNICO",
    field: "hourInstructorTechnical",
    format: (val) => (val === 0 ? "N/A" : val),
  },
  {
    name: "hourInstructorProject",
    align: "center",
    label: "HORAS INS. PROYECTO",
    field: "hourInstructorProject",
    format: (val) => (val === 0 ? "N/A" : val),
  },
];

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData("/modality/listallmodality");
    console.log(data);
    rows.value = data.listAllModalities.map((item, idx) => ({
      ...item,
    index: idx + 1
  }));
  } catch (error) {
    console.log(error);
  }
}

const filteredRows = computed(() => {
    if (!searchTerm.value) return rows.value;  // Si no hay término de búsqueda, devolver todos los registros
    return rows.value.filter(row => {

        return row.name.toLowerCase().startsWith(searchTerm.value.toLowerCase())
    });
  });

async function handleToggleActivate(id, status) {
  try {
    const url =
      status === 0
        ? `/modality/enablemodalitybyid/${id}`
        : `/modality/disablemodalitybyid/${id}`;
    let data = await putData(url);
    bring();
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true;
  isLoading.value = true; 
  let data = {
    name: name.value,
  };
  if (hourInstructorFollow.value != "")
    data.hourInstructorFollow = hourInstructorFollow.value;
  if (hourInstructorTechnical.value != "")
    data.hourInstructorTechnical = hourInstructorTechnical.value;
  if (hourInstructorProject.value != "")
    data.hourInstructorProject = hourInstructorProject.value;
  try {
    let url = ref();

    if (change.value === true) {
      console.log("creo");
      console.log(data);
      url.value = await postData(`/modality/addmodality`, data);
      notifySuccessRequest("Modalidad creada exitosamente");
    } else {
      console.log("edito");
      url.value = await putData(
        `/modality/updatemodalitybyid/${idModality.value}`,
        data
      );
      notifySuccessRequest("Modalidad actualizada exitosamente");
    }

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
    isLoading.value = false; 
  }
}

function onReset() {
  name.value = "";
  hourInstructorFollow.value = "";
  hourInstructorTechnical.value = "";
  hourInstructorProject.value = "";
}

async function bringId(id) {
  showModal.value = true;
  if (id) {
    let modality = await getData(`/modality/listmodalitybyid/${id}`);
    let TheModality = modality.listModalityById;
    idModality.value = id;
    console.log(id);
    change.value = false;
    name.value = TheModality.name;
    hourInstructorFollow.value = TheModality.hourInstructorFollow;
    hourInstructorTechnical.value = TheModality.hourInstructorTechnical;
    hourInstructorProject.value = TheModality.hourInstructorProject;
  } else {
    idModality.value = "";
    change.value = true;
  }
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