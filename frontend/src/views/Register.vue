<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Registros EP" />
    
    <Btn :icon="icons" :label="btnLabel" :onClickFunction='bringIdAndOpenModal' :loading="loading" />
    <RegisterTable :title="title" :columns="columns" :rows="rows" :onToggleActivate="handleToggleActivate" :onClickEdit="bringIdAndOpenModal" @update:loading="(val) => (loading = val)" :loading="loading"/>
    <Modal :onClickFunction="onReset" :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select outlined v-model="apprentice" label="Aprendiz" :options="optionsApprentice" emit-value map-options
            clearable use-input input-debounce="0" behavior="menu" @filter="filterApprentice" lazy-rules :rules="[
              val => val && val.length > 0 ||
                'Por favor, dígite la cédula del aprendiz'
            ]">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-user-graduate" />
            </template>
          </q-select>
          <q-select outlined v-model="modality" label="Modalidad" :options="optionsModality" emit-value map-options
            clearable use-input input-debounce="0" behavior="menu" @filter="filterModality" lazy-rules :rules="[
              val => (val && val.length > 0) ||
                'Por favor, dígite la modalidad'
            ]">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-person-chalkboard" />
            </template>
          </q-select>
          <q-input outlined v-model="startDate" label="Fecha inicial" mask="date"
            :rules="[val => val && val.length > 0 || 'Por favor, dígite la fecha inicio']">
            <template v-slot:prepend>
              <font-awesome-icon icon="calendar-day" class="cursor-pointer" />
              <q-popup-proxy cover transition-hide="scale">
                <q-date v-model="startDate" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input outlined v-model="company" label="Compañía" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el nombre de la compañía']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-building" />
            </template>
          </q-input>
          <q-input outlined type="number" v-model="phoneCompany" label="Teléfono compañía" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el teléfono de la compañía']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-phone" />
            </template>
          </q-input>
          <q-input outlined v-model="addressCompany" label="Dirreción compañía" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite la dirección de la compañía']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-map-pin" />
            </template>
          </q-input>
          <q-input outlined type="email" v-model="emailCompany" label="Correo de la compañía" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el correo de la compañía']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-envelope-circle-check" />
            </template>
          </q-input>
          <q-input outlined v-model="owner" label="Dueño compañía" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el nombre del dueño de la compañía']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-user-tie" />
            </template>
          </q-input>
          <q-input outlined v-model="docAlternative" label="Documento alternativo" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el documento alternativo']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-file-invoice" />
            </template>
          </q-input>
          <q-input outlined v-model="certificationDoc" label="Documento de certificación" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite el documento de certificación']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-file-invoice" />
            </template>
          </q-input>
          <q-input outlined v-model="judymentPhoto" label="Foto judicial" lazy-rules
            :rules="[val => val.trim() && val.length > 0 || 'Por favor, dígite la foto judicial']">
            <template v-slot:prepend>
              <font-awesome-icon icon="fa-solid fa-file-invoice" />
            </template>
          </q-input>
          <q-input outlined v-model="hour" label="Hora" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite la hora']">
            <template v-slot:prepend>
              <font-awesome-icon icon="clock" class="cursor-pointer" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="hour" mask="HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input outlined v-model="businessProyectHour" label="Hora proyecto" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite la hora del proyecto']">
            <template v-slot:prepend>
              <font-awesome-icon icon="business-time" class="cursor-pointer" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="businessProyectHour" mask="HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </template>
          </q-input>
          <q-input outlined v-model="productiveProyectHour" label="Hora proyecto" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, dígite la hora productiva del proyecto']">
            <template v-slot:prepend>
              <font-awesome-icon icon="business-time" class="cursor-pointer" />
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="productiveProyectHour" mask="HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </template>
          </q-input>
          <div align="center">
            <q-btn label="guardar" type="submit" color="primary" :loading="isLoading" icon="save"  :disable="isLoading" />
            <q-btn label="Cerrar" type="reset" icon="close" class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getData, putData, postData } from '../services/apiClient.js';
