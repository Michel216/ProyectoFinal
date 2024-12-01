<template>
    <div>
        <q-table :title="title" :rows="rows" :columns="columns" :loading="loading">
            <template v-slot:body-cell-status="scope">
        <q-td :props="scope">
          <span style="font-size: 110%; color: white; background-color: green; padding:8% 25%; border-radius:5px" v-if="scope.row.status === 1">Activo</span>
          <span style="font-size: 110%; color: white; background-color: red; padding:8% 15%; border-radius:5px" v-else>Inactivo</span>
        </q-td>
      </template>
        </q-table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

let loading = ref(false)
const props = defineProps({
    title: {
        type: String,
        default: 'My Table'
    },
    rows: {
        type: Array,
    },
    columns: {
        type: Array,
    },
    loading: {
        type: Boolean
    }
});
</script>