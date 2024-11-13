<template>
    <div>
        <q-table :title="title" :rows="rows" :columns="columns" :loading="loading">
            <template v-slot:body-cell-status="scope">
                <q-td :props="scope">
                    <strong style="color: green" v-if="scope.row.status === 1">Activo</strong>
                    <strong style="color: red" v-else>Inactivo</strong>
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
        required: true,
        default: 'My Table'
    },
    rows: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean
    }
});
</script>