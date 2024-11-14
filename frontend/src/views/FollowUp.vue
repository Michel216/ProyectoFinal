<template>
  <div class="q-pa-md q-gutter-md">
    <router-link to="/home" class="iconExit" style="display: flex; text-decoration: none;">
      <q-btn dense unelevated round color="primary" icon="arrow_back" text-color="white" />
    </router-link>
    <h3 class="title-table">Seguimientos</h3>
    <hr id="hr" class="bg-green-9" />

    <Btn :label="btnLabel" :onClickFunction="openModalCreate" :loading="loading" />

    <FollowupTable :title="title" :columns="columns" :rows="rows" :options="options"
      :onUpdateStatus="handleUpdateStatus" :onClickFunction="openModalObservations" />

    <Modal :isVisible="showModalCreate" @update:isVisible="showModalCreate = $event"
      :label="'DILIGENCIA LA INFORMACION'">

      <div class="q-pa-md" style="max-width: 600px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="
            max-height: none;
            max-width: 100%;
            width: 100vw;
            margin: auto;
           
            gap: 20px;
            border-radius: 50px;
          ">

          <q-select outlined v-model="assignment" label="Seleccione una asignación" :options="optionsAssignment"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterAssignment"
            lazy-rules :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione una asignación']">

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>


          </q-select>

          <q-select outlined v-model="instructor" label="Seleccione un instructor" :options="optionsInstructor"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterInstructor"
            lazy-rules :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione un instructor']">

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>


          </q-select>

          <q-input outlined v-model="month" label="Fecha inicial" mask="date"
            :rules="[val => val && val.length > 0 || 'Por favor, dígite la fecha inicio']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="month" today-btn>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input outlined type="number" v-model="numFollowUp" label="N° seguimiento" lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, dígite el número de la bitácora']">
            <template v-slot:prepend>
              <q-icon name="123" />
            </template>
          </q-input>

          <q-input outlined v-model="document" label="Documento" lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese un documento']">
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <div class="q" style="display: flex; justify-content: center; align-items: center;">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />

            <q-btn label="Cerrar" type="reset" icon="close" flat class="q-ml-sm" v-close-popup style="
      background-color: white;
      color: black;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    " />
          </div>
        </q-form>
      </div>
    </Modal>
    <Modal :isVisible="showModalObservations" @update:isVisible="showModalObservations = $event"
      :label="'OBSERVACIONES'">
      <div class="q-pa-md" style="max-width: 600px">
        <q-form v-if="!change" @submit="onSubmitObservation" @reset="onReset" class="q-gutter-md" style="
            max-height: none;
            max-width: 100%;
            width: 100vw;
            margin: auto;
           
            gap: 20px;
            border-radius: 50px;
          ">
          <q-input outlined v-model="observation" label="Observación" lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese una observación']" />

            <q-select outlined v-model="user" label="Seleccione un usuario" :options="optionsInstructor"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterInstructor"
            lazy-rules :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione un usuario']">

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>


          </q-select>
          <q-input outlined v-model="observationDate" label="Fecha de observación" mask="date"
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese la fecha de la observación']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="observationDate" today-btn>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="q" style="display: flex; justify-content: center; align-items: center;">
            <q-btn label="Guardar" type="submit" icon="save" color="primary" :loading="loading" />

            <q-btn label="Cerrar" type="reset" icon="close" flat class="q-ml-sm" v-close-popup style="
      background-color: white;
      color: black;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    " />
          </div>
        </q-form>
        <q-form v-if="change" @submit="onSubmitObservation" @reset="onReset" class="q-gutter-md" style="
            max-height: none;
            max-width: 100%;
            width: 100vw;
            margin: auto;
           
            gap: 20px;
            border-radius: 50px;
          ">
          <p>{{ listObservations }}</p>
          <div class="q" style="display: flex; justify-content: center; align-items: center;">

            <q-btn label="Cerrar" type="reset" icon="close" flat class="q-ml-sm" v-close-popup style="
      background-color: white;
      color: black;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
    " />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData, postData } from "../services/apiClient.js";
import FollowupTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest } from "../composables/Notify";
import { formatMonth } from "../utils/formatMonth.js";

