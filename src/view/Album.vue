<script setup>
import ButtonList from '@/comps/ButtonList.vue';
import TablePage from '@/comps/TablePage.vue';
import { ref } from 'vue';

const tableFunc = ref(null)
const selAll = () => tableFunc.value.selAll()
const selResv = () => tableFunc.value.selResv()
const del = () => tableFunc.value.del()

const add = () => {
    console.log('add')
}

const buttons = ref(new Array(
    { name: "添加", click: add, icon: '/src/assets/icon/add-user.svg' },
    { name: "全选", click: selAll, icon: '/src/assets/icon/sel-all.svg' },
    { name: "反选", click: selResv, icon: '/src/assets/icon/sel-resv.svg' },
    { name: "删除", click: del, icon: '/src/assets/icon/delete.svg' },
))

const url = ref({
    list: '/api/album/list',
    add: '/api/album/add',
    edit: '/api/album/edit',
    delete: '/api/album/delete',
})
const idName = ref('albumId')
const struct = ref(new Array(
    { name: "专辑名称", value: 'albumName', modifiable: true },
    { name: "专辑路径", value: 'albumPath', modifiable: true },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons"></ButtonList>
        <TablePage ref="tableFunc" :url="url" :idName="idName" :struct="struct"></TablePage>
    </main>
</template>

<style scoped></style>