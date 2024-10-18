<template>
  <div class="q-pa-md q-gutter-md">
    <Btn :label="btnLabel" :onClickFunction="ClickFunctionOpenModal" />
    <ApprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate" />
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select clearable outlined v-model="fichaRegistro" use-input input-debounce="0" label="Registro"
            :options="options" @filter="filterRegister" style="width: 100%; margin-bottom: 20px; border-radius: 8px;"
            behavior="menu" emit-value map-options lazy-rules>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select clearable outlined v-model="filterInstructorSeguimiento" use-input input-debounce="0"
            label="Instructor de Seguimiento" :options="options" @filter="filterFollowInstructor"
            style="width: 100%; margin-bottom: 20px; border-radius: 8px;" behavior="menu" emit-value map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select clearable outlined v-model="filterInstructorTecnico" use-input input-debounce="0"
            label="Instructor Técnico" :options="options" @filter="filterTechnicalInstructor"
            style="width: 100%; margin-bottom: 20px; border-radius: 8px;" behavior="menu" emit-value map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select clearable outlined v-model="filterInstructorProyecto" use-input input-debounce="0"
            label="Instructor de Proyecto" :options="options" @filter="filterProyectInstructor"
            style="width: 100%; margin-bottom: 20px; border-radius: 8px;" behavior="menu" emit-value map-options
            lazy-rules>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input outlined v-model="textCertificacion" label="Documento Certificación" />
          <q-input outlined type="text" v-model="textFotoJudicial" label="Foto Judicial" />
          <q-input outlined type="text" v-model="textObservacion" label="Observación" />

          <div>
            <q-btn label="Guardar" type="submit" color="primary" />
            <q-btn label="Cerrar" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getData, putData } from '../services/apiClient.js';
import { getDataRepfora } from '../services/apiRepfora'
import ApprenticeTable from '../components/tables/BasicTable.vue';
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";

let title = 'Asignación';
let btnLabel = 'Crear Asignación';
const rows = ref([]);
const showModal = ref(false);
const options = ref([]);
const textCertificacion = ref('');
const textFotoJudicial = ref('');
const textObservacion = ref('');
const fichaRegistro = ref('');
const fichaInstructorSeguimiento = ref('');
const fichaInstructorTecnico = ref('');
const fichaInstructorProyecto = ref('');

const columns = ref([
  { name: 'register', label: 'Registro', align: 'center', field: 'register' },
  { name: 'followInstructor', label: 'Instructor Seguimiento', align: 'center', field: 'followInstructor' },
  { name: 'technicalInstructor', label: 'Instructor Técnico', align: 'center', field: 'technicalInstructor' },
  { name: 'proyectInstructor', label: 'Instructor Proyecto', align: 'center', field: 'proyectInstructor' },
  { name: 'certificationdoc', label: 'Certificado', align: 'center', field: 'certificationdoc' },
  { name: 'judymenthphoto', label: 'Foto Juicio', align: 'center', field: 'judymenthphoto' },
  { name: 'observation', label: 'Observación', align: 'center', field: 'observation' }
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData('/assignment/listallassignment');
    console.log(data);
    rows.value = data.assignments;
  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(rows, status) {
  try {
    const url = status === 0 ? `/assignment/enableassignmentbyid/${rows}` : `/assignment/disableassignmentbyid/${rows}`;
    await putData(url);
    bring();
  } catch (error) {
    console.log(error);
  }
}

function ClickFunctionOpenModal() {
  console.log('modal abierto');
  showModal.value = true;
}

const filterRegister = async (val, update) => {
  try {
    let res = await getData('/register/listallregister');
    console.log('Respuesta de la API:', res);

    // Verificar si la respuesta tiene la propiedad 'register'
    if (res && res.register && Array.isArray(res.register)) {
      if (val === '') {
        update(() => {
          options.value = res.register.map(register => ({
            label: register.apprentice.firstName,
            value: register._id
          }));
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = res.register
          .map(register => ({
            label: register.apprentice.firstName,
            value: register._id
          }))
          .filter(option => option.label.toLowerCase().includes(needle));
      });
    } else {
      console.error('La respuesta de la API no contiene datos válidos:', res);
    }
  } catch (error) {
    console.error('Error al obtener registros:', error.response ? error.response.data : error);
  }
};
const filterInstructorSeguimiento = async (val, update) => {
  try {
    let res = await getDataRepfora('/instructors');
    console.log('Respuesta de la API:', res);

    // Verificar si la respuesta tiene la propiedad 'register'
    if (res && res.instructor && Array.isArray(res.instructor)) {
      if (val === '') {
        update(() => {
          options.value = res.data.map(instructor => ({
            label: instructor.name,
            value: instructor
          }));
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        options.value = res.data
          .map(instructor => ({
            label: instructor.name,
            value: instructor
          }))
          .filter(option => option.label.toLowerCase().includes(needle));
      });
    } else {
      console.error('La respuesta de la API no contiene datos válidos:', res);
    }
  } catch (error) {
    console.error('Error al obtener registros:', error.response ? error.response.data : error);
  }
};




</script>