const title = "Seguimientos";
const rows = ref([]);
let loading = ref(false);
let change = ref()
let btnLabel = "Crear";
let assignment = ref("");
let instructor = ref("");
let numFollowUp = ref("");
let document = ref("");
let month = ref("")
let observation = ref("");
let observationDate = ref("");
let user = ref("")
let showModalCreate = ref(false);
let showModalObservations = ref(false);
let listObservations = ref([])
let idFollowUp = ref("")
let optionsAssignment = ref();
let optionsInstructor = ref();
const columns = ref([
  { name: "index", label: "#", align: "center", field: 'index' },
  { name: "register", label: "Etapa Productiva Asignada", align: "center", field: "register" },
  { name: "number", label: "N° Seguimiento", align: "center", field: "number" },
  {
    name: "options",
    label: "Estado",
    align: "center",
    field: "status"
  },
  { name: "observations", label: "Observaciones", align: "center", field: "observations" },
  { name: "options", label: "Estado", align: "center", field: "status" },
  { name: "month", label: "Mes", align: "center", field: "month" }
]);


// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4, Verificado técnico: 5, Verificado proyecto: 6
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
  try {
    const data = await getData("/followup/listallfollowup");
    console.log(data);

    rows.value = data.listallFollowup.map((followup, idx) => ({
      ...followup,
      register: (followup.assignment.apprentice.firstName + ' ' + followup.assignment.apprentice.lastName),
      month: formatMonth(followup.month),
      index: idx + 1,
    }));
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateStatus(status, row) {
  try {
    await putData(`/followup/updatestatus/${row}/${status}`);
    bring();
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true;
  try {
    const data = {
      assignment: assignment.value,
      instructor: instructor.value,
      number: numFollowUp.value,
      document: document.value,
      month: month.value
    };
    await postData(`/followup/addfollowup`, data);
    notifySuccessRequest("Seguimiento creado exitosamente");
    showModalCreate.value = false;
    bring();
    onReset();
  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");
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
          observation: observation.value,
          observationDate: observationDate.value,
          user: user.value
        }
      ]
    }
    let url = await putData(`/followup/addobservation/${idFollowUp.value}`, data)
    notifySuccessRequest("Observación guardada exitosamente");
    showModalObservations.value = false;
    bring();
    onReset();
  } catch (error) {
    console.log(error);
    notifyErrorRequest(error?.response?.data?.errors?.[0]?.msg || "Error desconocido");
  } finally {
    loading.value = false
  }
}

function onReset() {
  assignment.value = "";
  instructor.value = "";
  numFollowUp.value = "";
  document.value = "";
  month.value = "";
  observation.value = "";
  observationDate.value = "";
  user.value = "";
  idFollowUp.value = ""
}

function openModalCreate() {
  showModalCreate.value = true;
}


async function openModalObservations(id, changes) {
  showModalObservations.value = true;
  idFollowUp.value = id
  change.value = changes

  try {
    let data = await getData(`/followup/listfollowupbyid/${id}`);
    console.log(data);
    listObservations.value = data.listFollowupById.observations
    console.log(listObservations.value);

  } catch (error) {
    console.log(error);
  }
}

async function filterAssignment(val, update) {
  let assignment = await getData('/register/listallregister');
  console.log(assignment);

  let theAssignment = assignment.register;
  if (val === "") {
    update(() => {
      optionsAssignment.value = theAssignment.map((assignment) => ({
        label: assignment.apprentice.numDocument,
        value: assignment._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsAssignment.value = theAssignment
      .map((assignment) => ({
        label: assignment.apprentice.numDocument,
        value: assignment._id,
      }))
      .filter((option) => option.label.toLowerCase().includes(needle));
  });
}

async function filterInstructor(val, update) {
  let instructor = await getData('http://89.116.49.65:4500/api/instructors');
  console.log(instructor);
  if (val === "") {
    update(() => {
      optionsInstructor.value = instructor.map((instructor) => ({
        label: instructor.name,
        value: instructor._id,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsInstructor.value = instructor.map((instructor) => ({
      label: instructor.name,
      value: instructor._id,
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

  .observation-box {
    background-color: #f9f9f9; /* Fondo gris claro */

    padding: 10px; /* Espaciado interno */
    margin-bottom: 10px; /* Espaciado entre los cuadros */
    border-radius: 8px; /* Bordes redondeados */

  }
</style>