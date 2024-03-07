<script setup>
import { ref } from 'vue';
import { apiGet } from '@/utils/ajax.js'
import { useStore } from 'vuex';

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
    struct: {
        type: Array,
        required: true,
    },
})

const store = useStore()
const loadTable = (params) => {
    let arr = new Array()
    Object.keys(params).forEach(key => arr.push(`${key}=${params[key]}`))
    apiGet(`${props.url}?${arr.join('&')}`, res => store.commit('setTable', res.data))
}
loadTable({
    pageNum: 1,
    pageSize: 20,
})

const selectLine = (num) => {
    let line = store.getters.getTable[num]
    let selected = line.selected
    selected ? line.selected = false : line.selected = true
}
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
                <tr v-for="(tr, i) in store.state.table" @click="selectLine(i)" :class="{ selected: tr.selected }">
                    <td v-for="td in struct">{{ tr[td.value] }}</td>
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