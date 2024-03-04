<script setup>
import { ref } from 'vue';
import ButtonList from '@/comps/ButtonList.vue';

const pages = ref(new Array(
    { name: '用户管理', path: '/system/user', icon: '/src/assets/icon/user.svg' },
    { name: '角色管理', path: '/system/role', icon: '/src/assets/icon/role.svg' },
    { name: '菜单管理', path: '/system/menu', icon: '/src/assets/icon/menu.svg' },
))
</script>

<template>
    <main class="main">
        <ButtonList :list="pages"></ButtonList>
    </main>
</template>

<style scoped></style>