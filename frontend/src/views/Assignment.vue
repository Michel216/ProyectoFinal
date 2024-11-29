<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Mis Asignaciones"></Header>

    <!-- Contenedor de botón, formulario de radio y campo de entrada -->
    <div style="display: flex; align-items: center; justify-content: space-between;  margin: -30px 0">
      <div class="btn" style="display: flex; flex-direction: row;  gap: 10px; margin-left: 10%">
        <Btn :icon="icons" :label="btnLabel" :onClickFunction="bringIdAndOpenModal" :loading="loading" v-if="role === 'ADMIN'" />
      </div>
      <!-- Formulario de radio centrado -->
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div class="text-primary" style="margin-bottom: -30px;">Realizar filtro por</div>
        <!-- Contenedor de los radio buttons y el input, alineados en una fila -->
        <div style="display: flex; flex-direction: row; align-items: center;">
          <!-- Radio buttons -->
          <div style="display: flex; flex-direction: row; align-items: flex-start;">
            <q-radio v-model="selectedValue" val="apprentice" label="Aprendiz" dense color="primary"
              @update:model-value="handleFilter"  style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="followUpInstructor" label="Ins. Seguimiento" dense color="primary"
              @update:model-value="handleFilter" v-if="role === 'ADMIN'" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="technicalInstructor" label="Ins. Técnico" dense color="primary"
              @update:model-value="handleFilter" v-if="role === 'ADMIN'" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="projectInstructor" label="Ins. Proyecto" dense color="primary"
              @update:model-value="handleFilter" v-if="role === 'ADMIN'" style="margin-right: 10px;" />
              <q-radio v-model="selectedValue" val="tipeInstructor" label="Tipo Instructor" dense color="primary"
              @update:model-value="handleFilter" v-if="role === 'INSTRUCTOR'" style="margin-right: 10px;"  />          
            </div>

          <div class="q-pa-md">
            <div class="rounded-input" style="width: 350px; ">
              <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" @input="handleFilter" outlined
                :disable="!selectedValue" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
        <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
        <q-separator />
        <q-card-section class="row q-gutter-sm items-center">
          <div v-for="(item, index) in submitResult" :key="index"
            class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap">{{ item.name }} = {{
              item.value }}</div>
        </q-card-section>
      </q-card> -->
    <ApprenticeTable :title="title" :rows="filteredRows" :columns="columns" :onToggleActivate="handleToggleActivate"
      :loading="loading" :onClickEdit="bringIdAndOpenModal" />
      <Modal 
  :isVisible="showModal" 
  @update:isVisible="showModal = $event" 
  :label="btnLabel" 
  :onClickFunction="onReset"
>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <!-- Select para escoger al aprendiz -->
      <q-select 
        outlined 
        v-model="theApprentice" 
        label="Seleccione al aprendiz" 
        :options="optionsApprentice" 
        emit-value 
        map-options 
        clearable 
        use-input 
        input-debounce="0" 
        behavior="menu" 
        @filter="filterApprentice"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
        <template v-slot:prepend>
          <font-awesome-icon icon="fa-solid fa-user-graduate" />
        </template>
      </q-select>

      <!-- Botón de guardar -->
   

      <!-- Inputs dinámicos -->
      <div >
        <q-select 
          v-if="allowedAssignments.includes('followupInstructor')" 
          outlined 
          v-model="filterInstructorFollowUp" 
          :options="optionsInstructor" 
          emit-value 
          map-options 
          clearable 
          use-input 
          @filter="filterInstructors"
          input-debounce="0" 
          behavior="menu" 
          label="Seleccione instructor de seguimiento"
        ></q-select>

        <q-select 
          v-if="allowedAssignments.includes('projectInstructor')" 
          outlined 
          v-model="filterInstructorProyecto" 
          :options="optionsInstructor" 
          emit-value 
          map-options 
          clearable 
          @filter="filterInstructors"
          use-input 
          input-debounce="0" 
          behavior="menu" 
          label="Seleccione instructor de proyecto"
        ></q-select>

        <q-select 
          v-if="allowedAssignments.includes('technicalInstructor')" 
          outlined 
          v-model="filterInstructorTecnico" 
          :options="optionsInstructor" 
          emit-value 
          @filter="filterInstructors"
          map-options 
          clearable 
          use-input 
          input-debounce="0" 
          behavior="menu" 
          label="Seleccione instructor técnico"
        ></q-select> 
        <br>
      </div>
      <!-- <q-btn 
      label="Guardar" 
      type="button" 
      color="primary" 
      class="full-width" 
      @click="onSubmit" 
      :disable="!theApprentice" 
    /> -->
    <q-btn :label="buttonText" @click="onSubmit" color="primary"  :disable="!theApprentice" />
    </q-form>
  </div>
