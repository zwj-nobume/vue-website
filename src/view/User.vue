<script setup>
import { ref } from 'vue';
import { apiGet } from '@/utils/ajax';
import ButtonList from '@/comps/ButtonList.vue';

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
    { name: '添加', click: add, icon: '/src/assets/icon/add-user.svg' },
    { name: '修改', click: upd, icon: '/src/assets/icon/update-user.svg' },
    { name: '删除', click: del, icon: '/src/assets/icon/delete.svg' },
))

const list = ref(new Array())

const callback = (res) => {
    console.log(res)
}

apiGet('/api/user/list?pageNum=1&pageSize=10', callback)
</script>

<template>
    <main class="main">
        <ButtonList :list="buttons"></ButtonList>
    </main>
</template>

<style scoped></style>