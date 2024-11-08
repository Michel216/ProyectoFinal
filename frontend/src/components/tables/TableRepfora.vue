<template>
    <div>
        <q-table :title="title" :rows="rows" :columns="columns" :loading="loading" />
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