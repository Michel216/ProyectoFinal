<template>
    <div class="q-pa-md">
      <TreatsTable :title="'Bitácoras'" :columns="columns" :rows="rows" :onClickEdit="openDialog" />
      <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
          labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TreatsTable from './../components/Table.vue'

let alert = ref(false)

const columns = [
  { name: 'number', align: "center", label: 'Número de bitácora', field: 'number', sortable: true },
  { name: 'document', align: "center", label: 'Documento', field: 'document' },
  { name: 'observations', align: "center", label: 'Observaciones', field: 'observations' }
]

const rows = [{
  number: 1,
  document: '123456',
  observations: 'Observación 1'

}]

function openDialog(row){
  alert.value=true
  console.log(row);
  
}

</script>