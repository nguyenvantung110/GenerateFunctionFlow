/* eslint-disable */
<template>
<div class="flow">
    <!-- <div class="node-wrap first-node-wrap">
        <button class="node first-node">This is first node <br>fsdfs</button>
        <button class="node second-node">This is first node <br>fsdfs</button>

        <div class="node-wrap second-node-wrap">
            <button class="node second-node">This is first node <br>fsdfs</button>
            <button class="node second-node">This is first node <br>fsdfs</button>

            <div class="node-wrap third-node-wrap">
                <button class="node second-node">This is first node <br>fsdfs</button>
                <button class="node second-node">This is first node <br>fsdfs</button>

                <div class="node-wrap third-node-wrap">
                    <button class="node second-node">This is first node <br>fsdfs</button>
                    <button class="node second-node">This is first node <br>fsdfs</button>
                </div>

                <button class="node second-node">This is first node <br>fsdfs</button>
            </div>
        </div>
        <button class="node second-node">This is first node <br>fsdfs</button>

        <button class="node second-node">This is first node <br>fsdfs</button>
    </div> -->
    <div class="node-wrap node-wrap-1">
        <ButtonCp v-for="item in templates" :key="item?.id" v-bind="item"/>
    </div>
    <button :class="'tungnv' + cl">VV</button>
</div>
</template>

<script setup>
import {
    onMounted,h,
    ref,
    onBeforeUpdate
} from 'vue';

import ButtonCp from './ButtonCp.vue';
const cl = ref(1)
const templates = ref([])
templates.value = [
    {
      id : '1',
      name : 'this is root node',
      description : 'this is desc',
      level : 1,
      nodeIndex : 1,
	  parentId : '0',
      childs : [
        {
            id : '1-1',
            name : 'this is second node',
            description : 'this is desc',
            level : 2,
			parentId : '1',
            nodeIndex : 1,
            childs : [
                {
                id : '1-1-1',
                name : 'this is second node',
                description : 'this is desc',
                level : 3,
				parentId : '1-1',
                nodeIndex : 1,
                childs : []
                }   
            ]
        },
        {
            id : '1-2',
            name : 'this is third node',
            description : 'this is desc',
            level : 2,
			parentId : '1',
            nodeIndex : 2,
            childs : []
        }
      ]
    },
    {
      id : '2',
      name : 'this is second node',
      description : 'this is desc',
      level : 1,
	  parentId : '0',
      nodeIndex : 2,
      childs : []
    },
    {
      id : '3',
      name : 'this is third node',
      description : 'this is desc',
      level : 1,
	  parentId : '0',
      nodeIndex : 3,
      childs : []
    },
    {
      id : '4',
      name : 'this is fouth node',
      description : 'this is desc',
      level : 1,
	  parentId : '0',
      nodeIndex : 4,
      childs : []
    }
  ]

function AddItem(button){
  const buttonEl = button.parentElement;
  const prevEl = buttonEl.previousElementSibling
  const nextEl = buttonEl.nextElementSibling

  // Lấy dữ liệu từ phần tử liền kề
  const item = prevEl?.querySelectorAll('span')
  const prevData = {
      id: item[0].textContent,
      name: item[1].textContent
    }
//name: nextEl?.querySelector('button').textContent.split('\n')[0],
const item2 = nextEl?.querySelectorAll('span')
    const nextData = {
      id: item2[0].textContent,
      name: item2[1].textContent    }

const newNode = {
      id : '5',
      name : 'this is fouth node',
      description : 'this is desc',
      level : 1,
	  parentId : '0',
      nodeIndex : 5,
      childs : []
}

// Thêm object mới sau object có id 2
insertObjectA(templates.value, newNode, prevData.id, 'after');
AddNode()
}


function insertObjectA(targetArray, newObject, targetId, position) {
  const findAndInsert = (arr, id, obj, pos) => {
    console.log('arr',arr)
    console.log('id',id)
    console.log('obj',obj)
    console.log('pos',pos)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        switch (pos) {
          case 'before':
            arr.splice(i, 0, obj);
            break;
          case 'after':
            arr.splice(i + 1, 0, obj);
            console.log(arr.splice(i + 1, 0, obj))
            break;
          case 'between':
            if (arr[i].child && arr[i].child.length > 0) {
              return findAndInsert(arr[i].child, targetId, obj, pos);
            }
            break;
          default:
            return;
        }
        return;
      }
      if (arr[i].child && arr[i].child.length > 0) {
        if (findAndInsert(arr[i].child, id, obj, pos)) {
          return true;
        }
      }
    }
    return false;
  };

  return findAndInsert(targetArray, targetId, newObject, position);
}

defineProps({
    listNodes: {
    type: Object,
    required: true
  }
});

onMounted(AddNode)

function AddNode() {
    let index = 0
    const buttons = document.querySelectorAll('.node');
    for (const button of buttons) {
        index ++
        if (!button.classList.contains('node-1')) {
            button.parentNode.insertBefore(CreateConnectLine(index), button);
        }
    }

    const nodeWraps = document.querySelectorAll('.node-wrap');

    for (const nodeWrap of nodeWraps) {
        index ++
        if (!nodeWrap.classList.contains('node-wrap-1')) {
            nodeWrap.parentNode.insertBefore(CreateConnectLine(index), nodeWrap);
        }
    }
}

function CreateConnectLine(index) {
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-button');
    let classIndex = 'add-button-' + index
    addButton.classList.add(classIndex);
    addButton.setAttribute('id',classIndex);
    addButton.addEventListener('click', () => {
        AddItem(addButton)
    });

    const div = document.createElement('div');
    div.appendChild(addButton);
    div.classList.add('connect-div');
    return div;
}

</script>

<style lang="css">
*{
    box-sizing: border-box;
}

button {
    cursor: pointer;
}

.flow {
    width: 500px;
    /* height: 500px; */
    overflow-y: auto;
    background: rgb(226, 226, 226);
    padding: 1rem;
}

.node-wrap {
    width: 100%;
    padding-left: 4rem;
    position: relative;
}

.node-wrap:not(.node-wrap-1)::before {
    content: '';
    display: block;
    height: 50px;
    width: 4rem;
    transform: translate(-3rem);
    border-radius: 0 20px 0 0;
    border-top: 2px solid #aaa;
    border-right: 2px solid #aaa;
}

.node-wrap:not(.node-wrap-1)::after {
    content: '';
    height: 100%;
    border: 1px solid #aaa;
    position: absolute;
    top: 0;
    left: 1rem;
    z-index: 0;
}

button.node {
    width: 100%;
    position: relative;
    background: #fff;
    border: 2px solid #aaa;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    height: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.connect-div {
    height: 40px;
    width: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.connect-div::before {
    content: '';
    height: 100%;
    border: 1px solid #aaa;
    position: absolute;
    top: 0;
    left: 1rem;
    z-index: 0;
}

.add-button {
    background: #fff;
    border: 1px solid #aaa;
    border-radius: 5px;
    z-index: 0;
    display: none;
    transition: 0.2s;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
    transform: translate(-3px);
}

.connect-div:hover .add-button {
    display: block;
}

.branch-connect-div {
    background: red;
    padding: 0.1rem 0.2rem;
    width: fit-content;
    text-transform: uppercase;
    border-radius: 5px;
    transform: translate(75%);
}

.branch-connect-div::before {
    content: '';
    display: block;
    height: 30px;
    width: 50px;
    border-radius: 0 10px 0 0;
    border-top: 2px solid #aaa;
    border-right: 2px solid #aaa;
    margin-left: -45px;
    margin-top: -33px;
}
</style>
