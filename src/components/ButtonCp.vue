<template>
    <button :class="'node node-' + nodeIndex">
        {{ id }} <br> {{name }}
    </button>
    <div v-if="childs?.length" :class="'node-wrap node-wrap-' + level+1">
        <ButtonCp v-for="child in childs" :key="child?.id" v-bind="child" type="child" />
    </div>
</template>

<script setup>
const child = defineProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    nodeIndex: {
        type: Number,
        required: true
    },
    parentId: {
        type: String,
        required: true
    },
    childs: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
</style>
