<script setup>
import { ref } from 'vue';
import ButtonList from '@/comps/ButtonList.vue';

const pages = ref(new Array(
    { name: '专辑管理', path: '/media/album', icon: '/src/assets/icon/album.svg' },
    { name: '漫画管理', path: '/media/comic', icon: '/src/assets/icon/comic.svg' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="pages"></ButtonList>
    </main>
</template>

<style scoped></style>