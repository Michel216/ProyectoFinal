<template>
    <div class="q-pa-md">
        <TreatsTable :label="'Bitácoras'" :columns="columns" :rows="rows"
            :onClickFunction="myClickHandler" />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TreatsTable from './../components/Table.vue'
const columns = [
  { name: 'number', align: "center", label: 'Número de bitácora', field: 'number', sortable: true },
  { name: 'document', align: "center", label: 'Documento', field: 'document' },
  { name: 'observations', align: "center", label: 'Observaciones', field: 'observations' }
]

const rows = []


</script>