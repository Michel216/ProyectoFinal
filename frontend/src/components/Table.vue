<template>
    <div class="q-pa-md">
        <q-table :title="label" :rows="rows" :columns="combinedColumns" row-key="name" />
    </div>
</template>

<script setup>
import { ref, computed  } from 'vue'

const props = defineProps({
    label: {
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
    }
})

const combinedColumns = computed(() => [
  ...props.columns,
  { name: 'status', align: "center", label: 'Estado', field: 'status' }
])

</script>