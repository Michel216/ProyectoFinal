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
    <h3 class="title-table">Registro EP</h3>
    <hr id="hr" class="bg-green-9" />

    <Btn
      :label="btnLabel"
      :onClickFunction="bringIdAndOpenModal"
      :loading="loading"
    />
    <RegisterTable
      :title="title"
      :columns="columns"
      :rows="rows"
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
  v-model="modality"
  label="Modalidad"
  :options="optionsModality"
  emit-value
  map-options
  clearable
  use-input
  input-debounce="0"
  behavior="menu"
  lazy-rules
  :rules="[
    (val) => (val && val.length > 0) || 'Por favor, dígite la modalidad',
  ]"
>
  <template v-slot:no-option>
    <q-item>
      <q-item-section class="text-grey"> No results </q-item-section>
    </q-item>
  </template>
</q-select>
         
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
import RegisterTable from "../components/tables/BasicTable.vue";
import { formatDate } from "../utils/formatDate.js";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";

let loading = ref(false);
let title = "Registros";
let btnLabel = "Crear ";
let apprentice = ref();
let modality = ref();
let startDate = ref();
let endDate = ref();
let company = ref();
let phoneCompany = ref();
let addressCompany = ref();
let owner = ref();
let docAlternative = ref();
let hour = ref();
let idRegister = ref();
let change = ref(); // true: crear, false: modificar
const showModal = ref(false);
const optionsApprentice = ref();
const optionsModality = ref();
const rows = ref([]);
const columns = ref([
  { name: "apprentice", label: "Nombre Aprendiz", align: "center", field: "apprentice" },
  { name: "program", label: "Programa", align: "center", field: "program" },
  { name: "modality", label: "Modalidad", align: "center", field: "modality" },
  { name: "assignment", label: "Asignación", align: "center", field: "assignment" },
  { name: "startDate", label: "Fecha Inicio", align: "center", field: "startDate" },
  { name: "endDate", label: "Fecha Fin", align: "center", field: "endDate" },
  { name: "details", label: "Detalles", align: "center", field: "details" },
  { name: "registerHours", label: "Registro Horas", align: "center", field: "registerHours" },
]);


onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData("/register/listallregister");
    console.log(data);

    rows.value = data.register.map((register) => {
      return {
        ...register,
        // apprentice: (register.apprentice.firstName + ' ' + register.apprentice.lastName),
        modality: register.modality.name,
        startDate: formatDate(register.startDate),
        endDate: formatDate(register.endDate),
      };
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url =
      status === 0
        ? `/register/enableregister/${rows}`
        : `/register/disableregister/${rows}`;
    let data = await putData(url);
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
      apprentice: apprentice.value,
      modality: modality.value,
      startDate: startDate.value,
      endDate: endDate.value,
      company: company.value,
      phonecompany: phoneCompany.value,
      addresscompany: addressCompany.value,
      owner: owner.value,
      docAlternative: docAlternative.value,
      hour: hour.value,
    };
    if (change.value === true) {
      url.value = await postData("/register/addregister", data);
      notifySuccessRequest("Registro creado exitosamente");
    } else {
      url.value = await putData(
        `/register/updateregisterbyid/${idRegister.value}`,
        data
      );
      notifySuccessRequest("Registro actualizado exitosamente");
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
  apprentice.value = "";
  modality.value = "";
  startDate.value = "";
  endDate.value = "";
  company.value = "";
  phoneCompany.value = "";
  addressCompany.value = "";
  owner.value = "";
  docAlternative.value = "";
  hour.value = "";
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let register = await getData(`/register/listregisterbyid/${id}`);
    let theRegister = register.listRegisterById;
    let apprentices = await getData(
      `/apprentice/listapprenticebyid/${theRegister.apprentice}`
    );
    let modalities = await getData(
      `/modality/listmodalitybyid/${theRegister.modality}`
    );
    idRegister.value = id;
    change.value = false;
    apprentice.value = apprentices.listApprenticesById._id;
    modality.value = modalities.listModalityById._id;
    optionsApprentice.value = [
      {
        label: apprentices.listApprenticesById.numDocument,
        value: apprentices.listApprenticesById._id,
      },
    ];
    optionsModality.value = [
      {
        label: modalities.listModalityById.name,
        value: modalities.listModalityById._id,
      },
    ];
    startDate.value = theRegister.startDate;
    endDate.value = theRegister.endDate;
    company.value = theRegister.company;
    phoneCompany.value = theRegister.phonecompany;
    addressCompany.value = theRegister.addresscompany;
    owner.value = theRegister.owner;
    docAlternative.value = theRegister.docAlternative;
    hour.value = theRegister.hour;
  } else {
    idRegister.value = "";
    change.value = true;
  }
}

async function filterApprentice(val, update) {
  let apprentices = await getData("/apprentice/listallapprentice");
  let theApprentice = apprentices.listApprentice;
  if (val === "") {
    update(() => {
      optionsApprentice.value = theApprentice.map((apprentice) => ({
        label: apprentice.numDocument,
        value: apprentice._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsApprentice.value = theApprentice
      .map((apprentice) => ({
        label: apprentice.numDocument,
        value: apprentice._id,
      }))
      .filter((option) => option.label.toLowerCase().includes(needle));
  });
}

async function filterModality(val, update) {
  let modality = await getData("/modality/listallmodality");
  let theModality = modality.listAllModalities;
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
  h3 {
  text-align: center;
  margin-bottom: 0;
  font-weight: bold;
}
</style>