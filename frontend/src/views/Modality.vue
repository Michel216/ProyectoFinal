<template>
    <div class="q-pa-md">
        <TreatsTable :label="'Modalidades'" :columns="columns" :rows="rows"
            :onClickFunction="myClickHandler" />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TreatsTable from './../components/Table.vue'
const columns = [
  { name: 'name', align: "center",label: 'Nombre', field: 'name', sortable: true },
  { name: 'hourInstructorFollow', align: "center",label: 'Horas del instructor de seguimineto', field: 'hourInstructorFollow' },
  { name: 'hourInstructorTechnical', align: "center",label: 'Horas del instructor técnico', field: 'hourInstructorTechnical' },
  { name: 'hourInstructorProject', align: "center",label: 'Horas del instructor de proyecto', field: 'hourInstructorProject' }
]

const rows = []


</script>