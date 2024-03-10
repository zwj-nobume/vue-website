<script setup>
import { apiDelete, apiGet, apiPut } from '@/utils/ajax.js';
import { ref } from 'vue';

const props = defineProps({
    url: {
        type: Object,
        required: true,
    },
    idName: {
        type: String,
        required: true,
    },
    struct: {
        type: Array,
        required: true,
    },
})

const table = ref(new Array())
const loadTable = (params) => {
    if (typeof params === 'undefined' || params === null) {
        params = {
            pageNum: 1,
            pageSize: 20,
        }
    }
    let arr = new Array()
    Object.keys(params).forEach(key => arr.push(`${key}=${params[key]}`))
    apiGet(`${props.url.list}?${arr.join('&')}`, res => table.value = res.data)
}
loadTable()

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

defineExpose({
    loadTable,
    selAll,
    selResv,
    del,
})
</script>

<template>
    <section class="table-page">
        <table>
            <thead>
                <tr>
                    <th v-for="td in struct">{{ td.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tr, i) in table" @click="selectLine(i)" :class="{ selected: tr.selected }">
                    <td v-for="td in struct" @dblclick="upd(i, td)">{{ tr[td.value] }}</td>
                </tr>
            </tbody>
        </table>
    </section>
    <p style="text-align: center;">Page</p>
</template>

<style scoped>
section.table-page {
    flex: 1;
    width: 100%;
    font-size: larger;
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
    padding: 5px 0;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
    border-bottom: 1px solid gray;
}

table tbody tr.selected,
table tbody tr:hover {
    background-color: rgba(128, 128, 128, 0.5);
}
</style>