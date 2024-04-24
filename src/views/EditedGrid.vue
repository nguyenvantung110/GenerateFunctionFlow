<template>
<div class="edited-grid">
    <!-- <div class="query-grid">
            <div class="query-input">
                <textarea placeholder="Query ..." v-model="sqlCommand" name="" id="" cols="50" rows="10"></textarea>
                <code><pre>{{ validateResult }}</pre></code>
            </div>
            <button class="validate-btn" @click="ValidateCommand">Format Command</button>
        </div> -->
    <div class="edited-table">
        <table @paste.prevent="handlePaste($event)" @click="clickTable($event)" @blur="focusoutTable()" @keydown.ctrl="handleCtrlKeyDown"
            @keyup.ctrl="handleCtrlKeyUp"
            @keydown.ctrl.c="handleCopy"
            tabindex="0">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="item in headers" :key="item">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="{ 'selected': isRowSelected(rowIndex) }" @keyup.delete="deleteSelectedRows" @keyup.backspace="deleteSelectedRows">
                    <td>
                        <input type="checkbox" @change="toggleRowSelection(rowIndex)" :checked="isRowSelected(rowIndex)" />
                    </td>
                    <td v-for="(value, field,index) in row" :key="field + index" @click="startEditing(rowIndex, field)" :class="{'editing' : isEditing(rowIndex, field)}">
                        <input v-if="isEditing(rowIndex, field)" v-model="data[rowIndex][field]" @keyup.enter="stopEditing" @keyup.esc="cancelEditing" @blur="stopEditing" autofocus />
                        <span v-else>{{ value }}</span>
                    </td>
                </tr>
            </tbody>
            <tfoot>
              <tr v-for="(newItem,index) in newRowsToAdd" :key="index" >
                <td></td>
                <td v-for="(item,subIndex) in headers.length" :key="subIndex">
                  <input v-model="newRowsToAdd[index][subIndex]" type="text" placeholder="Null" @keydown="AddNewEmptyRow($event,index,subIndex)" @click="EditNewRow(index)" @blur="FocusoutNewRow(index)">
                </td>
              </tr>
            </tfoot>
        </table>
    </div>
</div>
</template>

<script setup lang="ts">
import { format } from 'sql-formatter';
import { onMounted, ref } from 'vue'

const data = ref<any[]>([{
        col1: 'Cell 1-1',
        col2: 'Cell 1-2',
        col3: 'Cell 1-3',
        col4: 'Cell 1-4',
        col5: 'Cell 1-5',
        col6: 'Cell 1-6'
    },
    {
        col1: 'Cell 2-1',
        col2: 'Cell 2-2',
        col3: 'Cell 2-3',
        col4: 'Cell 2-4',
        col5: 'Cell 2-5',
        col6: 'Cell 2-6'
    },
    {
        col1: 'Cell 3-1',
        col2: 'Cell 3-2',
        col3: 'Cell 3-3',
        col4: 'Cell 3-4',
        col5: 'Cell 3-5',
        col6: 'Cell 3-6'
    }
])

const headers = ref(['Col1', 'Col2', 'Col3','Col4','Col5','Col-6'])

const sqlCommand = ref('')
const validateResult = ref('')

const editingRow = ref(-1)
const editingCol = ref('')
const editingValue = ref('')
const selectedRows = ref<number[]>([])

const isClickTable = ref(false)
const isCtrlPressed = ref(false)
const isCopyOnTable = ref(false)

const tableComponentClick = ref<string|undefined>('')

// params for tfoot
const newRowsToAdd = ref<any[]>([])
const isEditNewRow = ref(false)
const currentEditRow = ref(-1)

onMounted(()=>{
  TFootInit()
})

function TFootInit(){
  const newItem :any = {}
  for (const [index, value] of headers.value.entries()) {
    newItem[index] = ''
  }

  newRowsToAdd.value.push(newItem)
}

function clickTable(event : MouseEvent) {
  isClickTable.value = true

  const target = event.target as HTMLElement;

  const clickedElement = target.closest('thead') || target.closest('tbody') || target.closest('tfoot');
  if(isEditNewRow.value && clickedElement?.tagName.toLowerCase() !== 'tfoot'){
    AddNewRowToDataList()
  }
}

function focusoutTable() {
    isClickTable.value = false
    isCopyOnTable.value = false
}

function handleCtrlKeyDown() {
      isCtrlPressed.value = true;
    }
  
function handleCtrlKeyUp() {
      isCtrlPressed.value = false;
    }

function handleCopy() {
      if (isCtrlPressed.value) {
        isCopyOnTable.value = true
      }
    }


function startEditing(row: number, col: string) {
    editingRow.value = row;
    editingCol.value = col;
    editingValue.value = data.value[row][col];
}

