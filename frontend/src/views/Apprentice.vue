<template>
  <div class="q-pa-md q-gutter-md">
    <Btn :label="btnLabel" :onClickFunction='bringIdAndOpenModal' :loading="loading" />
    <apprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate"
      :loading="loading" :onClickEdit="bringIdAndOpenModal" />
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select outlined v-model="fiche" label="Ficha" :options="optionsIdFiche" lazy-rules :rules="[
            val => (val && val.length > 0) ||
              'Por favor, dígite el código de la ficha'
          ]" />
          <q-select outlined v-model="tpDoc" label="Tipo de documento" :options="optionsTpDoc" emit-value map-options
            lazy-rules :rules="[
              val => (val && val.length > 0) ||
                'Por favor, dígite el tipo de documento'
            ]" />
          <q-input outlined type="number" v-model="numDoc" label="Número de documento" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el número de documento']" />
          <q-input outlined v-model="firstName" label="Nombres" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el nombre del aprendiz']" />
          <q-input outlined v-model="lastName" label="Apellidos" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el apellido del aprendiz']" />
          <q-input outlined type="number" v-model="phone" label="Teléfono" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el teléfono del aprndiz']" />
          <q-input outlined v-model="email" label="Email" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite el correo del aprendiz']" />
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
import apprenticeTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue"
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "../composables/Notify";

let loading = ref(false)
let title = 'Aprendices'
let btnLabel = 'Crear aprendiz'
const showModal = ref(false);
let fiche = ref('')
let tpDoc = ref('')
let numDoc = ref('')
let firstName = ref('')
let lastName = ref('')
let phone = ref('')
let email = ref('')
let idApprentice = ref('')
let change = ref() // true: crear, false: modificar
const rows = ref([]);
let optionsTpDoc = ref(["cédula de ciudadanía", "tarjeta de identidad", "cédula de extranjería"])
let optionsIdFiche = ref(["671016f171e7d8e0b4b7cf5b"])
const columns = ref([
  { name: "tpdocument", label: "Tipo de Documento", align: "center", field: "tpdocument" },
  { name: "numDocument", label: "Número de Documento", align: "center", field: "numDocument" },
  { name: "firstName", label: "Nombre", align: "center", field: "firstName" },
  { name: "lastName", label: "Apellido", align: "center", field: "lastName" },
  { name: "phone", label: "Télefono", align: "center", field: "phone" },
  { name: "email", label: "Correo", align: "center", field: "email" },
  { name: "fiche", label: "Ficha", align: "center", field: "fiche" }
]);


onBeforeMount(() => {
  bring();
})

async function bring() {
  loading.value = true
  try {
    let url = await getData('/apprentice/listallapprentice');
    console.log(url);
    rows.value = url.listApprentice

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

async function handleToggleActivate(id, status) {
  try {
    const url = status === 0 ? `/apprentice/enableapprentice/${id}` : `/apprentice/disableapprentice/${id}`
    await putData(url);
    bring()

  } catch (error) {
    console.log(error);
  }
};

async function onSubmit() {
  loading.value = true
  try {
    let url = ref();
    let data = {
      tpdocument: tpDoc.value,
      numDocument: numDoc.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      email: email.value,
      fiche: fiche.value
    }
    if (change.value === true) {
      console.log('creo');
      url.value = await postData(`/apprentice/addapprentice`, data)
      notifySuccessRequest('Aprendiz creado exitosamente');
    } else {
      console.log('edito');
      url.value = await putData(`/apprentice/updateapprenticebyid/${idApprentice.value}`, data)
      notifySuccessRequest('Aprendiz actualizado exitosamente');
    }
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
  tpDoc.value = ''
  numDoc.value = ''
  firstName.value = ''
  lastName.value = ''
  phone.value = ''
  email.value = ''
  fiche.value = ''
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let apprentice = await getData(`/apprentice/listapprenticebyid/${id}`);
    let theApprentice = apprentice.listApprenticesById
    idApprentice.value = id
    console.log(id);
    change.value = false
    tpDoc.value = theApprentice.tpdocument
    numDoc.value = theApprentice.numDocument
    firstName.value = theApprentice.firstName
    lastName.value = theApprentice.lastName
    phone.value = theApprentice.phone
    email.value = theApprentice.email
    fiche.value = theApprentice.fiche
  } else {
    idApprentice.value = ''
    change.value = true
  }
}
</script>