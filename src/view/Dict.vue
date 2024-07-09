<script setup>
import TitleButton from '@/comps/TitleButton.vue';
import { apiGet } from '@/utils/ajax';
import { ref } from 'vue';

const add = () => console.log('add')
const selAll = () => console.log('selAll')
const selResv = () => console.log('selResv')
const del = () => console.log('del')
const buttons = ref(new Array(
    { name: "添加", emit: 'add', icon: '/src/assets/icon/add-role.svg' },
    { name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
    { name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
    { name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const url = '/api/dict/page'
const callback = (res) => {
    console.log(res)
}
apiGet(url, callback)
</script>

<template>
    <main class="main">
        <TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del"></TitleButton>
    </main>
</template>

<style scoped></style>