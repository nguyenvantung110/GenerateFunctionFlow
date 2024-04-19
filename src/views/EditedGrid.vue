<template>
    <div class="edited-grid">
        <div class="query-grid">
            <div class="query-input">
                <textarea placeholder="Query ..." v-model="sqlCommand" name="" id="" cols="50" rows="10"></textarea>
                <code><pre>{{ validateResult }}</pre></code>
            </div>
            <button class="validate-btn" @click="ValidateCommand">Format Command</button>
        </div>
        <div class="edited-table">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Col 1</th>
                        <th>Col 2</th>
                        <th>Col 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="{ 'selected': isRowSelected(rowIndex) }"  
                        @keyup.delete="deleteSelectedRows"
                        @keyup.backspace="deleteSelectedRows">
                        <td>
                            <input type="checkbox" @change="toggleRowSelection(rowIndex)" :checked="isRowSelected(rowIndex)" />
                        </td>
                        <td v-for="(value, field) in row"
                            :key="field"
                            @dblclick="startEditing(rowIndex, field)"
                            :class="{'editing' : isEditing(rowIndex, field)}">
                            <input
                                v-if="isEditing(rowIndex, field)"
                                v-model="data[rowIndex][field]"
                                @keyup.enter="stopEditing"
                                @keyup.esc="cancelEditing"
                                @blur="stopEditing"
                                autofocus
                            />
                            <span v-else>{{ value }}</span>
                        </td>
                    </tr>
                </tbody>
        </table>
        </div>
    </div>
  </template>
  
  <script>
  import { format } from 'sql-formatter';
  export default {
    data() {
      return {
        data: [
          { col1: 'Cell 1-1', col2: 'Cell 1-2', col3: 'Cell 1-3' },
          { col1: 'Cell 2-1', col2: 'Cell 2-2', col3: 'Cell 2-3' },
          { col1: 'Cell 3-1', col2: 'Cell 3-2', col3: 'Cell 3-3' }
        ],
        editingRow: -1,
        editingCol: '',
        editingValue: '',
        selectedRows: [],
        sqlCommand : '',
        validateResult : ''
      }
    },
    methods: {
      startEditing(row, col) {
        this.editingRow = row;
        this.editingCol = col;
        this.editingValue = this.data[row][col];
        console.log(this.editingValue)
      },
      stopEditing() {
        this.editingRow = -1;
        this.editingCol = '';
      },
      cancelEditing() {
        this.data[this.editingRow][this.editingCol] = this.editingValue;
        this.stopEditing();
      },
      isEditing(row, col) {
        return this.editingRow === row && this.editingCol === col;
      },
      isRowSelected(rowIndex) {
        return this.selectedRows.includes(rowIndex);
      },
      toggleRowSelection(rowIndex) {
        const index = this.selectedRows.indexOf(rowIndex);
        if (index === -1) {
            this.selectedRows.push(rowIndex);
        } else {
            this.selectedRows.splice(index, 1);
        }
      },
      deleteSelectedRows(event) {
        console.log('event')
            if (event.key === 'Delete' || event.key === 'Backspace') {
                this.data = this.data.filter((row, index) => !this.selectedRows.includes(index));
                this.selectedRows = [];
            }
      },
      ValidateCommand(){
        this.validateResult = format(this.sqlCommand, { language: 'sql', keywordCase: 'upper',tabWidth: 4,linesBetweenQueries: 2 })
      }
    }
  }
  </script>
  
  <style>
  code pre {
    text-align: left;
  }

.editing {
    /* border: 1px solid red; */
    outline: 2px solid #2cc491;
    outline-offset: -1px;
}
.edited-grid {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap : 2rem
}
.query-grid{
    padding: 2rem;
    border: 1px solid #aaa;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap : 2rem;
    width: 100%;
}

.query-grid textarea {
    border: 1px solid #aaa;
    resize: none;
    border-radius: 5px;
    padding: 1rem;
}

.query-grid textarea:nth-child(1):focus{
    outline: none;
   box-shadow: 0px 0px 10px 0px #93e5ca;
}

.validate-btn{
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 1rem;
    width: 200px;
}

.query-input{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

  .selected td{
    background-color: #93e5ca;
   }

  table {
    width: 80%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  table tr th{
    border: 1px solid #aaa;
    background: #3cd19f;
  }

  table tr td {
    border: 1px solid #aaa;
    text-align: left;
    background: #f0f0f0;
  }

  table tr td input {
    width: 100%;
    background: #cbf7e8;
  }

  table tr td input:focus{
    outline: none;
  }

  table tr:hover td {
    background: #b6f8e2;
  }

  table tr th:nth-child(1){
    width: 40px;
  }
  </style>