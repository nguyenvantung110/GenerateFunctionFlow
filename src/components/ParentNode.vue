<template>
    <div class="flow-container">
      <div v-for="(step, stepIndex) in steps" :key="stepIndex" class="step-container">
        <div class="step-info-container">
          <div class="step-info">
            <input v-model="step.name" placeholder="Step Name" />
            <textarea v-model="step.description" placeholder="Step Description"></textarea>
          </div>
          <button class="remove-step-btn" @click="removeStep(stepIndex)">Remove</button>
        </div>
        <div class="condition-container">
          <div v-for="(condition, conditionIndex) in step.conditions" :key="conditionIndex" class="condition-item">
            <input v-model="condition.value" placeholder="Condition" />
            <select v-model="condition.type">
              <option value="if">If</option>
              <option value="switch">Switch</option>
            </select>
            <button class="remove-condition-btn" @click="removeCondition(stepIndex, conditionIndex)">Remove</button>
          </div>
          <button class="add-condition-btn" @click="addCondition(stepIndex)">Add Condition</button>
        </div>
        <div class="step-execution-container">
          <button class="execute-step-btn" @click="executeStep(stepIndex)">Execute Step</button>
        </div>
      </div>
      <div class="add-step-container">
        <button class="add-step-btn" @click="addStep(-1)">Add First Step</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const steps = ref([]);
  
  const addStep = (index) => {
    if (index === -1) {
      steps.value.push({ name: '', description: '', conditions: [] });
    } else {
      steps.value.splice(index + 1, 0, { name: '', description: '', conditions: [] });
    }
  };
  
  const removeStep = (index) => {
    steps.value.splice(index, 1);
  };
  
  const addCondition = (index) => {
    steps.value[index].conditions.push({ value: '', type: 'if' });
  };
  
  const removeCondition = (stepIndex, conditionIndex) => {
    steps.value[stepIndex].conditions.splice(conditionIndex, 1);
  };
  
  const executeStep = (index) => {
    // Implement the logic to execute the step
    console.log(`Executing step ${index}`);
  };
  </script>
  
  <style scoped>
  .flow-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }
  
  .step-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
  
  .step-info {
    display: flex;
    flex-direction: column;
  }
  
  .remove-step-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .condition-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
  
  .condition-item {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  
  .remove-condition-btn {
    margin-left: 10px;
  }
  
  .add-condition-btn {
    margin-top: 10px;
  }
  
  .step-execution-container {
    margin-top: 10px;
  }
  
  .add-step-container {
    margin-top: 20px;
  }
  
  .add-step-btn {
    position: relative;
    z-index: 1;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>