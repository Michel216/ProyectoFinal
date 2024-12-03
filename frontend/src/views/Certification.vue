<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Certificaciones"></Header>

    <div
      style="display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-end; margin: -30px 0px">

      <div class="q-pa-md q-gutter-sm" style="display: flex; flex-direction: column; align-items: flex-start;">
        <div class="text-primary" style="margin-bottom: -30px;">Realizar filtro por</div>

        <!-- Contenedor de los radio buttons y el input, alineados en una fila -->
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start; width: 100%;">
          <!-- Radio buttons -->
          <div style="display: flex; flex-direction: row; align-items: flex-start; margin-right: 10px;">
            <q-radio v-model="selectedValue" val="fiche" label="Ficha" dense color="primary"
              style="margin-right: 10px;" />
            <q-radio v-model="selectedValue" val="apprentice" label="Aprendiz" dense color="primary"
              style="margin-right: -10px;" />
          </div>

          <!-- Input de búsqueda alineado a la izquierda -->
          <div class="q-pa-md" style="flex-grow: 1; display: flex; justify-content: flex-start;">
            <div class="rounded-input" style=" width: 370px;">
              <q-input class="q-ml-md" v-model="searchTerm" :label="searchLabel" outlined
                :disable="!selectedValue" />
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- <Btn icon="control_point" :label="btnLabel" :onClickFunction="openModalCreate" :loading="loading" /> -->
    <ficheTable :title="title" :columns="columns" :rows="rows"
      @update:loading="(val) => (loading = val)" :loading="loading">
    </ficheTable>

  </div>
</template>

<script setup>
import ficheTable from '../components/tables/SecondTable.vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getDataRepfora } from '../services/apiRepfora.js';
import Header from '../components/header/Header.vue';
import { getData, postData, putData } from '../services/apiClient';
import Btn from "../components/buttons/Button.vue"
import { icon } from '@fortawesome/fontawesome-svg-core';

let loading = ref(false)
const router = useRouter();
const rows = ref([]); // Almacena la respuesta completa
const rowsForTable = ref([]); // Solo los datos de `program` para mostrar en la tabla
let btnLabel = "Crear";
let title = ref("Certificaciones");
let searchTerm = ref("");
let searchLabel = ref('Ingrese el nombre o número de documento')
const selectedValue = ref(''); function radiobtn(evt) {
  const formData = new FormData(evt.target)
  const data = []

  for (const [name, value] of formData.entries()) {
    data.push({ name, value })
  }

  submitResult.value = data
}
const columns = ref([
  {
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  { name: "name", label: "NOMBRE DEL APRENDIZ", align: "center", field: "name" },
  { name: "fiche", label: "FICHA", align: "center", field: "fiche" },
  { name: "code", label: "COD. FICHA", align: "center", field: "code" },
  { name: "statusApprentice", label: "ESTADO", align: "center", field: "statusApprentice" },
  { name: "certificationDoc", label: "DOCUMENTO DE CERTIFICACIÓN", align: "center", field: "certificationDoc" },
  { name: "judymentPhoto", label: "DOCUMENTO DE JUICIO", align: "center", field: "judymentPhoto" }
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  loading.value = true
  try {
    let url = await getData(`/apprentice/listcertificatedapprentice`)
    console.log(url);

    rows.value = await Promise.all(url.listCertificatedApprentice.map(async (apprentice, idx) => {
      const ficheData = await getDataRepfora(`/fiches/${apprentice.fiche}`);
      let register = await getData(`/register/listregisterbyapprentice/${apprentice._id}`)

      console.log(register);
      

      const certificationDocs = register?.data?.map((reg) => reg.register.certificationDoc) || [];

      const judymenthPhotos = register?.data?.map((reg) => reg.register.judymentPhoto) || [];
      

      return {
        ...apprentice,
        name: (apprentice.firstName + " " + apprentice.lastName),
        fiche: ficheData.data.program.name,
        code: ficheData.data.program.code,
        certificationDoc: certificationDocs,
        judymentPhoto: judymenthPhotos,
        index: idx + 1,
      }
    })
    );
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
    }
}


</script>