<template>
  <div class="q-pa-md">
    <TreatsTable :title="'Modalidades'" :columns="columns" :rows="rows" :onClickEdit="openDialog" />
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
  { name: 'name', align: "center", label: 'Nombre', field: 'name', sortable: true },
  { name: 'hourInstructorFollow', align: "center", label: 'Horas del instructor de seguimineto', field: 'hourInstructorFollow' },
  { name: 'hourInstructorTechnical', align: "center", label: 'Horas del instructor técnico', field: 'hourInstructorTechnical' },
  { name: 'hourInstructorProject', align: "center", label: 'Horas del instructor de proyecto', field: 'hourInstructorProject' },
]

const rows = [{
  name: 'Mod 1',
  hourInstructorFollow: '10',
  hourInstructorTechnical: '20',
  hourInstructorProject: '30'
}]

function openDialog(row){
  alert.value=true
  console.log(row);
  
}


</script>