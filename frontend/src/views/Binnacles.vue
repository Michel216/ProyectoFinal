<template>
  <div class="q-pa-md q-gutter-md">
    <q-btn to="/home" dense unelevated round color="primary" icon="arrow_back" text-color="white" class="iconExit" />
    <h3 class="title-table">Bitacoras</h3>
    <hr id="hr" class="bg-green-9" />
    <div class="q-pa-md q-gutter-sm" style="display: flex">
      <div style="display: flex; justify-content: center;">
        <div class="text-primary">Realizar filtro por</div>
        <q-form @submit="radiobtn" class="q-gutter-md" style="display: flex;">
          <q-radio name="shape" v-model="shape" :val="'apprentice'" label="Instructor" />
          <q-radio name="shape" v-model="shape" :val="'insFollowup'" label="Aprendiz" />
        </q-form>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-md" style="width: 400px">
          <q-input outlined v-model="text" label="Ingrese el nombre o número de documento " />
        </div>
      </div>
    </div>
    <!-- <Btn :label="btnLabel" :onClickFunction="openModalCreate" :loading="loading" /> -->
    <binnacleTable :title="title" :columns="columns" :rows="rows" :options="options"
      :onUpdateStatus="handleUpdateStatus" :loading="loading" :val="true" :onClickFunction="openModalObservations" />
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
            emit-value map-options clearable lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione un instructor']">

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>


          </q-select>

          <q-input outlined type="number" v-model="numBinnacle" label="N° Bitacora" lazy-rules
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
          <!-- <q-select outlined v-model="assignment" label="Seleccione un estado" :options="options" emit-value map-options
            clearable use-input input-debounce="0" behavior="menu" lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione un estado']">

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>


          </q-select> -->
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
          <q-input outlined type="textarea" v-model="observation" label="Observación" lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese una observación']" />


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
          <div v-for="(item, index) in listObservations" :key="index">
            <q-card bordered class="my-card">

              <q-card-section v-if="listObservations.length != 0">
                <p><span class="text-h7">Observación:</span> <span class="text-h7">{{ item.observation
                    }}</span> </p>
                <p><span class="text-h7">Fecha de observación:</span> <span class="text-h7">{{ formatDate(item.observationDate)
                    }}</span>
                </p>
              </q-card-section>
              <q-card-section v-else>
                <p>No hay observaciones para mostrar</p>
              </q-card-section>
            </q-card>
          </div>
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
import { getDataRepfora } from '../services/apiRepfora.js'
import { getData, putData, postData } from "../services/apiClient.js";
import binnacleTable from "../components/tables/SecondTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";
import { formatDate } from "../utils/formatDate.js";
import moment from "moment-timezone"


let loading = ref(false);
let change = ref()
let title = "Bitácoras";
let btnLabel = "Crear ";
let assignment = ref("");
let instructor = ref("");
let numBinnacle = ref("");
let document = ref("");
let observation = ref("");
let observationDate = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
let user = ref("66f1c8f171e7d8e0b4b64050")
let listObservations = ref("")
let idBinnacle = ref("")
const showModalCreate = ref(false);
const showModalObservations = ref(false);
let optionsAssignment = ref();
let optionsInstructor = ref();
const rows = ref([]);
const submitResult = ref([]);

const shape = ref('apprentice')

function radiobtn(evt) {
  const formData = new FormData(evt.target)
  const data = []

  for (const [name, value] of formData.entries()) {
    data.push({ name, value })
  }

  submitResult.value = data
}
let columns = ref([
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
    name: "instructor",
    label: "Instructor",
    align: "center",
    field: "instructor"
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
]);


// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4// valida que el tipo de la bitácora sea de 1 a 4. Programado: 1, Ejecutado: 2, Pendiente: 3, Verificado: 4, Verificado técnico: 5, Verificado proyecto: 6
let options = ref([

  {
    label: "Pendiente",
    value: 1,
  },
  {
    label: "Ejecutada",
    value: 2,
  },
  {
    label: "Verificada",
    value: 3,
  },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData("/binnacles/listallbinnacles");
    console.log(data);
    // let instructors = await getData('http://89.116.49.65:4500/api/instructors');

    rows.value = data.ListAllBinnacles.map((item, idx) => ({
      ...item,
      assignment: (item.assignment.apprentice.firstName + ' ' + item.assignment.apprentice.lastName),
      // instructor: instructors.find((i), i.id === item.instructor).name,
      index: idx + 1,
    }));

    // Verificar que la propiedad 'ListAllBinnacles' exista y sea un array
    if (Array.isArray(data.ListAllBinnacles) && data.ListAllBinnacles.length > 0) {
      rows.value = await Promise.all(data.ListAllBinnacles.map(async (item, idx) => {
        // Obtener los datos del instructor desde su ID
        const instructorId = item.instructor;  // Accedemos al 'instructor' de cada 'item'
        const instructorData = await getDataRepfora(`/instructors/${instructorId}`);  // Obtener datos del instructor por ID
        // console.log(instructorData)

        // Verificar que 'assignment' y 'apprentice' existen antes de acceder a ellos
        const assignmentApprentice = item.assignment && item.assignment.apprentice
          ? item.assignment.apprentice
          : { firstName: 'N/A', lastName: 'N/A' };  // Valores por defecto si no existen

        return {
          ...item,
          assignment: `${assignmentApprentice.firstName} ${assignmentApprentice.lastName}`,  // Concatenar nombres
          instructor: instructorData.data.name,  // Nombre del instructor
          index: idx + 1,  // Índice de la fila
        };
      }));
    } else {
      console.log("El campo 'ListAllBinnacles' no es un array o está vacío.");
      // Puedes también asignar un mensaje de error a la interfaz de usuario si es necesario
    }
  } catch (error) {
    console.log(error);
  }
}




async function handleUpdateStatus(status, row) {
  try {
    let data = await putData(`/binnacles/updatestatus/${row}/${status}`);
    bring();
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true;
  try {
    let data = {
      assignment: assignment.value,
      instructor: instructor.value,
      number: numBinnacle.value,
      document: document.value,
      // observations: [
      //   {
      //     observation: observation.value,
      //     user: "66eb7269c249bb3aaed686e1",
      //     observationDate: observationDate.value,
      //   },
      // ],
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

function onReset() {
  assignment.value = "";
  instructor.value = "";
  numBinnacle.value = "";
  document.value = "";
  observation.value = "";
  observationDate = "";
}

function openModalCreate() {
  showModalCreate.value = true;
}

async function onSubmitObservation() {
  loading.value = true
  try {
    let data = {
      observations: [
        {
          observation: observation.value,
          observationDate:  observationDate,
          user: user.value
        }
      ]
    }
    let url = await putData(`/binnacles/addobservation/${idBinnacle.value}`, data)
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

async function openModalObservations(id, changes) {
  showModalObservations.value = true;
  idBinnacle.value = id
  change.value = changes

  try {
    let data = await getData(`/binnacles/listbinnaclesbyid/${id}`);
    console.log(data);
    listObservations.value = data.listBinnacleById.observations
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
</style>