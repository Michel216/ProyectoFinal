<template>
    <div class="btn">
        <q-btn color="primary" @click="handleClick" :label="label" >
            <slot name="prepend"></slot>
        </q-btn>
    </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';

library.add( faEye);

const props = defineProps({
    label:{
        type:String,
        require:true,
        default:"No tengo texto"
    },
    onClickFunction:{
        type:Function
    }
})

function handleClick (){
    props.onClickFunction()
}

</script>
