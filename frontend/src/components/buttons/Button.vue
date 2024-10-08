<template>
    <div>
        <q-btn color="primary" @click="handleClick">{{ props.label }}</q-btn>
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
        type:Function,
        require:true
    }
})

function handleClick (){
    props.onClickFunction()
}

</script>