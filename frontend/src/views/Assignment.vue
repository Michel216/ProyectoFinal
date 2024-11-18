<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Asignaciones"></Header>

    <!-- Contenedor de botón, formulario de radio y campo de entrada -->
    <div class="q-pa-md q-gutter-sm" style="display: flex; align-items: center; justify-content: space-between;">

      <!-- Botón en el extremo izquierdo -->
      <!-- <q-btn class="btn" color="green-9" label="Crear" icon="add_circle_outline" style="width: auto" /> -->
      <Btn :label="btnLabel" :onClickFunction="bringIdAndOpenModal" :loading="loading" />

      <!-- Formulario de radio centrado -->
      <div style="display: flex; justify-content: center;">
        <q-form @submit="radiobtn" class="q-gutter-md" style="display: flex;">
          <q-radio name="shape" v-model="shape" :val="'apprentice'" label="Aprendiz" />
          <q-radio name="shape" v-model="shape" :val="'insFollowup'" label="Ins. Seguimiento" />
          <q-radio name="shape" v-model="shape" :val="'insTec'" label="Ins. Técnico" />
          <q-radio name="shape" v-model="shape" :val="'insProyect'" label="Ins. Proyecto" />
        </q-form>
      </div>
      <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 400px">
      <q-input outlined v-model="text" label="Ingrese el nombre o número de documento " />
    </div> 
  </div>
      <q-card
      v-if="submitResult.length > 0"
      flat bordered
      class="q-mt-md"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    >
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
    </div>
   
    <ApprenticeTable :title="title" :rows="rows" :columns="columns" :onToggleActivate="handleToggleActivate"
      :loading="loading" :onClickEdit="bringIdAndOpenModal" />
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="btnLabel">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select clearable outlined v-model="fichaRegistro" label="Registro" :options="options"
            style="width: 100%; margin-bottom: 20px; border-radius: 8px" behavior="menu" emit-value map-options
            lazy-rules>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select clearable outlined v-model="filterInstructorFollowUp" label="Instructor de Seguimiento" use-input
            input-debounce="0" :options="options" @filter="filterInstructorSeguimiento"
            style="width: 100%; margin-bottom: 20px; border-radius: 8px" behavior="menu" emit-value map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

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
import { getData, putData, postData } from "../services/apiClient.js";
import { getDataRepfora } from "../services/apiRepfora";
import ApprenticeTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import {
  notifyErrorRequest,
  notifySuccessRequest,
  notifyWarningRequest,
} from "../composables/Notify";
import Header from '../components/header/Header.vue';
let loading = ref(false);
let title = "Asignación";
let btnLabel = "Crear Asignación";
const rows = ref([]);
const showModal = ref(false);
const options = ref([]);
const textCertificacion = ref("");
const textFotoJudicial = ref("");
const fichaRegistro = ref("");
const filterInstructorFollowUp = ref("");
const filterInstructorTecnico = ref("");
const filterInstructorProyecto = ref("");
const optionsInstructor = ref("");
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
const text = ref('')
let change = ref(); // true: crear, false: modificar
let idAssignment = ref();
const columns = ref([
  {
    name: "index",
    label: "#",
    align: "center",
    field: 'index'
  },
  {
    name: "apprentice",
    label: "NOMBRE APRENDIZ",
    align: "center",
    field: "apprentice",
  },
  {
    name: "fiche",
    label: "PROGRAMA",
    align: "center",
    field: "fiche",
  },
  {
    name: "modality",
    label: "MODALIDAD",
    align: "center",
    field: "modality",
  },
  {
    name: "followUpInstructor",
    label: "INS. SEGUIMIENTO",
    align: "center",
    field: "followUpInstructor",
  },
  {
    name: "technicalInstructor",
    label: "INS. TÉCNICO",
    align: "center",
    field: "technicalInstructor",
  },
  {
    name: "projectInstructor",
    label: "INS. PROYECTO",
    align: "center",
    field: "projectInstructor",
  },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    // Obtén los datos de registros
    let data = await getData("/register/listallregister");
    console.log(data); // Asegúrate de que `data.register` exista

    // Usar `Promise.all` para esperar a que todas las promesas dentro del `map` se resuelvan
    rows.value = await Promise.all(data.register.map(async (register, idx) => {
      const ficheId = register.apprentice.fiche;
      let ficheData = await getDataRepfora(`/fiches/${ficheId}`);
      return {
        ...register,
        apprentice: (register.apprentice.firstName + " " + register.apprentice.lastName),
        fiche: ficheData.data.program.code,
        modality: register.modality.name,
        projectInstructor: register.assignment.map(assign => assign.projectInstructor).join(", "),
        technicalInstructor: register.assignment.map(assign => assign.technicalInstructor).join(", "),
        followUpInstructor: register.assignment.map(assign => assign.followUpInstructor).join(", "),
        index: idx + 1,
      };
    }));

  } catch (error) {
    console.log("Error al cargar los registros:", error);
  }
}


