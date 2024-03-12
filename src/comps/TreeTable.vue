<script setup>
import { apiDelete, apiGet, apiPut } from '@/utils/ajax.js';
import { ref, onMounted } from 'vue';

const props = defineProps({
    url: {
        type: Object,
        required: true,
    },
    idName: {
        type: String,
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    struct: {
        type: Array,
        required: true,
    },
})

const table = ref(new Array())
const parentId = ref([''])
const sortFlag = ref('')
const loadTable = (pid) => {
    if (typeof pid !== 'undefined' && pid !== null) parentId.value.push(pid)
    let params = new Object()
    params[props.parentName] = getLastParentId()
    if (sortFlag.value !== '') params.sortFlag = sortFlag.value
    let arr = new Array()
    Object.keys(params).forEach(key => arr.push(`${key}=${params[key]}`))
    apiGet(`${props.url.list}?${arr.join('&')}`, res => {
        table.value = res.data
    })
}

const selectLine = (num) => {
    let line = table.value[num]
    let selected = line.selected
    selected ? line.selected = false : line.selected = true
}

const selAll = () => table.value.forEach(tb => tb.selected = true)
const selResv = () => table.value.forEach(tb => tb.selected = !tb.selected)

const upd = (num, td) => {
    if (!td.modifiable) return
    let line = table.value[num]
    let newVal = prompt(`${td.name}`, line[td.value])
    if (newVal === null) return
    if (newVal === line[td.value]) {
        alert("数据未修改")
        return
    }
    if (td.regexp && newVal.match(td.regexp) === null) {
        alert("输入格式不匹配")
        return
    }
    const data = new Object()
    data[props.idName] = line[props.idName]
    data[td.value] = newVal
    const callback = (res) => {
        alert(res.message)
        line[td.value] = newVal
    }
    apiPut(props.url.edit, data, callback)
}

const del = () => {
    let delTable = table.value.filter(tb => tb.selected)
    if (delTable.length === 0) {
        alert("请先选择需要删除的记录")
        return
    }
    if (window.confirm(`确认要删除选中的 ${delTable.length} 条记录吗?`)) {
        let ids = delTable.map(tb => tb[props.idName])
        const callback = (res) => {
            alert(res.message)
            loadTable()
        }
        apiDelete(props.url.delete, ids, callback)
    }
}

const getLastParentId = () => {
    let lastParentId = parentId.value[parentId.value.length - 1]
    return lastParentId === '' ? 'NULL' : lastParentId
}

defineExpose({
    getLastParentId,
    loadTable,
    selAll,
    selResv,
    del,
})

onMounted(() => loadTable())
</script>

<template>
    <section class="tree-table">
        <table>
            <thead>
                <tr>
                    <th v-for="td in struct">{{ td.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, i) in table" @click="selectLine(i)" :class="{ selected: tr.selected }">
                    <td v-for="td in struct" @dblclick="upd(i, td)">{{ tr[td.value] }}</td>
                    <td><button @click="loadTable(tr[idName])">子菜单</button></td>
                </tr>
            </tbody>
        </table>
    </section>
    <p class="page">
        <span>排序标识:&emsp;</span>
        <select v-model="sortFlag" @change="loadTable()">
            <option v-for="op in struct" :value="op.sortFlag">{{ op.name }}</option>
            <option v-for="op in struct" :value="op.sortFlag + ' DESC'">{{ op.name }} 倒序</option>
        </select>
    </p>
</template>

<style scoped>
section.tree-table {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
}

table {
    width: 90%;
    table-layout: fixed;
}

table th,
table td {
    height: 2em;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    user-select: none;
    border-bottom: 1px solid gray;
}

table tbody tr.selected,
table tbody tr:hover {
    background-color: rgba(128, 128, 128, 0.5);
}

table tbody tr td button {
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: orange;
}

table tbody tr td button:hover {
    filter: brightness(1.4);
    cursor: pointer;
}

p.page {
    display: flex;
    align-items: center;
}

p.page span {
    margin-left: 10px;
}

section.tree-table,
p.page select {
    font-size: 1.3em;
}
</style>