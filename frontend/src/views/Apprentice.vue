<template>
  <div class="q-pa-md q-gutter-md">
    <h3 class="title-table">Aprendices</h3>
    <hr id="hr" class="bg-green-9" />
    <Btn
      :label="btnLabel"
      :onClickFunction="bringIdAndOpenModal"
      :loading="loading"
    />
    <apprenticeTable
      :title="title"
      :rows="rows"
      :columns="columns"
      :onToggleActivate="handleToggleActivate"
      :loading="loading"
      :onClickEdit="bringIdAndOpenModal"
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
            v-model="fiche"
            label="Ficha"
            :options="optionsIdFiche"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el código de la ficha',
            ]"
          />
          <q-select
            outlined
            v-model="modality"
            label="Modalidad"
            :options="optionsModality"
            emit-value
            map-options
            clearable
            use-input
            input-debounce="0"
            behavior="menu"
            @filter="filterModality"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor, dígite la modalidad',
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
            v-model="tpDoc"
            label="Tipo de documento"
            :options="optionsTpDoc"
            emit-value
            map-options
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el tipo de documento',
            ]"
          />
          <q-input
            outlined
            type="number"
            v-model="numDoc"
            label="Número de documento"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el número de documento',
            ]"
          />
          <q-input
            outlined
            v-model="firstName"
            label="Nombres"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el nombre del aprendiz',
            ]"
          />
          <q-input
            outlined
            v-model="lastName"
            label="Apellidos"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el apellido del aprendiz',
            ]"
          />
          <q-input
            outlined
            type="number"
            v-model="phone"
            label="Teléfono"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el teléfono del aprndiz',
            ]"
          />
          <q-input
            outlined
            v-model="institutionalEmail"
            label="Email institucional"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el correo institucional del aprendiz',
            ]"
          />
          <q-input
            outlined
            v-model="personalEmail"
            label="Email personal"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, dígite el correo personal del aprendiz',
            ]"
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
import apprenticeTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";

let loading = ref(false);
let title = "Aprendices";
let btnLabel = "Crear";
const showModal = ref(false);
let fiche = ref("");
let modality = ref("");
let tpDoc = ref("");
let numDoc = ref("");
let firstName = ref("");
let lastName = ref("");
let phone = ref("");
let institutionalEmail = ref("");
let personalEmail = ref("");
let idApprentice = ref("");
let change = ref(); // true: crear, false: modificar
const rows = ref([]);
let optionsTpDoc = ref([
  "cédula de ciudadanía",
  "tarjeta de identidad",
  "cédula de extranjería",
]);
let optionsIdFiche = ref(["671016f171e7d8e0b4b7cf5b"]);
let optionsModality = ref([]);
const columns = ref([
  {
    name: "tpdocument",
    label: "Tipo de Documento",
    align: "center",
    field: "tpdocument",
  },
  {
    name: "numDocument",
    label: "Número de Documento",
    align: "center",
    field: "numDocument",
  },
  { name: "firstName", label: "Nombre", align: "center", field: "firstName" },
  { name: "lastName", label: "Apellido", align: "center", field: "lastName" },
  { name: "phone", label: "Télefono", align: "center", field: "phone" },
  {
    name: "institutionalEmail",
    label: "Correo institucional",
    align: "center",
    field: "institutionalEmail",
  },
  {
    name: "personalEmail",
    label: "Correo personal",
    align: "center",
    field: "personalEmail",
  },
  { name: "fiche", label: "Ficha", align: "center", field: "fiche" },
  { name: "modality", label: "Modalidad", align: "center", field: "modality" },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  loading.value = true;
  try {
    let url = await getData("/apprentice/listallapprentice");
    console.log(url);
    rows.value = url.listApprentice.map((apprentice) => {
      return {
        ...apprentice,
        modality: apprentice.modality.name,
      };
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function handleToggleActivate(id, status) {
  try {
    const url =
      status === 0
        ? `/apprentice/enableapprentice/${id}`
        : `/apprentice/disableapprentice/${id}`;
    await putData(url);
    bring();
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true;
  try {
    let url = ref();
    let data = {
      tpdocument: tpDoc.value,
      numDocument: numDoc.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      institutionalEmail: institutionalEmail.value,
      personalEmail: personalEmail.value,
      fiche: fiche.value,
      modality: modality.value,
    };
    if (change.value === true) {
      console.log("creo");
      url.value = await postData(`apprentice/addapprentice`, data);
      console.log(data);

      notifySuccessRequest("Aprendiz creado exitosamente");
    } else {
      console.log("edito");
      url.value = await putData(
        `/apprentice/updateapprenticebyid/${idApprentice.value}`,
        data
      );
      notifySuccessRequest("Aprendiz actualizado exitosamente");
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
  tpDoc.value = "";
  numDoc.value = "";
  firstName.value = "";
  lastName.value = "";
  phone.value = "";
  institutionalEmail.value = "";
  personalEmail.value = "";
  fiche.value = "";
  modality.value = "";
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let apprentice = await getData(`/apprentice/listapprenticebyid/${id}`);
    let theApprentice = apprentice.listApprenticesById;
    let modalities = await getData(
      `/modality/listmodalitybyid/${theApprentice.modality}`
    );
    idApprentice.value = id;
    console.log(id);
    change.value = false;
    tpDoc.value = theApprentice.tpdocument;
    numDoc.value = theApprentice.numDocument;
    firstName.value = theApprentice.firstName;
    lastName.value = theApprentice.lastName;
    phone.value = theApprentice.phone;
    institutionalEmail.value = theApprentice.institutionalEmail;
    personalEmail.value = theApprentice.personalEmail;
    fiche.value = theApprentice.fiche;
    modality.value = modalities.listModalityById._id;
    optionsModality.value = [
      {
        label: modalities.listModalityById.name,
        value: modalities.listModalityById._id,
      },
    ];
  } else {
    idApprentice.value = "";
    change.value = true;
  }
}

async function filterModality(val, update) {
  let modality = await getData("/modality/listallmodality");
  let theModality = modality.listAllModalities.filter(
    (modality) => modality.status === 1
  );
  if (val === "") {
    update(() => {
      optionsModality.value = theModality.map((modality) => ({
        label: modality.name,
        value: modality._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsModality.value = theModality
      .map((modality) => ({
        label: modality.name,
        value: modality._id,
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