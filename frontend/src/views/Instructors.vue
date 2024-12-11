<template>
    <div class="q-pa-md q-gutter-md">
        <TableRepfora :title="title" :columns="columns" :rows="rows" :loading="loading" />
    </div>
</template>
<script setup>
import TableRepfora from '../components/tables/TableRepfora.vue';
import { ref, onBeforeMount } from "vue";
import { getData, putData, postData } from "../services/apiClient.js";
import {
    notifyErrorRequest,
    notifySuccessRequest,
    notifyWarningRequest,
} from "../composables/Notify";

let title = 'Instructores'
let rows = ref([])
let loading = ref(false)
const columns = ref([
    {
        name: "name",
        label: "Nombre del instructor",
        align: "center",
        field: "name",
    },
    {
        name: "tpdocument",
        label: "Tipo Documento",
        align: "center",
        field: "tpdocument",
    },
    {
        name: "numdocument",
        label: "N° Documento",
        align: "center",
        field: "numdocument",
    },
    {
        name: "emailpersonal",
        label: "Email Personal",
        align: "center",
        field: "emailpersonal",
    },
    {
        name: "email",
        label: "Email Institucional",
        align: "center",
        field: "email",
    },
    {
        name: "phone",
        label: "Teléfono",
        align: "center",
        field: "phone",
    },
    {
        name: "knowledge",
        label: "Conocimiento",
        align: "center",
        field: "knowledge",
    },
    {
        name: "thematicarea",
        label: "Área temática",
        align: "center",
        field: "thematicarea",
    },
    {
        name: "bindingtype",
        label: "Tipo de enlace",
        align: "center",
        field: "bindingtype",
    },
    {
        name: "caphour",
        label: "Hora límite",
        align: "center",
        field: "caphour",
    },
    {
        name: "hourswork",
        label: "Horas de trabajo",
        align: "center",
        field: "hourswork",
    },
    {
        name: "status",
        label: "Estado",
        align: "center",
        field: "status",
    },
]);

onBeforeMount(() => {
    bring();
});

async function bring() {
    loading.value = true;
    try {
        let url = await getData("http://89.116.49.65:4500/api/instructors");
        rows.value = url
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

</script>