</Modal>

  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, onMounted } from "vue";
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
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserGraduate, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from './../store/useAuth.js'


library.add(faUserGraduate, faChalkboardUser)

const authStore = useAuthStore();
const role = computed(() => authStore.getRole());
let loading = ref(false);
let btnLabel = "Crear Asignación";
let icons="control_point";
const isLoading = ref(false);
const rows = ref([]);
const showModal = ref(false);
const showInputs = ref(false);
const optionsInstructor = ref([]);
const optionsApprentice = ref([]);
// const optionsApprentice = ref("672c279c480b78d5a60ac3ea");
const theApprentice = ref();
const textCertificacion = ref("");
const textFotoJudicial = ref("");
const fichaRegistro = ref("");
const filterInstructorFollowUp = ref("");
const filterInstructorTecnico = ref("");
const filterInstructorProyecto = ref("");
const submitResult = ref([]);
let searchTerm = ref("");
let searchLabel = ref('Buscar')
const selectedValue = ref('');
const assignment = ref([]);
//  const allowedAssignments = ref(['followUpInstructor', 'technicalInstructor', 'projectInstructor']);

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
const columns = computed(() => {
  let baseColumns = [
    {
      name: "index",
      label: "N°",
      align: "center",
      field: 'index'
    },

  ];

  if (role.value === 'INSTRUCTOR') {
    baseColumns.splice(2, 0,

      {
        name: "apprentice",
        label: "NOMBRE APRENDIZ",
        align: "center",
        field: "apprentice",
      },
      {
        name: "numDocument",
        label: "N° DOCUMENTO",
        align: "center",
        field: "numDocument",
      },
      {
        name: "modality",
        label: "MODALIDAD",
        align: "center",
        field: "modality",
      },
      {
        name: "tpInstructor",
        label: "TIPO INSTRUCTOR",
        align: "center",
        field: "tpInstructor",
      },
      {
        name: "binnacles",
        label: "BITACORAS",
        align: "center",
        field: "binnacles",
      },
      {
        name: "followups",
        label: "SEGUIMIENTOS",
        align: "center",
        field: "followups",
      }
    )
  }

  if (role.value === 'ADMIN') {
    baseColumns.splice(4, 0,
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
      })
  }

  return baseColumns;
})

onBeforeMount(() => {
  bring();
});

const handleFilter = () => {
  if (selectedValue.value === "apprentice") {
    searchLabel.value = "Ingrese el nombre del aprendiz";
  } else {
    searchLabel.value = "Ingrese el nombre del instructor";
  };
}
console.log(rows.status)
const filteredRows = computed(() => {
  if (!searchTerm.value) return rows.value;  // Si no hay término de búsqueda, devolver todos los registros
  return rows.value.filter(row => {
    if (selectedValue.value === "followUpInstructor") {
      return row.followUpInstructor.toLowerCase().startsWith(searchTerm.value.toLowerCase());  // Filtro por código de ficha
    } else if (selectedValue.value === "apprentice") {
      return row.apprentice.toLowerCase().startsWith(searchTerm.value.toLowerCase())
    } else if (selectedValue.value === "technicalInstructor") {
      return row.technicalInstructor.toLowerCase().startsWith(searchTerm.value.toLowerCase());
    }
    else if (selectedValue.value === "projectInstructor") {
      return row.projectInstructor.toLowerCase().startsWith(searchTerm.value.toLowerCase());
    }
    return false;  // Si no hay filtro seleccionado
  });
});

