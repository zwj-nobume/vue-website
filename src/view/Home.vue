<script setup>
import { ref } from 'vue';
import ItemList from '@/comps/ItemList.vue';

const pages = ref(new Array(
    { name: '系统管理', path: '/system', icon: '/src/assets/icon/system.svg' },
    { name: '媒体管理', path: '/media', icon: '/src/assets/icon/media.svg' },
    { name: '其他服务', path: '/other', icon: '/src/assets/icon/other.svg' },
))
</script>

<template>
    <ItemList :list="pages"></ItemList>
</template>

<style scoped>
</style>