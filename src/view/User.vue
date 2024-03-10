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
    list: '/api/user/list',
    add: '/api/user/add',
    edit: '/api/user/edit',
    delete: '/api/user/delete',
})
const idName = ref('userId')
const struct = ref(new Array(
    { name: "用户名", value: 'userName', modifiable: true },
    { name: "邮箱", value: 'email', modifiable: true, regexp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ },
    { name: "创建人", value: 'createName' },
    { name: "创建时间", value: 'createTime' },
    { name: "修改人", value: 'updateName' },
    { name: "修改时间", value: 'updateTime' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons"></ButtonList>
        <TablePage ref="tableFunc" :url="url" :idName="idName" :struct="struct"></TablePage>
    </main>
</template>

<style scoped></style>