function stopEditing() {
    editingRow.value = -1;
    editingCol.value = '';
}

function cancelEditing() {
    data.value[editingRow.value][editingCol.value] = editingValue.value;
    stopEditing();
}

function isEditing(row: number, col: string) {
    return editingRow.value === row && editingCol.value === col;
}

function isRowSelected(rowIndex: number) {
    return selectedRows.value.includes(rowIndex);
}

function toggleRowSelection(rowIndex: number) {
    const index = selectedRows.value.indexOf(rowIndex);
    if (index === -1) {
        selectedRows.value.push(rowIndex);
    } else {
        selectedRows.value.splice(index, 1);
    }
}

function deleteSelectedRows(event: any) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
        data.value = data.value.filter((row, index) => !selectedRows.value.includes(index));
        selectedRows.value = [];
    }
}

function ValidateCommand() {
    validateResult.value = format(sqlCommand.value, {
        language: 'sql',
        keywordCase: 'upper',
        tabWidth: 4,
        linesBetweenQueries: 2
    })
}

function handlePaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('text/plain');

    // Xử lý dữ liệu đã paste
    if (isClickTable.value) {
        processData(pastedData);
    }
}

function processData(inputdata: any) {
    const parseData = inputdata.split('\r\n').map((row: any) => {
      if(isCopyOnTable.value)
      {
        return row.trim().split('\t')
      }
      return row.split('\t')
    });

    const rows = parseData.filter((row: any) => !row.every((element: any) => !IsNotNullOrEmpty(element)));

    if (rows.length > 0) {
        rows.forEach((row: any) => {
            const newRow: any = {};
            for (const [index, value] of headers.value.entries()) {
                newRow[index] = IsNotNullOrEmpty(row[index]) ? row[index] : ''
            }

            data.value.push(newRow)
        })
    }
}

const nonPrintableKeys = [
    'Shift', 'Control', 'Alt','NumLock','Meta', 'CapsLock', 'Escape', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
  ];

function AddNewEmptyRow(event:KeyboardEvent,rowIndex : number,index : number){
  if(newRowsToAdd.value.length <2 && !nonPrintableKeys.includes(event.key))
  {
    TFootInit()
  }
} 

function EditNewRow(index : number){
  if(index > 0){
    AddNewRowToDataList()
  }
}

function FocusoutNewRow(index:number){
    isEditNewRow.value = index === 0
}

function AddNewRowToDataList(){
    data.value.push(newRowsToAdd.value[0])
    newRowsToAdd.value.shift()
    isEditNewRow.value = false
}

function IsNotNullOrEmpty(value: string) {
    return value !== null && value !== '' && value !== undefined
}
</script>

<style>
.edited-grid {
    padding: 2rem;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem
}

.edited-table {
    width: 100%;
    max-height: 500px;
    overflow: auto;
}

code pre {
    text-align: left;
}

.editing {
    /* border: 1px solid red; */
    outline: 2px solid #2cc491;
    outline-offset: -1px;
}

.query-grid {
    padding: 2rem;
    border: 1px solid #aaa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.query-grid textarea {
    border: 1px solid #aaa;
    resize: none;
    border-radius: 5px;
    padding: 1rem;
}

.query-grid textarea:nth-child(1):focus {
    outline: none;
    box-shadow: 0px 0px 10px 0px #93e5ca;
}

.validate-btn {
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 1rem;
    width: 200px;
}

.query-input {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.selected td {
    background-color: #93e5ca !important;
}

table {
    min-width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #aaa;
    position: relative;
}

/* table tbody tr:nth-child(odd) td {
    background: #eeeeee;
}

table tbody tr:nth-child(even) td {
    background: #fff;
} */

/* table tr:hover td {
    background: #b6f8e2 !important;
} */

table tr th {
    border: 1px solid #aaa;
    background: #3cd19f;
    padding: 0.2rem 0;
}

table tbody tr td:not(.editing) {
    border: 1px dotted #aaa;
    text-align: left;
    padding: 0 0.5rem;
    /* background: #f0f0f0; */
}

table tr td input {
    width: 100%;
    background: #edfff9;
    padding: 0 0.5rem;
}

table tr td input:focus {
    outline: none;
}

table tr th:nth-child(1) {
    width: 40px;
}

table th{
  position: sticky;
  top: -1px;
  z-index: 2;
}

table th:first-child{
  left: 0;
  z-index: 3;
}

table tfoot {
  position: sticky;
  bottom: -1px;
  z-index: 2;
}

table tfoot tr td {
  border: 1px solid #aaa;
  background: #edfff9;
}

table tr td:first-child{
  background: #fff;
  position: sticky;
  left: -1px;
}
</style>
