<template>
    <div class="data-list">
        <div v-if="index > 0" class="connect-line">
            <button class="add-btn">+</button>
        </div>
        <button class="step-button">
            <button v-if="!isTemplate" class="delete-btn">x</button>
            <span>{{ name }}</span>
        </button>
        <div v-if="children?.length" class="sub-item">
            <ButtonCp v-for="(child,subIndex) in children" :key="subIndex" v-bind="child" type="child" :index="subIndex" />
        </div>
    </div>
</template>

<script setup lang="ts">

const child = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isTemplate: {
        type: Boolean,
        required: true
    },
    details: {
        type: Array,
        required: true
    },
    children: {
        type: Array,
        require : false
    },
    index :{
        type:Number,
        require:false
    }
})
</script>

<style scoped>
    .step-button{
        border: 1px solid #aaa;
        border-radius: 5px;
        padding: 1rem;
        width: 100%;
    }

    .sub-item {
        padding-left: 4rem;
        position: relative;
    }

    .sub-item::before {
        content: '';
        height: 100%;
        width: 1px;
        background: #aaa;
        position: absolute;
        top:0;
        left: 2rem;
    }
</style>
