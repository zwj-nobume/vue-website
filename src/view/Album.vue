<script setup>
import { ref } from 'vue';
import ButtonList from '@/comps/ButtonList.vue';
import TablePage from '@/comps/TablePage.vue';

const add = () => {
    console.log('add')
}

const upd = () => {
    console.log('update')
}

const del = () => {
    console.log('delete')
}

const buttons = ref(new Array(
    { name: "添加", click: add, icon: '/src/assets/icon/add-user.svg' },
    { name: "修改", click: upd, icon: '/src/assets/icon/update-user.svg' },
    { name: "删除", click: del, icon: '/src/assets/icon/delete.svg' },
))

const url = ref("/api/album/list")
const struct = ref(new Array(
    { name: "专辑名称", value: 'albumName' },
    { name: "专辑路径", value: 'albumPath' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons"></ButtonList>
        <TablePage :url="url" :struct="struct"></TablePage>
    </main>
</template>

<style scoped></style>