<template>
  <div class="q-pa-md q-gutter-md">
    <Btn :label="btnLabel" :onClickFunction='ClickFunctionOpenModal' />
    <apprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate" />
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select outlined v-model="text" label="Ficha" />
          <q-select outlined v-model="text" label="Tipo de documento" />
          <q-input outlined type="number" v-model="text" label="Número de documento" />
          <q-input outlined v-model="text" label="Nombres" />
          <q-input outlined v-model="text" label="Apellidos" />
          <q-input outlined type="tel" v-model="text" label="Teléfono" />
          <q-input outlined type="email" v-model="text" label="Email" />
          <div>
            <q-btn label="guardar" type="submit" color="primary" />
            <q-btn label="cerrar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData } from '../services/apiClient.js';
import apprenticeTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue"
import Modal from "../components/modals/Modal.vue";

let title = 'Aprendices'
let btnLabel = 'Crear aprendiz'
const showModal = ref(false);
let text = ref('')
const rows = ref([]);
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
  try {
    let data = await getData('/apprentice/listallapprentice');


    rows.value = data.listApprentice

  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/apprentice/enableapprentice/${rows}` : `/apprentice/disableapprentice/${rows}`
    let data = await putData(url);
    bring()

  } catch (error) {
    console.log(error);

  }

};

function ClickFunctionOpenModal() {
  console.log('modal abierto');
  showModal.value = true;
}
</script>