<template>
  <div class="q-pa-md q-gutter-md">
    <Btn :label="btnLabel" :onClickFunction='bringId' :loading="loading" />
    <modalityTable :title="title" :columns="columns" :rows="rows" :onToggleActivate="handleToggleActivate" :onClickEdit="bringId"/>
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input outlined v-model="name" label="Nombre de la modalidad" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el nombre de la modalidad']" />
          <q-input outlined type="number" v-model="hourInstructorFollow" label="Hora instructor de seguimiento" />
          <q-input outlined type="number" v-model="hourInstructorProject" label="Hora instructor de projecto" />
          <q-input outlined type="number" v-model="hourInstructorTechnical" label="Hora instructor técnico" />
          <div>
            <q-btn label="guardar" type="submit" color="primary" :loading="loading" />
            <q-btn label="cerrar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData, postData } from '../services/apiClient.js';
import modalityTable from '../components/tables/BasicTable.vue'
import Btn from "../components/buttons/Button.vue"
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "../composables/Notify";


let title = "Modalidades"
let loading = ref(false)
let btnLabel = 'Crear modalidad'
const showModal = ref(false);
let name = ref('')
let hourInstructorProject = ref()
let hourInstructorTechnical = ref()
let hourInstructorFollow = ref()
let idModality = ref('')
let change = ref()
const rows = ref([])
const columns = [
  { name: 'name', align: "center", label: 'Nombre', field: 'name', sortable: true },
  { name: 'hourInstructorFollow', align: "center", label: 'Horas del instructor de seguimineto', field: 'hourInstructorFollow' },
  { name: 'hourInstructorTechnical', align: "center", label: 'Horas del instructor técnico', field: 'hourInstructorTechnical' },
  { name: 'hourInstructorProject', align: "center", label: 'Horas del instructor de proyecto', field: 'hourInstructorProject' }
]

onBeforeMount(() => {
  bring();
})

async function bring() {
  try {
    let data = await getData('/modality/listallmodality');
    console.log(data);
    rows.value = data.listAllModalities;

  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/modality/enablemodalitybyid/${rows}` : `/modality/disablemodalitybyid/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);

  }

};

async function onSubmit() {
  loading.value = true
  let data = {
    name: name.value,
  }
  if (hourInstructorFollow != '') data.hourInstructorFollow = hourInstructorFollow.value
  if (hourInstructorTechnical != '') data.hourInstructorTechnical = hourInstructorTechnical.value
  if (hourInstructorProject != '') data.hourInstructorProject = hourInstructorProject.value
  try {
    let url = ref();

    if (change.value === true) {
      console.log('creo');
      console.log(data);
      url.value = await postData(`/modality/addmodality`, data)

    } else {
      console.log('edito');
      url.value = await putData(`/modality/updatemodalitybyid/${idModality.value}`, data)
    }
    notifySuccessRequest('Modalidad creada exitosamente');
    showModal.value = false;
    bring();
    onReset()
  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");
  } finally {
    loading.value = false
  }
}

function onReset() {
  name.value = ''
  hourInstructorFollow.value = ''
  hourInstructorTechnical.value = ''
  hourInstructorProject.value = ''
}

async function bringId(row) {
  showModal.value = true;
  if (row) {
    let modality = await getData(`/modality/listmodalitybyid/${row}`);
    let TheModality = modality.listModalityById
    idModality.value = row
    console.log(row);
    change.value = false
    name.value = TheModality.name
    hourInstructorFollow.value = TheModality.hourInstructorFollow
    hourInstructorTechnical.value = TheModality.hourInstructorTechnical
    hourInstructorProject.value = TheModality.hourInstructorProject
  } else {
    idModality.value = ''
    change.value = true
  }
}

</script>