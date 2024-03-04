<script setup>
import { useRouter } from 'vue-router';

defineProps({
    list: {
        type: Array,
        required: true,
    },
    width: {
        type: Number,
        default: 120,
        required: false,
    },
    height: {
        type: Number,
        default: 80,
        required: false,
    },
})

const router = useRouter()

const clevent = (button) => {
    if (typeof button.click === 'function') {
        button.click()
        return
    }
    if (typeof button.target === 'string' && button.target === '_blank') {
        let a = document.createElement('a')
        a.target = target
        a.href = path
        a.click()
        a = null
        return
    }
    router.push(button.path)
}
</script>

<template>
    <ul class="list">
        <li class="btn" @click="router.go(-1)">
            <img src="@/assets/icon/back.svg" :width="width" :height="height">
            <span class="name">上一页</span>
        </li>
        <li class="btn" v-for="li in list" @click="clevent(li)">
            <img :src="li.icon ? li.icon : '/src/assets/icon/box.svg'" :width="width" :height="height">
            <span class="name">{{ li.name }}</span>
        </li>
    </ul>
</template>

<style scoped>
ul.list {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    list-style: none;
    scrollbar-width: none;
}

ul.list li.btn {
    margin: 20px 0 0 20px;
    display: flex;
    flex-direction: column;
}

ul.list li.btn:hover {
    cursor: pointer;
    /* -webkit-transform: scale(1.1) translateY(-8px); */
    transform: scale(1.1) translateY(-8px);
}

ul.list li.btn span.name {
    margin-top: 10px;
    text-align: center;
}
</style>