async function bring() {
  try {
    // Obtén los datos de registros
    let data = await getData("/register/listallregister");

    // Verifica que `data.register` sea un arreglo
    if (!Array.isArray(data.register)) {
      console.error("Los datos no tienen el formato esperado:", data.register);
      return;
    }

    // Filtra los registros que tienen asignaciones
    const registersWithAssignments = data.register.filter(register =>
      Array.isArray(register.assignment) && register.assignment.length > 0
    );

    console.log("Registros con asignaciones:", registersWithAssignments);

    // Procesa solo los registros con asignaciones
    rows.value = await Promise.all(registersWithAssignments.map(async (register, idx) => {
      const ficheId = register.apprentice.fiche;
      let ficheData = await getDataRepfora(`/fiches/${ficheId}`);

      // Variables para los instructores
      let followUpInstructor = "";
      let technicalInstructor = "";
      let projectInstructor = "";

      // Recorre el array `assignment` para obtener datos de los instructores
      await Promise.all(register.assignment.map(async (assign) => {
        if (assign.followUpInstructor) {
          let followData = await getDataRepfora(`/instructors/${assign.followUpInstructor}`);
          followUpInstructor = followData.data.name;
        }

        if (assign.technicalInstructor) {
          let technicalData = await getDataRepfora(`/instructors/${assign.technicalInstructor}`);
          technicalInstructor = technicalData.data.name;
        }

        if (assign.projectInstructor) {
          let projectData = await getDataRepfora(`/instructors/${assign.projectInstructor}`);
          projectInstructor = projectData.data.name;
        }
      }));

      // Retorna el registro con los datos procesados
      return {
        ...register,
        apprentice: (register.apprentice.firstName + " " + register.apprentice.lastName),
        fiche: ficheData.data.program.code,
        modality: register.modality.name,
        projectInstructor: projectInstructor,
        technicalInstructor: technicalInstructor,
        followUpInstructor: followUpInstructor,
        index: idx + 1,
      };
    }));
  } catch (error) {
    console.error("Error al cargar los registros:", error);
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
const allowedAssignments = ref([]);

const buttonText = ref("") 
// computed(() => {
//   return assignment.value.length > 0 ? 'Asignar' : 'Guardar';
// });

const onSubmit = async () => {
  loading.value = true;
  isLoading.value = true;

  allowedAssignments.value = [];
 

  console.log("resApp", theApprentice.value);
  const apprenticeId = theApprentice.value;

  try {
  if(assignment.value.length > 0){
    buttonText.value = "Guardar"
    const assignmentData = {
      apprentice: theApprentice.value,

    };
    if (filterInstructorFollowUp != "") assignmentData.followInstructor = filterInstructorFollowUp.value;
      if (filterInstructorTecnico != "") assignmentData.technicalInstructor = filterInstructorTecnico.value;
      if (filterInstructorProyecto != "") assignmentData.proyectInstructor = filterInstructorProyecto.value;

      // Si el cambio es verdadero, realizamos la creación o actualización

console.log(assignmentData)
        const url = await putData(`/register/addassignment`, assignmentData)
        notifySuccessRequest("Asignación Creada")
  }else{
      buttonText.value = "Asignar"
    const response = await getData(`register/listregisterbyapprentice/${apprenticeId}`);

    // Acceder directamente a la propiedad 'data' en la respuesta
    const data = response.data; // Esto obtiene el array que buscas

    console.log("Contenido de data:", data);

    if (Array.isArray(data) && data.length > 0) {
      console.log("Primer elemento de data:", data[0]);

      if (data[0]?.allowedAssignments ) {
        for (let index = 0; index < data[0].allowedAssignments.length; index++) {
          allowedAssignments.value.push(data[0].allowedAssignments[index])
          
        }
        console.log("Allowed Assignments actualizado:", allowedAssignments.value);
      } else {
        console.error("El primer elemento no contiene 'allowedAssignments'.");
        allowedAssignments.value = [];
      }
    } else {
      console.error("No se encontraron registros válidos en 'data'.");
      allowedAssignments.value = [];
    }}
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    allowedAssignments.value = [];
  } finally {
    loading.value = false;
    isLoading.value = false;
  }
};


function onApprenticeSelected() {
  if (theApprentice.value) {
    showInputs.value = true; // Activa los inputs
  }
}

// Ejecutar la función al montar el componente
onMounted(() => {
  onSubmit();
});

// async function onSubmit() {
//   loading.value = true;
//   isLoading.value = true;
//   try {
//     let url = ref();
//     let data = {
//       register: fichaRegistro.value,
//       certificationdoc: textCertificacion.value,
//       judymenthphoto: textFotoJudicial.value,
//     };
//     if (filterInstructorFollowUp != "")
//       data.followInstructor = filterInstructorFollowUp.value;
//     // if (filterInstructorTecnico != '') data.technicalInstructor = filterInstructorTecnico.value
//     // if (filterInstructorProyecto != '') data.proyectInstructor = filterInstructorProyecto.value
//     if (change.value === true) {
//       url.value = await postData(`/assignment/addassignment`, data);
//       notifySuccessRequest("Asignación creado exitosamente");
//     } else {
//       url.value = await putData(
//         `/assignment/updateassignmentbyid/${idAssignment.value}`,
//         data
//       );
//       notifySuccessRequest("Asignación actualizada exitosamente");
//     }
//     showModal.value = false;
//     bring();
//     onReset();
//   } catch (error) {
//     console.log(error);
//     notifyErrorRequest(
//       error?.response?.data?.errors?.[0]?.msg || "Error desconocido"
//     );
//   } finally {
//     loading.value = false;
//     isLoading.value = false;
//   }
// }

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
    let assignment = await getData(`/register/addassignment`);
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

const filterApprentice = async (val, update) => {
  try {
    // Llamada a la API para obtener los datos
    let response = await getData("/register/listallregister");

    // Verifica si la respuesta contiene un arreglo en la propiedad register
    if (response.register && Array.isArray(response.register)) {
      // Extrae todos los apprentices del arreglo response.register, asegurándote de que existan
      const allApprentices = response.register
        .filter(item => item.apprentice && item.apprentice.firstName) // Validación
        .map(item => item.apprentice);

      if (val === "") {
        // Actualiza las opciones con todos los apprentices
        update(() => {
          optionsApprentice.value = allApprentices.map(apprentice => ({
            label: (apprentice.firstName + " " + apprentice.lastName),
            value: apprentice._id,
          }));
        });
        return;
      }

      // Si hay un valor de búsqueda, filtra los apprentices por nombre
      update(() => {
        const needle = val.toLowerCase();
        optionsApprentice.value = allApprentices
          .map(apprentice => ({
            label: (apprentice.firstName + " " + apprentice.lastName),
            value: apprentice._id,
          }))
          .filter(option => option.label && option.label.toLowerCase().includes(needle)); // Validación
      });
    } else {
      console.error(
        "La respuesta de la API no contiene datos válidos en 'register':",
        response.register
      );
    }
  } catch (error) {
    // Manejo de errores en la llamada a la API
    console.error(
      "Error al obtener apprentices:",
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

.full-width {
  transition: box-shadow 0.3s ease;
}

.full-width:hover {

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}
</style>