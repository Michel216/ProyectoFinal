<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog :model-value="isVisible" @update:model-value="(val) => emits('update:isVisible', val)" persistent>
            <q-card>
                <q-card-section class="bg-primary row items-center">
                    <div class="text-h6 text-white" >{{ label }}</div>
                </q-card-section>

                <q-card-section>
                    <slot></slot>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['update:isVisible']);


function onSubmit() {
    console.log('Formulario enviado');
    emits('update:isVisible', false);
}
</script>



<!-- <template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog :model-value="isVisible" @update:model-value="(val) => emits('update:isVisible', val)" persistent>
            <q-card>
                <q-card-section class="bg-primary row items-center">
                    <div class="text-h6 text-white">{{ props.label }}</div>
                    <q-space />
                    <q-btn class="text-white" icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-card-section>
                    <div class="q-pa-md" style="max-width: 400px">
                        <q-form @submit="onSubmit" class="q-gutter-md">
                            <div>
                                <q-btn label="Submit" type="submit" color="primary" />
                                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </q-form>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    }
});


// let age = ref('');
// let accept = ref(false);

const emits = defineEmits(['update:isVisible']);

function onSubmit() {
    console.log('Formulario enviado');
    emits('update:isVisible', false);
}

</script> -->