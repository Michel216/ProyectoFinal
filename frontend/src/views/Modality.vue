<template>
  <div class="q-pa-md q-gutter-md">
    <router-link
      to="/home"
      class="iconExit"
      style="display: flex; text-decoration: none"
    >
      <q-btn
        dense
        unelevated
        round
        color="primary"
        icon="arrow_back"
        text-color="white"
      />
    </router-link>
    <h3 class="title-table">Modalidades</h3>
    <hr id="hr" class="bg-green-9" />
    <Btn :label="btnLabel" :onClickFunction="bringId" :loading="loading" />
    <modalityTable
      :title="title"
      :columns="columns"
      :rows="rows"
      :onToggleActivate="handleToggleActivate"
      :onClickEdit="bringId"
    />
    <Modal
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
          />
          <q-input
            outlined
            type="number"
            v-model="hourInstructorFollow"
            label="Hora instructor de seguimiento"
          />
          <q-input
            outlined
            type="number"
            v-model="hourInstructorProject"
            label="Hora instructor de projecto"
          />
          <q-input
            outlined
            type="number"
            v-model="hourInstructorTechnical"
            label="Hora instructor técnico"
          />
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
import modalityTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";

let title = "Modalidades";
let loading = ref(false);
let btnLabel = "Crear";
const showModal = ref(false);
let name = ref("");
let hourInstructorProject = ref();
let hourInstructorTechnical = ref();
let hourInstructorFollow = ref();
let idModality = ref("");
let change = ref(); // true: crear, false: modificar
const rows = ref([]);
const columns = [
  {
    name: "name",
    align: "center",
    label: "Nombre",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "Horas del instructor de seguimineto",
    field: "hourInstructorFollow",
  },
  {
    name: "hourInstructorTechnical",
    align: "center",
    label: "Horas del instructor técnico",
    field: "hourInstructorTechnical",
  },
  {
    name: "hourInstructorProject",
    align: "center",
    label: "Horas del instructor de proyecto",
    field: "hourInstructorProject",
  },
];

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData("/modality/listallmodality");
    console.log(data);
    rows.value = data.listAllModalities;
  } catch (error) {
    console.log(error);
  }
}

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

</style>