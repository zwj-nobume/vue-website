<script setup>
import { ref } from 'vue';
import ButtonList from '@/comps/ButtonList.vue';

const pages = ref(new Array(
    { name: '系统管理', path: '/system', icon: '/src/assets/icon/system.svg' },
    { name: '媒体管理', path: '/media', icon: '/src/assets/icon/media.svg' },
    { name: '其他服务', path: '/other', icon: '/src/assets/icon/other.svg' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="pages"></ButtonList>
    </main>
</template>

<style scoped>
</style>