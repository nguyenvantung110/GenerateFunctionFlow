<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="template-list">
      <div class="template" v-for="temp in templates" @click="SelectTemplate(temp)">
        <p>{{ temp?.id }}</p>
        <p>{{ temp?.name }}</p>
        <p>{{ temp?.description }}</p>
        <p>{{ temp?.level }}</p>
      </div>
    </div>
    <FunctionFlow :listNodes = "nodes"/>
    <div class="flow-func" v-if="isSelected">
    </div>
  </div>
</template>
<script setup>
  import FunctionFlow from '@/components/FunctionFlow.vue';
  import { ref } from 'vue'

  const nodes = ref(Object)
  const templates = ref()
  const isSelected = ref(false)
  templates.value = [
    {
      id : '1',
      name : 'this is root node',
      description : 'this is desc',
      level : 1,
      childs : Object
    },
    {
      id : '2',
      name : 'this is second node',
      description : 'this is desc',
      level : 1,
      childs : Object
    },
    {
      id : '3',
      name : 'this is third node',
      description : 'this is desc',
      level : 1,
      childs : Object
    },
    {
      id : '4',
      name : 'this is fouth node',
      description : 'this is desc',
      level : 1,
      childs : Object
    }
  ]


  function SelectTemplate(selected){
    nodes.value = selected
    isSelected.value = true
  }
</script>
<style>
  .about{
    width: 100%;
    height: 100%;
  }

  .template-list{
    margin: 0 10%;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(min(268px, 100%), 1fr));
    padding-top: 20px;
  }

  .template {
    border: 2px solid #aaa;
    border-radius: 10px;
    text-align: left;
    padding: 1rem;
    cursor: pointer;
  }

  .template:hover {
    background: #c8e9fc;
  }
</style>
