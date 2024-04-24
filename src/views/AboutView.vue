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
    <!-- <FunctionFlow :listNodes = "nodes"/>-->
    <ParentNode/>
    <div class="flow-func"> 
      {{ arr }}
      <button @click="ChangeValue()">Change</button>
    </div>
  </div>

</template>
<script setup lang="ts">
  import FunctionFlow from '@/components/FunctionFlow.vue';
  import ParentNode from '@/components/ParentNode.vue'
  import { ref, toRefs, watch, watchEffect } from 'vue'

  const nodes = ref(Object)
  const templates = ref()
  const isSelected = ref(false)
  const arr = ref('')
let a = 0
const myReactiveArray = ref([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

  function ChangeValue(){
    //arr.value = arr.value.splice(1,0)
    a= a + 1
    templates.value[0].name = 'tungnv' + a
    myReactiveArray.value[0].name = 'tungnv' + a;
  }



watchEffect(() => {
  const refsArray = toRefs(myReactiveArray.value);
  console.log('Tên của Alice:',refsArray[0].name);
});

  watch(arr, (newValue, oldValue) => {
  console.log('Giá trị mới:', newValue);
},{deep : true});

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
