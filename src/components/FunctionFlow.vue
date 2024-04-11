/* eslint-disable */
<template>
    This is data : {{listNodes?.id}}
<div class="flow">
    <div class="node-wrap first-node-wrap">
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
    </div>
</div>
</template>

<script setup>
import {
    onMounted,
    ref
} from 'vue';

defineProps({
    listNodes: {
    type: String,
    required: true
  }
});

onMounted(AddNode)

function AddNode() {
    const buttons = document.querySelectorAll('.node');
    for (const button of buttons) {
        if (!button.classList.contains('first-node')) {
            button.parentNode.insertBefore(CreateConnectLine(), button);
        }
    }

    const nodeWraps = document.querySelectorAll('.node-wrap');
    for (const nodeWrap of nodeWraps) {
        if (!nodeWrap.classList.contains('first-node-wrap')) {
            nodeWrap.parentNode.insertBefore(CreateConnectLine(), nodeWrap);
        }
    }
}

function CreateConnectLine() {
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-button');

    const div = document.createElement('div');
    div.appendChild(addButton);
    div.classList.add('connect-div');
    return div;
}
</script>

<style lang="css">
button {
    cursor: pointer;
}

.flow {
    width: 500px;
    height: 500px;
    overflow-y: auto;
    background: rgb(226, 226, 226);
    padding: 1rem;
}

.node-wrap {
    width: 100%;
    padding-left: 4rem;
    position: relative;
}

.node-wrap:not(.first-node-wrap)::before {
    content: '';
    display: block;
    height: 50px;
    width: 4rem;
    transform: translate(-3rem);
    border-radius: 0 20px 0 0;
    border-top: 2px solid #aaa;
    border-right: 2px solid #aaa;
}

.node-wrap:not(.first-node-wrap)::after {
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
