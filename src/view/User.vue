<script setup>
import { ref } from 'vue';
import ButtonList from '@/comps/ButtonList.vue';
import TablePage from '@/comps/TablePage.vue';
import { useStore } from 'vuex';

const store = useStore()

const selAll = () => store.commit('selAllTable')
const selResv = () => store.commit('selResvTable')
const del = () => store.commit('delTable')

const add = () => {
    console.log('add')
}

const buttons = ref(new Array(
    { name: "添加", click: add, icon: '/src/assets/icon/add-user.svg' },
    { name: "全选", click: selAll, icon: '/src/assets/icon/sel-all.svg' },
    { name: "反选", click: selResv, icon: '/src/assets/icon/sel-resv.svg' },
    { name: "删除", click: del, icon: '/src/assets/icon/delete.svg' },
))

const url = ref("/api/user/list")
const struct = ref(new Array(
    { name: "用户名", value: 'userName' },
    { name: "邮箱", value: 'email' },
    { name: "创建人", value: 'createName' },
    { name: "创建时间", value: 'createTime' },
    { name: "修改人", value: 'updateName' },
    { name: "修改时间", value: 'updateTime' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons"></ButtonList>
        <TablePage :url="url" :struct="struct"></TablePage>
    </main>
</template>

<style scoped></style>