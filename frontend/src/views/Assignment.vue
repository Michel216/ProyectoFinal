<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Asignaciones"></Header>

    <!-- Contenedor de botón, formulario de radio y campo de entrada -->
    <div style="display: flex; align-items: center; justify-content: space-between;  margin: -30px 0">
      <div class="btn" style="display: flex; flex-direction: row;  gap: 10px; margin-left: 10%">
        <Btn :label="btnLabel" :onClickFunction="bringIdAndOpenModal" :loading="loading" />
      </div>
      <!-- Formulario de radio centrado -->
      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div class="text-primary" style="margin-bottom: -30px;">Realizar filtro por</div>
        <!-- Contenedor de los radio buttons y el input, alineados en una fila -->
        <div style="display: flex; flex-direction: row; align-items: center;">
          <!-- Radio buttons -->
          <div style="display: flex; flex-direction: row; align-items: flex-start;">
            <q-radio v-model="selectedValue" val="apprentice" label="Aprendiz" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="followUpInstructor" label="Ins. Seguimiento" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="technicalInstructor" label="Ins. Técnico" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="projectInstructor" label="Ins. Proyecto" dense color="primary"
              @update:model-value="handleFilter" style="margin-right: 10px;" />
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
    <ApprenticeTable :title="title" :rows="filteredRows" :columns="columns" :onToggleActivate="handleToggleActivate"
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
            <q-btn label="Guardar" type="submit" color="primary" class="full-width" />
            <q-btn label="Cerrar" type="reset" icon="close" class="full-width" v-close-popup
              style="background-color: white; color: black; box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);" />
          </div>
        </q-form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
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
let searchTerm = ref("");
let searchLabel = ref('Buscar')
const selectedValue = ref('');

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

const handleFilter = () => {
  if (selectedValue.value === "apprentice") {
    searchLabel.value = "Ingrese el nombre del aprendiz";
  } else  {
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
      console.log(data); // Asegúrate de que `data.register` exista

      // Usar `Promise.all` para esperar a que todas las promesas dentro del `map` se resuelvan
      rows.value = await Promise.all(data.register.map(async (register, idx) => {
        const ficheId = register.apprentice.fiche;
        let ficheData = await getDataRepfora(`/fiches/${ficheId}`);

        // Variables para los instructores
        let followUpInstructor = "";
        let technicalInstructor = "";
        let projectInstructor = "";

        // Recorre el array `assignment` si tiene más de una asignación
        await Promise.all(register.assignment.map(async (assign) => {
          // Solicita los datos de cada instructor
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

        // Retorna el registro con los datos de los instructores
        return {
          ...register,
          apprentice: (register.apprentice.firstName + " " + register.apprentice.lastName),
          fiche: ficheData.data.program.code,
          modality: register.modality.name,
          projectInstructor: projectInstructor, // Datos del instructor de proyecto
          technicalInstructor: technicalInstructor, // Datos del instructor técnico
          followUpInstructor: followUpInstructor, // Datos del instructor de seguimiento
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

.full-width {
  transition: box-shadow 0.3s ease;
}

.full-width:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}
</style>