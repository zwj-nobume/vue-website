<script setup>
import AddDialog from '@/comps/AddDialog.vue';
import ButtonList from '@/comps/ButtonList.vue';
import TablePage from '@/comps/TablePage.vue';
import { ref } from 'vue';

const tableFunc = ref(null)
const reloadTable = () => tableFunc.value.loadTable()
const selAll = () => tableFunc.value.selAll()
const selResv = () => tableFunc.value.selResv()
const del = () => tableFunc.value.del()
const buttons = ref(new Array(
    { name: "添加", emit: 'btn-add', icon: '/src/assets/icon/add-user.svg' },
    { name: "全选", emit: 'btn-sel-all', icon: '/src/assets/icon/sel-all.svg' },
    { name: "反选", emit: 'btn-sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
    { name: "删除", emit: 'btn-del', icon: '/src/assets/icon/delete.svg' },
))

const addDialog = ref(null)
const elems = ref(new Array(
    { name: 'albumName', label: "专辑名称", type: 'text', required: true },
    { name: 'albumPath', label: "专辑路径", type: 'text', required: true },
    { name: 'albumCover', label: "专辑封面", type: 'text' },
))
const add = () => addDialog.value.showModal()

const url = ref({
    list: '/api/album/list',
    add: '/api/album/add',
    edit: '/api/album/edit',
    delete: '/api/album/delete',
})
const idName = ref('albumId')
const struct = ref(new Array(
    { name: "专辑名称", value: 'albumName', sortFlag: 'ai.album_name', modifiable: true },
    { name: "专辑路径", value: 'albumPath', sortFlag: 'ai.album_path', modifiable: true },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons" @btn-add="add" @btn-sel-all="selAll" @btn-sel-resv="selResv" @btn-del="del">
        </ButtonList>
        <TablePage ref="tableFunc" :url="url" :idName="idName" :struct="struct"></TablePage>
        <AddDialog ref="addDialog" :url="url" :elems="elems" @reload-table="reloadTable"></AddDialog>
    </main>
</template>

<style scoped></style>