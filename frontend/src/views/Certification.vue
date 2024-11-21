<template>
  <div class="q-pa-md q-gutter-md">
    <Header title="Certificaciones"></Header>

    <ficheTable :title="title" :columns="columns" :rows="rows" :options="options"
      :toggleSeeApprentice="handleViewApprentices">
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

const router = useRouter();
const rows = ref([]); // Almacena la respuesta completa
const rowsForTable = ref([]); // Solo los datos de `program` para mostrar en la tabla
const columns = ref([
  {
    name: "index",
    label: "N°",
    align: "center",
    field: 'index'
  },
  { name: "name", label: "NOMBRE DEL APRENDIZ", align: "center", field: "name" },
  { name: "fiche", label: "PROGRAMA", align: "center", field: "fiche" },
  { name: "code", label: "CODIGO", align: "center", field: "code" },
  // { name: "status", label: "ESTADO", align: "center", field: "status" },
  { name: "statusApprentice", label: "ESTADO", align: "center", field: "statusApprentice" },
  { name: "certificationDoc", label: "DOCUMENTO DE CERTIFICACIÓN", align: "center", field: "certificationDoc" },
  { name: "judymentPhoto", label: "DOCUMENTO DE CERTIFICACIÓN", align: "center", field: "judymentPhoto" },
  // { name: "apprentice", label: "DOCUMENTO DE JUICIO", align: "center", field: "apprentice" },
]);

onBeforeMount(() => {
  bring();
});

async function bring() {
  try {
    let url = await getData(`/apprentice/listcertificatedapprentice`)
    console.log(url);

    rows.value = await Promise.all(url.listCertificatedApprentice.map(async (apprentice, idx) => {
      const ficheData = await getDataRepfora(`/fiches/${apprentice.fiche}`);
      let register = await getData(`/register/listregisterbyapprentice/${apprentice._id}`)

      const certificationDocs = register?.listRegisterByapprentice?.map((reg) => reg.certificationDoc) || [];

      const judymenthPhotos = register?.listRegisterByapprentice?.map((reg) => reg.judymentPhoto) || [];

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
  }
}


</script>