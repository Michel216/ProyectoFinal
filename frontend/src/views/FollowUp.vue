<template>
    <div>
        <FollowupTable
        :title="'Seguimientos'"
        :rows="rows"
        :columns="columns"
        />
    </div>
</template>

<script setup>
import { ref } from "vue"
import  FollowupTable from "../components/Table.vue";

const columns = ref([
    { name: 'assignment', label: 'Asignación', align: 'center', field: 'assignment' },
    { name: 'instructor', label: 'Instructor', align: 'center', field: 'instructor' },
    { name: 'number', label: 'Número', align: 'center', field: 'number' },
    { name: 'month', label: 'Mes', align: 'center', field: 'month' },
    { name: 'document', label: 'Documento', align: 'center', field: 'document' },
    { name: 'status', label: 'Estado', align: 'center', field: 'status' },
    { name: 'users', label: 'Usuarios', align: 'center', field: 'users' },
    { name: 'observations', label: 'Observaciones', align: 'center', field: 'observations' }
]);
const rows = ref([
    {
        assignment: "634d3acb2b7d4f001c8f11e8",
        instructor: "634d3acb2b7d4f001c8f11e9",
        number: 1,
        month: "2024-10-01",
        document: "Cédula de ciudadanía",
        status: 1,
        users: "user1@example.com",
        observations: [
            {
                observation: "Primera observación",
                user: "634d3acb2b7d4f001c8f11f0",
                observationDate: "2024-10-05"
            },
            {
                observation: "Segunda observación",
                user: "634d3acb2b7d4f001c8f11f1",
                observationDate: "2024-10-06"
            }
        ]
    },
]);

</script>