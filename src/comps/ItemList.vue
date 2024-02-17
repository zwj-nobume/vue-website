<script setup>
import { useRouter } from 'vue-router';

defineProps({
    list: Array,
})

const router = useRouter()
</script>

<template>
    <ul class="list">
        <li class="item" @click="router.go(-1)">
            <img src="@/assets/icon/back.svg" width="100" height="100">
            <span class="name">上一页</span>
        </li>
        <li class="item" v-for="li in list" @click="router.push(li.path)">
            <img :src="li.icon" width="100" height="100">
            <span class="name">{{ li.name }}</span>
        </li>
    </ul>
</template>

<style scoped>
ul.list {
    width: 90%;
    height: 90%;
    border-radius: 2%;
    background-color: rgba(255, 240, 245, 0.5);
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    align-items: center;
    align-content: flex-start;
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