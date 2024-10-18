<template>
    <div>
        <q-btn color="primary" @click="handleClick" :label="label" />
    </div>
</template>

<script setup>
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