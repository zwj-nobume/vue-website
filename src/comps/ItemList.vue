<script setup>
import { useRouter } from 'vue-router';

defineProps({
    list: Array,
})

const router = useRouter()

const openPath = (path, target) => {
    if (typeof target === 'string' && target === '_blank') {
        let a = document.createElement('a')
        a.target = target
        a.href = path
        a.click()
        a = null
    } else {
        router.push(path)
    }
}
</script>

<template>
    <ul class="list">
        <li class="item" @click="router.go(-1)">
            <img src="@/assets/icon/back.svg" width="100" height="100">
            <span class="name">上一页</span>
        </li>
        <li class="item" v-for="li in list" @click="openPath(li.path, li.target)">
            <img :src="li.icon" width="100" height="100">
            <span class="name">{{ li.name }}</span>
        </li>
    </ul>
</template>

<style scoped>
ul.list {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    list-style: none;
}

ul.list li.item {
    margin: 20px 0 0 20px;
    display: flex;
    flex-direction: column;
}

ul.list li.item:hover {
    cursor: pointer;
    /* -webkit-transform: scale(1.1) translateY(-8px); */
    transform: scale(1.1) translateY(-8px);
}

ul.list li.item span.name {
    margin-top: 10px;
    text-align: center;
}
</style>