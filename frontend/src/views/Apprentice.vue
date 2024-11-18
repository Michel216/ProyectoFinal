<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Aprendices"></Header>
    <div class="row items-center">
      <div class="q-mr-md">
        <span class="text-subtitle2">Realizar filtro por</span>

        <!-- Radio buttons -->
        <q-radio v-model="selectedValue" val="fiche" label="Código Ficha" dense color="primary"
          @update:model-value="handleFilter" />
        <q-radio v-model="selectedValue" val="apprentice" label="Aprendiz" dense color="primary"
          @update:model-value="handleFilter" />
        <q-radio v-model="selectedValue" val="status" label="Estado" dense color="primary"
          @update:model-value="handleFilter" />
      </div>

      <!-- Input de búsqueda -->
      <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" @input="handleFilter" outlined
        :disable="!selectedValue" />
    </div>
    <!-- Botón de crear y tabla de aprendices -->
    <Btn :label="btnLabel" :onClickFunction="bringIdAndOpenModal" :loading="loading"  />
    <apprenticeTable :title="title" :rows="filteredRows" :columns="columns" :onToggleActivate="handleToggleActivate"
      :loading="loading" :onClickEdit="bringIdAndOpenModal" />

    <!-- Modal para crear aprendiz -->
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" :label="'CREAR APRENDIZ SENA'">
      <div class="q-pa-md" style="max-width: 600px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 2px;
            column-gap: 20px;
            border-radius: 50px;
            max-width: 100%;
            width: 100vw;
            margin: auto">
                <q-select outlined v-model="fiche" label="Ficha" :options="options"
            emit-value map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterFiche"
            lazy-rules :rules="[(val) => (val && val.length > 0) || 'Por favor, seleccione una ficha']">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
         
          <q-input outlined v-model="firstName" label="Nombres Aprendiz" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el nombre del aprendiz'
          ]" />
          <q-input outlined v-model="lastName" label="Apellidos Aprendiz" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el apellido del aprendiz'
          ]" />
          <q-input outlined v-model="institutionalEmail" label="Email institucional" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el correo personal del aprendiz'
          ]" />
          <q-input outlined v-model="personalEmail" label="Email personal" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el correo personal del aprendiz'
          ]" />
          <q-input outlined type="number" v-model="phone" label="Teléfono" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el teléfono del aprendiz'
          ]" />
          <q-select outlined v-model="tpDoc" label="Tipo de documento" :options="optionsTpDoc" emit-value map-options
            lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Por favor, dígite el tipo de documento'
            ]" />
          <q-input outlined type="number" v-model="numDoc" label="Número de documento" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Por favor, dígite el número de documento'
          ]" />
          <q-select outlined v-model="modality" label="Modalidad Etapa Productiva" :options="optionsModality" emit-value
            map-options clearable use-input input-debounce="0" behavior="menu" @filter="filterModality" lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, dígite la modalidad'
            ]">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        
          <q-btn label="Guardar" type="submit" icon="save" color="primary" class="full-width" :loading="loading" />
          <q-btn label="Cerrar"  type="reset" icon="close"  class="full-width"  v-close-popup
            style="background-color: white; color: black; box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);" />
          
       
        </q-form>
      </div>
    </Modal>
  </div>

</template>


<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { getDataRepfora } from '../services/apiRepfora.js'
import { getData, putData, postData } from "../services/apiClient.js";
import apprenticeTable from "../components/tables/BasicTable.vue";
import Btn from "../components/buttons/Button.vue";
import Modal from "../components/modals/Modal.vue";
import Header from '../components/header/Header.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest, } from "../composables/Notify";
import { useRoute } from 'vue-router';

const options = ref([]);
let loading = ref(false);
let title = "Aprendices";
let btnLabel = "Crear";
let searchTerm = ref("");
let searchLabel = ref('Buscar')
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
const selectedValue = ref('');
const showModal = ref(false);
const route = useRoute();

let change = ref(); // true: crear, false: modificar
const rows = ref([]);
let optionsTpDoc = ref([
  "cédula de ciudadanía",
  "tarjeta de identidad",
  "cédula de extranjería",
]);
const filterOptions = [
  { value: 'apprentice', label: 'Aprendiz' },
  { value: 'fiche', label: 'Ficha' },
  { value: 'status', label: 'Estado' },
];
// let optionsIdFiche = ref(["671016f171e7d8e0b4b7cf5b"]);
let optionsModality = ref([]);
const columns = ref([
  {
    name: "firstName",
    label: "Nombre Aprendiz",
    align: "center",
    field: "firstName",
  },
  {
    name: "tpdocument",
    label: "Tipo Documento",
    align: "center",
    field: "tpdocument",
  },
  {
    name: "numDocument",
    label: "N° Documento",
    align: "center",
    field: "numDocument",
  },
  {
    name: "personalEmail",
    label: "Email Personal",
    align: "center",
    field: "personalEmail",
  },

  {
    name: "phone",
    label: "Teléfono",
    align: "center",
    field: "phone",
  },
  {
    name: "fiche",
    label: "Ficha",
    align: "center",
    field: "fiche",
  },
  {
    name: "code",
    label: "Cod. Ficha",
    align: "center",
    field: "code",
  },
  {
    name: "modality",
    label: "Modalidad",
    align: "center",
    field: "modality",
  },



]);


