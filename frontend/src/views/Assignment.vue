<template>
  <div class="q-pa-md q-gutter-md">
    <ApprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate"
      :loading="loading" :onClickEdit="bringIdAndOpenModal" />
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select clearable outlined v-model="fichaRegistro" label="Registro" :options="options"
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

          <q-select clearable outlined v-model="filterInstructorFollowUp" label="Instructor de Seguimiento" use-input input-debounce="0"
            :options="options" @filter="filterInstructorSeguimiento" style="width: 100%; margin-bottom: 20px; border-radius: 8px;" behavior="menu" emit-value
            map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- <q-select clearable outlined v-model="filterInstructorTecnico" use-input input-debounce="0"
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
          </q-select> -->

          <q-input outlined v-model="textCertificacion" label="Documento Certificación" />
          <q-input outlined type="text" v-model="textFotoJudicial" label="Foto Judicial" />

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
import { getData, putData, postData } from '../services/apiClient.js';
import { getDataRepfora } from '../services/apiRepfora'
import ApprenticeTable from '../components/tables/BasicTable.vue';
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "../composables/Notify";

let loading = ref(false)
let title = 'Asignación';
let btnLabel = 'Crear Asignación';
const rows = ref([]);
const showModal = ref(false);
const options = ref(['6709424071e7d8e0b4b778bd', '66eb7269c249bb3aaed686e1']);
const textCertificacion = ref('');
const textFotoJudicial = ref('');
const fichaRegistro = ref('');
const filterInstructorFollowUp = ref('');
const filterInstructorTecnico = ref('');
const filterInstructorProyecto = ref('');

let change = ref() // true: crear, false: modificar
let idAssignment = ref()
const columns = ref([
  { name: 'register', label: 'Registro', align: 'center', field: 'register' },
  { name: 'followInstructor', label: 'Instructor Seguimiento', align: 'center', field: 'followInstructor' },
  { name: 'technicalInstructor', label: 'Instructor Técnico', align: 'center', field: 'technicalInstructor' },
  { name: 'proyectInstructor', label: 'Instructor Proyecto', align: 'center', field: 'proyectInstructor' },
  { name: 'certificationdoc', label: 'Certificado', align: 'center', field: 'certificationdoc' },
  { name: 'judymenthphoto', label: 'Foto Juicio', align: 'center', field: 'judymenthphoto' }
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let data = await getData('/assignment/listallassignment');
    console.log(data);  // Asegúrate de que `data.assignments` exista
    rows.value = data.assignments.map(assignment => {
      return {
        ...assignment,
        register: assignment.register.apprentice,
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleToggleActivate(id, status) {
  try {
    const url = status === 0 ? `/assignment/enableassignmentbyid/${id}` : `/assignment/disableassignmentbyid/${id}`;
    await putData(url);
    bring()
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit() {
  loading.value = true
  try {
    let url = ref()
    let data = {
      "register": fichaRegistro.value,
      "certificationdoc": textCertificacion.value,
      "judymenthphoto": textFotoJudicial.value,
    }
    if (filterInstructorFollowUp != '') data.followInstructor = filterInstructorFollowUp.value
    // if (filterInstructorTecnico != '') data.technicalInstructor = filterInstructorTecnico.value
    // if (filterInstructorProyecto != '') data.proyectInstructor = filterInstructorProyecto.value
    if (change.value === true) {
      url.value = await postData(`/assignment/addassignment`, data)
      notifySuccessRequest('Asignación creado exitosamente');
    } else {
      url.value = await putData(`/assignment/updateassignmentbyid/${idAssignment.value}`, data)
      notifySuccessRequest('Asignación actualizada exitosamente');
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
async function onSubmit() {
  loading.value = true
  try {
    let url = ref()
    let data = {
      "register": fichaRegistro.value,
      "certificationdoc": textCertificacion.value,
      "judymenthphoto": textFotoJudicial.value,
    }
    if (filterInstructorFollowUp != '') data.followInstructor = filterInstructorFollowUp.value
    // if (filterInstructorTecnico != '') data.technicalInstructor = filterInstructorTecnico.value
    // if (filterInstructorProyecto != '') data.proyectInstructor = filterInstructorProyecto.value
    if (change.value === true) {
      url.value = await postData(`/assignment/addassignment`, data)
      notifySuccessRequest('Asignación creado exitosamente');
    } else {
      url.value = await putData(`/assignment/updateassignmentbyid/${idAssignment.value}`, data)
      notifySuccessRequest('Asignación actualizada exitosamente');
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
  fichaRegistro.value = ''
  filterInstructorFollowUp.value = ''
  filterInstructorTecnico.value = ''
  filterInstructorProyecto.value = ''
  textCertificacion.value = ''
  textFotoJudicial.value = ''
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let assignment = await getData(`/assignment/listassignmentbyid/${id}`);
    let theAssignment = assignment.assignment
    idAssignment.value = id
    console.log(id);
    change.value = false
    fichaRegistro.value = theAssignment.register
    filterInstructorFollowUp.value = theAssignment.followInstructor
    filterInstructorTecnico.value = theAssignment.technicalInstructor
    filterInstructorProyecto.value = theAssignment.proyectInstructor
    textCertificacion.value = theAssignment.certificationdoc
    textFotoJudicial.value = theAssignment.judymenthphoto
  } else {
    idAssignment.value = ''
    change.value = true
  }
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let assignment = await getData(`/assignment/listassignmentbyid/${id}`);
    let theAssignment = assignment.assignment
    idAssignment.value = id
    console.log(id);
    change.value = false
    fichaRegistro.value = theAssignment.register
    filterInstructorFollowUp.value = theAssignment.followInstructor
    filterInstructorTecnico.value = theAssignment.technicalInstructor
    filterInstructorProyecto.value = theAssignment.proyectInstructor
    textCertificacion.value = theAssignment.certificationdoc
    textFotoJudicial.value = theAssignment.judymenthphoto
  } else {
    idAssignment.value = ''
    change.value = true
  }
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
            value: register.id
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
    // Llamada a la API para obtener los instructores
    let response = await getDataRepfora('/instructors');
    console.log('Respuesta de la API:', response);
    console.log('response.data:', response.data);  // Aquí verifica el contenido de response.data

    // Comprueba si response.data está definido
    if (response.data && Array.isArray(response.data)) {
      if (val === '') {
        update(() => {
          options.value = response.data.map(instructor => ({
            label: instructor.name,
            value: instructor
          }));
        });
        return;
      }

      // Si hay un valor de búsqueda, filtra los instructores por nombre
      update(() => {
        const needle = val.toLowerCase();
        options.value = response.data
          .map(instructor => ({
            label: instructor.name,
            value: instructor
          }))
          .filter(option => option.label.toLowerCase().includes(needle));
      });
    } else {
      console.error('La respuesta de la API no contiene datos válidos:', response.data);
    }
  } catch (error) {
    // Manejo de errores en la llamada a la API
    console.error('Error al obtener instructores:', error.response ? error.response.data : error);
  }
}


</script>