import { getDataRepfora } from '../services/apiRepfora.js'
import RegisterTable from "../components/tables/BasicTable.vue";
import { formatDate } from '../utils/formatDate.js';
import { convertTimeToMinutes } from '../utils/timeToMinutes.js';
import Btn from "../components/buttons/Button.vue"
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "../composables/Notify";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserGraduate, faPersonChalkboard, faCalendarDay, faBuilding, faPhone, faMapPin, faEnvelopeCircleCheck, faUserTie, faFileInvoice, faClock, faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header/Header.vue';
library.add(faUserGraduate, faPersonChalkboard, faCalendarDay, faBuilding, faPhone, faMapPin, faEnvelopeCircleCheck, faUserTie, faFileInvoice, faClock, faBusinessTime)

let loading = ref(false)
const isLoading = ref(false);
let title = 'Registros'
let btnLabel = 'Crear registro'
let icons="control_point"
let apprentice = ref()
let modality = ref()
let startDate = ref(null)
let company = ref()
let phoneCompany = ref()
let certificationDoc = ref()
let judymentPhoto = ref()
let productiveProyectHour = ref(null)
let addressCompany = ref()
let emailCompany = ref()
let businessProyectHour = ref(null)
let owner = ref()
let docAlternative = ref()
let hour = ref(null)
let idRegister = ref()
let change = ref() // true: crear, false: modificar
const showModal = ref(false);
const optionsApprentice = ref()
const optionsModality = ref()
const rows = ref([])
const columns = ref([
  {
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  { name: 'apprentice', label: 'NOMBRE APRENDIZ', align: 'center', field: 'apprentice' },
  { name: 'program', label: 'PROGRAMA', align: 'center', field: 'program' },
  { name: 'modality', label: 'MODALIDAD', align: 'center', field: 'modality' },
  // { name: 'assignment', label: 'ASIGNACIÓN', align: 'center', field: 'assignment' },
  { name: 'startDate', label: 'FECHA INICIO', align: 'center', field: 'startDate' },
  { name: 'endDate', label: 'FECHA FIN', align: 'center', field: 'endDate' },
  // { name: 'details', label: 'DETALLES', align: 'center', field: 'details' },
  { name: 'hour', label: 'REGISTRO HORAS', align: 'center', field: 'hour' },
  // { name: 'state', label: 'ESTADO', align: 'center', field: 'state' },
  // { name: 'options', label: 'OPCIONES', align: 'center', field: 'options' },
])

onBeforeMount(() => {
  bring();
})

async function bring() {
  loading.value = true
  try {
    // Obtener los datos de los registros
    let data = await getData('/register/listallregister');

    // Iterar sobre los registros y obtener los datos de 'fiche'
    rows.value = await Promise.all(data.register.map(async (register, idx) => {
      // Obtener los datos de la ficha (fiche) desde su ID
      const ficheId = register.apprentice.fiche;  // El ID de 'fiche' está en apprentice.fiche
      const ficheData = await getDataRepfora(`/fiches/${ficheId}`);  // Obtener 'fiche' por ID
      return {
        ...register,
        index: idx + 1,
        apprentice: `${register.apprentice.firstName} ${register.apprentice.lastName}`,
        program: ficheData.data.program.code,  // Acceder al código del programa desde 'fiche'
        modality: register.modality.name,
        startDate: formatDate(register.startDate),
        endDate: formatDate(register.endDate)
      };
    }));

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}



async function handleToggleActivate(id, status) {
  try {
    const url = status === 0 ? `/register/enableregister/${id}` : `/register/disableregister/${id}`
    let data = await putData(url, {data: "Cambió estado registro", status: status===0?1:0, idRegister: id});
    bring()

  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido")
  }

};


async function onSubmit() {
  loading.value = true
  isLoading.value = true; 
  try {
    let url = ref()

    let data = {
      "apprentice": apprentice.value.trim(),
      "modality": modality.value.trim(),
      "startDate": startDate.value.trim(),
      "company": company.value.trim(),
      "phonecompany": phoneCompany.value.trim(),
      "addresscompany": addressCompany.value.trim(),
      "emailCompany": emailCompany.value.trim(),
      "businessProyectHour": businessProyectHour.value.trim(),
      "owner": owner.value.trim(),
      "docAlternative": docAlternative.value.trim(),
      "hour": hour.value.trim(),
      "judymentPhoto": judymentPhoto.value.trim(),
      "certificationDoc": certificationDoc.value.trim(),
      "productiveProyectHour": productiveProyectHour.value.trim()
    }
    if (change.value === true) {
      data.data = "Creó registro"
      url.value = await postData('/register/addregister', data);
      notifySuccessRequest('Registro creado exitosamente');
    } else {
      data.data = "Editó registro"
      data.idRegister = idRegister.value
      url.value = await putData(`/register/updateregisterbyid/${idRegister.value}`, data);
      notifySuccessRequest('Registro actualizado exitosamente');
    }
    showModal.value = false;
    bring();
    onReset()
  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");
  } finally {
    loading.value = false
    isLoading.value = false; 
  }
}

function onReset() {
  apprentice.value = null
  modality.value = null
  startDate.value = ''
  company.value = ''
  phoneCompany.value = ''
  addressCompany.value = ''
  emailCompany.value = ''
  businessProyectHour.value = null
  owner.value = ''
  docAlternative.value =
  hour.value = null
  judymentPhoto.value = ''
  certificationDoc.value = ''
  productiveProyectHour.value = null
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let register = await getData(`/register/listregisterbyid/${id}`);
    let theRegister = register.listRegisterById
    let apprentices = await getData(`/apprentice/listapprenticebyid/${theRegister.apprentice}`);
    let modalities = await getData(`/modality/listmodalitybyid/${theRegister.modality}`);
    idRegister.value = id
    change.value = false
    apprentice.value = apprentices.listApprenticesById._id
    modality.value = modalities.listModalityById._id
    optionsApprentice.value = [{
      label: `${apprentices.listApprenticesById.firstName} ${apprentices.listApprenticesById.lastName} - ${apprentices.listApprenticesById.numDocument}`,
      value: apprentices.listApprenticesById._id
    }];
    optionsModality.value = [{
      label: modalities.listModalityById.name,
      value: modalities.listModalityById._id
    }];
    startDate.value = theRegister.startDate
    company.value = theRegister.company
    phoneCompany.value = theRegister.phonecompany
    emailCompany.value = theRegister.emailCompany
    addressCompany.value = theRegister.addresscompany
    owner.value = theRegister.owner
    docAlternative.value = theRegister.docAlternative
    certificationDoc.value = theRegister.certificationDoc
    judymentPhoto.value = theRegister.judymentPhoto
    productiveProyectHour.value = theRegister?.productiveProyectHour || null
    businessProyectHour.value = theRegister.businessProyectHour
    hour.value = theRegister.hour
  } else {
    idRegister.value = ''
    change.value = true
  }
}

async function filterApprentice(val, update) {
  let apprentices = await getData('/apprentice/listallapprentice');
  let filteredApprentices = apprentices.listApprentice.filter(
    (apprentice) => apprentice.status === 1
  );
  if (val === '') {
    update(() => {
      optionsApprentice.value = filteredApprentices.map(apprentice => ({
        label: `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.numDocument}`,
        value: apprentice._id
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsApprentice.value = filteredApprentices.map(apprentice => ({
      label: `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.numDocument}`,
      value: apprentice._id
    })).filter(option => option.label.toLowerCase().includes(needle));
  });
}

async function filterModality(val, update) {
  let modality = await getData('/modality/listallmodality');
  let filteredModalities = modality.listAllModalities.filter(
    (modality) => modality.status === 1
  );
  if (val === '') {
    update(() => {
      optionsModality.value = filteredModalities.map(modality => ({
        label: modality.name,
        value: modality._id
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsModality.value = filteredModalities.map(modality => ({
      label: modality.name,
      value: modality._id
    })).filter(option => option.label.toLowerCase().includes(needle));
  });
}
</script>

<style scoped>
.full-width {
  transition: box-shadow 0.3s ease;
}

.full-width:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}
</style>