const handleFilter = () => {
  if (selectedValue.value === "fiche") {
    searchLabel.value = "Ingrese el código de la ficha";
  } else if (selectedValue.value === "apprentice") {
    searchLabel.value = "Ingrese el nombre o número de documento";
  } else if (selectedValue.value === "status") {
    searchLabel.value = "Ingrese el estado";
  } else {
    searchLabel.value = "Buscar";
  }
};
console.log(rows.status)
const filteredRows = computed(() => {
  if (!searchTerm.value) return rows.value;  // Si no hay término de búsqueda, devolver todos los registros

  return rows.value.filter(row => {
    if (selectedValue.value === "fiche") {
      return row.code.toLowerCase().startsWith(searchTerm.value.toLowerCase());  // Filtro por código de ficha
    } else if (selectedValue.value === "apprentice") {
      return row.firstName.toLowerCase().startsWith(searchTerm.value.toLowerCase()) ||
        row.lastName.toLowerCase().startsWith(searchTerm.value.toLowerCase()) ||
        row.numDocument.toLowerCase().startsWith(searchTerm.value.toLowerCase())
    } else if (selectedValue.value === "status") {
      // Compara el estado como texto: "Activo" o "Inactivo"
      const statusText = row.status === 0 ? "Inactivo" :
        row.status === 1 ? "Activo" :
          row.status === 2 ? "En etapa productiva" :
            row.status === 3 ? "Por certificación" :
              row.status === 4 ? "Certificado" : "Desconocido";
      return statusText.toLowerCase().startsWith(searchTerm.value.toLowerCase());  // Compara el texto con el término de búsqueda
    }
    return false;  // Si no hay filtro seleccionado
  });
});


onMounted(async () => {
  loading.value = true;
  try {
    const idFiche = route.query.ficheId
    console.log(idFiche);

    if (idFiche) {
      // Si hay un ID de ficha, filtra por aprendices de esa ficha
      const response = await getData(`/apprentice/listapprenticebyfiche/${idFiche}`);
      console.log(response);

      // // Filtrar los aprendices por ficha
      rows.value = await Promise.all(
        response.listApprenticesByFiche.map(async (apprentice) => {
          const ficheId = apprentice.fiche; // El ID de 'fiche' está en apprentice.fiche
          const ficheData = await getDataRepfora(`/fiches/${ficheId}`);

          return {
            ...apprentice,
            firstName: (apprentice.firstName + " " + apprentice.lastName),
            modality: apprentice.modality.name,
            fiche: ficheData.data.program.name,
            code: ficheData.data.program.code
          };
        })
      );
    } else {
      // Si no hay ID de ficha, muestra todos los aprendices
      bring()
      console.log("error")
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
onBeforeMount(() => {
  bring();
});

async function bring() {
  loading.value = true;
  try {
    let url = await getData("/apprentice/listallapprentice");
    console.log(url);

    // Usamos Promise.all para esperar a que todas las promesas se resuelvan
    rows.value = await Promise.all(
      url.listApprentice.map(async (apprentice) => {
        const ficheId = apprentice.fiche; // El ID de 'fiche' está en apprentice.fiche
        const ficheData = await getDataRepfora(`/fiches/${ficheId}`);

        return {
          ...apprentice,
          firstName: (apprentice.firstName + " " + apprentice.lastName),
          modality: apprentice.modality.name,
          fiche: ficheData.data.program.name,
          code: ficheData.data.program.code
        };
      })
    );
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
async function filterFiche(val, update) {
  try {
    // Llamada a la API para obtener los fiches
    let response = await getDataRepfora("/fiches");

    // Comprueba si response.data está definido y es un arreglo
    if (response.data && Array.isArray(response.data)) {
      if (val === "") {
        update(() => {
          options.value = response.data.map((fiche) => ({
            label: `${fiche.program.name} - ${fiche.program.code} `,  // Muestra el nombre y el código
            value: fiche._id,  // Guarda el ID de la ficha
          }));
        });
        return;
      }

      // Si hay un valor de búsqueda, filtra las fichas por nombre
      update(() => {
        const needle = val.toLowerCase();
        options.value = response.data
          .map((fiche) => ({
            label: `${fiche.program.name} - ${fiche.program.code}`,  // Muestra el nombre y el código
            value: fiche._id,  // Guarda el ID de la ficha
          }))
          .filter((option) => option.label.toLowerCase().includes(needle)); // Filtra por el nombre o código
      });
    } else {
      console.error("La respuesta de la API no contiene datos válidos:", response.data);
    }
  } catch (error) {
    // Manejo de errores en la llamada a la API
    console.error("Error al obtener fiches:", error.response ? error.response.data : error);
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

h3 {
  text-align: center;
  margin-bottom: 0;
  font-weight: bold;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-ml-md {
  margin-left: 16px;
}

.q-mr-md {
  margin-right: 8px;
}
.full-width{
  transition: box-shadow 0.3s ease;
}
.full-width:hover{
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  text-shadow: 0px 0px 10px white;
}

</style>