async function handleToggleActivate(id, status) {
  try {
    const url =
      status === 0
        ? `/assignment/enableassignmentbyid/${id}`
        : `/assignment/disableassignmentbyid/${id}`;
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
      register: fichaRegistro.value,
      certificationdoc: textCertificacion.value,
      judymenthphoto: textFotoJudicial.value,
    };
    if (filterInstructorFollowUp != "")
      data.followInstructor = filterInstructorFollowUp.value;
    // if (filterInstructorTecnico != '') data.technicalInstructor = filterInstructorTecnico.value
    // if (filterInstructorProyecto != '') data.proyectInstructor = filterInstructorProyecto.value
    if (change.value === true) {
      url.value = await postData(`/assignment/addassignment`, data);
      notifySuccessRequest("Asignación creado exitosamente");
    } else {
      url.value = await putData(
        `/assignment/updateassignmentbyid/${idAssignment.value}`,
        data
      );
      notifySuccessRequest("Asignación actualizada exitosamente");
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
  fichaRegistro.value = "";
  filterInstructorFollowUp.value = "";
  filterInstructorTecnico.value = "";
  filterInstructorProyecto.value = "";
  textCertificacion.value = "";
  textFotoJudicial.value = "";
}

async function bringIdAndOpenModal(id) {
  showModal.value = true;
  if (id) {
    let assignment = await getData(`/assignment/listassignmentbyid/${id}`);
    let theAssignment = assignment.assignment;
    idAssignment.value = id;
    console.log(id);
    change.value = false;
    fichaRegistro.value = theAssignment.register;
    filterInstructorFollowUp.value = theAssignment.followInstructor;
    filterInstructorTecnico.value = theAssignment.technicalInstructor;
    filterInstructorProyecto.value = theAssignment.proyectInstructor;
    textCertificacion.value = theAssignment.certificationdoc;
    textFotoJudicial.value = theAssignment.judymenthphoto;
  } else {
    idAssignment.value = "";
    change.value = true;
  }
}

// const filterRegister = async (val, update) => {
//   try {
//     let res = await getData("/register/listallregister");
//     console.log("Respuesta de la API:", res);

//     // Verificar si la respuesta tiene la propiedad 'register'
//     if (res && res.register && Array.isArray(res.register)) {
//       if (val === "") {
//         update(() => {
//           options.value = res.register.map((register) => ({
//             label: register.apprentice.firstName,
//             value: register.id,
//           }));
//         });
//         return;
//       }

//       update(() => {
//         const needle = val.toLowerCase();
//         options.value = res.register
//           .map((register) => ({
//             label: register.apprentice.firstName,
//             value: register._id,
//           }))
//           .filter((option) => option.label.toLowerCase().includes(needle));
//       });
//     } else {
//       console.error("La respuesta de la API no contiene datos válidos:", res);
//     }
//   } catch (error) {
//     console.error(
//       "Error al obtener registros:",
//       error.response ? error.response.data : error
//     );
//   }
// };

const filterInstructors = async (val, update) => {
  try {
    // Llamada a la API para obtener los instructores
    let response = await getDataRepfora("/instructors");
    console.log("Respuesta de la API:", response);
    console.log("response.data:", response.data); // Aquí verifica el contenido de response.data

    // Comprueba si response.data está definido
    if (response.data && Array.isArray(response.data)) {
      if (val === "") {
        update(() => {
          optionsInstructor.value = response.data.map((instructor) => ({
            label: instructor.name,
            value: instructor._id,
          }));
        });
        return;
      }

      // Si hay un valor de búsqueda, filtra los instructores por nombre
      update(() => {
        const needle = val.toLowerCase();
        optionsInstructor.value = response.data
          .map((instructor) => ({
            label: instructor.name,
            value: instructor._id,
          }))
          .filter((option) => option.label.toLowerCase().includes(needle));
      });
    } else {
      console.error(
        "La respuesta de la API no contiene datos válidos:",
        response.data
      );
    }
  } catch (error) {
    // Manejo de errores en la llamada a la API
    console.error(
      "Error al obtener instructores:",
      error.response ? error.response.data : error
    );
  }
};
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
  font-weight: bold;
}
</style>