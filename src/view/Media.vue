<script setup>
import { ref } from 'vue';
import ItemList from '@/comps/ItemList.vue';

const pages = ref(new Array(
    { name: '专辑管理', path: '/media/album', icon: '/src/assets/icon/album.svg' },
    { name: '漫画管理', path: '/media/comic', icon: '/src/assets/icon/comic.svg' },
))
</script>

<template>
    <ItemList :list="pages"></ItemList>
</template>

<style scoped></style>