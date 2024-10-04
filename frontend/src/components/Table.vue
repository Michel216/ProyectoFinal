<template>
    <div>
        <q-table :title="title" :rows="rows" :columns="combinedColumns" row-key="name">
            <template v-slot:body-cell-editar="props">
                <q-td :props="props" class="q-pa-sm">
                    <q-btn class="q-pa-sm" @click="onClickEdit(props.row)">📝</q-btn>
                </q-td>
            </template>
            <template v-slot:body-cell-activar="props">
                <q-td :props="props" v-if="props.row.estado === 1" class="q-pa-sm">
                    <q-btn class="q-pa-sm">❌</q-btn>
                </q-td>
                <q-td :props="props" v-else class="q-pa-sm">
                    <q-btn class="q-pa-sm">✅</q-btn>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'Treats Table'
    },
    rows: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    onClickEdit: {
        type: Function,
        required: true
    }
})

const combinedColumns = computed(() => [
    ...props.columns,
    { name: "editar", label: "Editar", align: "center" },
    { name: "activar", label: "Activar/Desactivar", align: "center", field: "status" }
])
</script>