<template>
    <div class="q-pa-md q-gutter-sm" style="display: flex">
      <div style="display: flex; justify-content: center;">
        <div class="text-primary">Realizar filtro por</div>
        <q-form @submit.prevent="emitFilter" class="q-gutter-md" style="display: flex;">
          <q-radio
            v-for="option in filterOptions"
            :key="option.value"
            name="shape"
            v-model="localShape"
            :val="option.value"
            :label="option.label"
            @update:model-value="emitFilter"
          />
        </q-form>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-md" style="width: 400px">
          <!-- Aquí pasamos inputLabel directamente como string -->
          <q-input
            outlined
            v-model="localText"
            :label="inputLabel"  
            @input="updateFilter"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    filterOptions: {
      type: Array,
      required: true,
    },
    initialShape: {
      type: String,
      default: '',
    },
    initialText: {
      type: String,
      default: '',
    },
    inputLabel: {
      type: String,
      required: true,
    },
  });
  
  const localShape = ref(props.initialShape);
  const localText = ref(props.initialText);
  
  const emit = defineEmits(['filter']);
  
  const emitFilter = (newValue) => {
    emit('filter', newValue);  // Emitir el valor seleccionado al componente padre
  };
  
  function updateFilter() {
    emit('filter', { shape: localShape.value, text: localText.value });
  }
  
  watch([localShape, localText], () => {
    updateFilter();
  });
  </script>
  