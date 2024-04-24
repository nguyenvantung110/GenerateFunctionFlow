<template>
    <div class="funtion-flow">
        <div class="main-flow">
            <div class="step-flow">
                <div class="data-list" v-for="(item, index) in datas" :key="item.id" v-indent="item.level">
                    <div v-if="(item.level !== 1 || IsParentNodeAfterBranch(index,item)) && !item.isRenderItem"
                         :class="[{'connect-line' : item.level < 2 || IsSecondNodeOfBranch(index,item)},{'branch-connect-line' : IsFirstNodeOfBranch(index,item)}]">
                        <button class="add-btn" @click="AddNewStep(index,true,item)">+</button>
                    </div>
                    <button v-if="!item.isRenderItem" class="step-btn" :class="{'new-step' : !item.isTemplate}" @click="showDetails(index,item)" @focus="handleFocus($event)" @blur="handleBlur()">
                        {{ item?.name }} ---- {{ item.level }}
                        <button v-if="!item.isTemplate" class="delete-btn" @click="deleteItem(index)">x</button>
                    </button>
                    <div v-if="CheckNextElement(index,item)" class="connect-line">
                        <button class="add-btn" @click="AddNewStep(index,false,item)">+</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="step-details">
            <div class="template-info">
                This is template infomation
            </div>
            <div class="step-info" v-if="selectedStep">
                <p v-if="!selectedStep[0].isTemplate">Add a component</p>
                <div class="template-list" :class="{'details-new-item':!item.isTemplate}" v-for="item in selectedStep" :key="item.id">
                    <h4>{{ item?.name }}</h4>
                    <div class="step-details-info">
                        <div v-for="subItem in item?.details" :key="subItem.detailsId">
                            <div class="step-details-input" v-if="item.isTemplate">
                                <label for="">{{ subItem?.detailsName }}</label>
                                <input type="text" v-model="subItem.description">
                            </div>
                            <div v-else>
                                <button @click="AssignItem(index,item)">
                                    <span>{{ subItem?.detailsName }}</span>
                                    <span>{{ subItem?.description }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import {masterDatas,masterTemplateData, details, Step} from './data/data'

  const datas = ref<Step[]>([])
  datas.value = masterDatas.value

  const templateData = ref<Step[]>([])
  templateData.value = masterTemplateData.value

function ReRenderList(items : Step[]) {
  let result = [];
  items = items.filter(x => x.isRenderItem === false)
  for(let i = 0 ; i < items.length; i ++)
  {
    result.push(items[i])

    if( Math.abs(items[i]?.level - items[i+1]?.level) > 1)
    {
      if(items[i]?.level < items[i+1]?.level)
      {
        for(let j : number = items[i]?.level + 1; j < items[i+1]?.level; j++)
        {
          const newItem : Step = {
            level: j,
            id: 0,
            name: 'Add Item',
            category: '',
            isTemplate: true,
            isRenderItem: true,
            details: [],
            isIfStep: false
          }
          result.push(newItem)
        }
      }
      else{
        for(let j : number = items[i]?.level - 1; j > items[i+1]?.level; j--)
        {
          const newItem : Step = {
            level: j,
            id: 0,
            name: 'Add Item',
            category: '',
            isTemplate: true,
            isRenderItem: true,
            details: [],
            isIfStep: false
          }
          result.push(newItem)
        }
      }
    }
  }

  datas.value = result
}

function AddNewStep(index : any,isTop : boolean,item : Step){
    console.log(isTop,item.name)
    let level :number;

    level = isTop && datas.value[index-1].level < item.level ? datas.value[index-1].level :item.level;

    const newItem = new Step(index + 1,`___New Item ${index + 2}`,'cat3',false,false,false,level,
        [
            {
                detailsId : 1,
                detailsName : 'New Details --- 1',
                description : ''
            },
            {
                detailsId : 2,
                detailsName : 'New Details --- 2',
                description : ''
            }
        ]
    )

    if(isTop)
    {
        datas.value.splice(index,0,newItem)
    }
    else{
        datas.value.splice(index + 1,0,newItem)
    }

    // ReRenderList(datas.value)
  }

  function deleteItem(index : any){
    const res = confirm('Are you sure you want to delete this step?')
    if(res)
    {
        // datas.value.splice(index ,1)
        for(let i = index + 1;i< datas.value.length; i++){
            if(datas.value[i].level <= datas.value[index].level){
                break
            }

            datas.value[i].level = datas.value[i].level -1
        }
        datas.value.splice(index ,1)
        ReRenderList(datas.value)
    }

    console.log('after delete',datas.value)
  }

  const selectedStep = ref<Step[]>()
  const activeStep = ref(-1)

  function showDetails(index:number,val : Step){
    activeStep.value = index

    if(val.isTemplate)
    {
        selectedStep.value = []
        selectedStep.value.push(val)
    }
    else{
        selectedStep.value = templateData.value
    }
  }

  function IsFirstNodeOfBranch(index : number,item : Step){
    return index > 0 && item?.level > datas.value[index-1]?.level;
  }

  function CheckNextElement(index : number,item: Step){
    return index < datas.value.length-1 && item.level >= datas.value[index + 1].level;
  }

  function IsSecondNodeOfBranch(index:number , item : Step)
  {
    if(index <=0)
    {
        return false;
    }

    let isFirstParentNode = false;
    let isSecondParentNode = false;
    for(let i = index ; i >= 0; i --)
    {
        if(datas.value[i].level < item.level)
        {
            break;
        }

        if(datas.value[index-1].level > item.level)
        {
            isSecondParentNode = true;
        }

        isFirstParentNode = IsFirstNodeOfBranch(i,datas.value[i])
    }

    return isFirstParentNode === true && isSecondParentNode === true;
  }


  function IsParentNodeAfterBranch(index :number , item : Step)
  {
    return index > 0 && item.level < datas.value[index-1].level
  }

  function AssignItem(index: number, item: Step)
  {
    const currentLevel = ref(datas.value[activeStep.value].level)
    let isIfStep = datas.value[activeStep.value].isIfStep

    if(item.isIfStep && isIfStep === false){
        currentLevel.value = currentLevel.value + 1
        isIfStep = true
    }

    const newItem = new Step(item.id,item.name,item.category,false,false,isIfStep,currentLevel.value,item.details)

    datas.value[activeStep.value] = newItem

    ReRenderList(datas.value)
  }

  // Add css animation when focus and blur
  let eventObj : any;
  function handleFocus(event : any)
  {
    if (eventObj != null && eventObj != undefined )
    {
        eventObj.target.style.border = '1px solid #aaa'
        eventObj.target.style.animation = 'none'
    }
    eventObj = event;
    eventObj.target.style.border = 'double #21c967'
  }

  function handleBlur(){
    eventObj.target.style.border = '2px solid #4ccf83'
    eventObj.target.style.animation = 'identifier 3s infinite'
  }
  </script>

<style>
    :root {
        --border-color : var(--border-color);
    }

    .funtion-flow {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        justify-content: center;
        padding: 2rem;
    }

    .main-flow {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        flex-basis: 70%;
        min-height: 500px;
    }

.step-flow {
    /* min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
}

.step-details {
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    min-height: 500px;
    position: sticky;
    top: 116px;
    right: 0;
}

.template-info, .step-info{
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
}

.step-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.step-details-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.step-details-input{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.step-details-input input {
    border: 1px solid #aaa;
    padding-left: 0.2rem;
}

.step-details-input input:focus {
    outline: none;
}

.data-list{
    width: 300px;
}

.details-new-item{
    padding: 0.5rem 1rem;
    border-radius: 10px;
}

.details-new-item:hover{
    background: #f5f5f5
}

.details-new-item .step-details-info{
    gap: 0;
}

.step-btn {
    padding: 1rem;
    border: 1px solid #aaa;
    border-radius: 30px;
    text-align: left;
    position: relative;
    min-width: 100%;
    max-width: 100%;
    background: #fff;
}

.step-btn:focus{
    /* border: 1px solid #4ccf83; */
    border: double;
    border-color: #21c967;
    /* animation: identifier 3s infinite; */
}

@keyframes identifier {
    0%{
        box-shadow: 0 0 0px 0px transparent;
    }

    50%{
        box-shadow: 0 0 5px 5px rgb(183, 252, 213);
    }

    100%{
        box-shadow: 0 0 0px 0px transparent;
    }
}

.new-step{
    background: #4ccf83;
}

.sub-step{
    padding-left: 4rem;
    max-width: 100%;
    position: relative;
}

.sub-step::before {
    content: '';
    height: 100%;
    width: 1px;
    background: var(--border-color);
    position: absolute;
    top : 0;
    left: 2rem;
}

.connect-line{
    width: 20%;
    border-left: 1px solid #aaa;
    margin-left: 2rem;
    text-align: left;
    display: flex;
    align-items: center;
    height: 50px;
    transition: 0.3s ease;
}

.connect-line:hover .add-btn{
    display: block;
}

.branch-connect-line{
    width: 4rem;
    height: 100px;
    transform: translateX(-2rem);
    position: relative;
}

.branch-connect-line .add-btn {
    transform: translate(-50%,50%);
}

.branch-connect-line:hover .add-btn {
    display: block;
}

.branch-connect-line::before{
    content: '';
    width: 100%;
    height: 50%;
    border-top: 1px solid #aaa;
    border-right: 1px solid #aaa;
    border-radius: 0 20px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
}

.end-connect-line{
    width: 50px;
    height: 50px;
    border: 1px solid #aaa;
}

.delete-btn{
    background: rgb(248, 144, 144);
    border-radius: 3px;
    transform: translate(50%,-50%);
    padding: 0 0.5rem;
    position: absolute;
    right: 30px;
    top: 0px;
    transition: 0.3s;
    display :none;
}

.step-btn:hover .delete-btn{
    display: block;
}

.add-btn {
    padding: 0 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 2px;
    transform: translateX(-50%);
    background: #4ccf83;
    font-weight: 600;
    transition: 0.3s;
    display: none;
}
  </style>