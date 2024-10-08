<template>
    <div>
      <q-table :title="title" :rows="rows" :columns="columns"/>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
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
    }
  });
  
  const toggleActivate = (row) => {
    props.onToggleActivate(row);
    
  }
  </script>