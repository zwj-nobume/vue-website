<script setup>
import NavList from '@/comps/NavList.vue';
import { ref } from 'vue';

const pages = ref(new Array(
	{ name: '用户管理', path: '/system/user', icon: '/src/assets/icon/user.svg' },
	{ name: '角色管理', path: '/system/role', icon: '/src/assets/icon/role.svg' },
	{ name: '菜单管理', path: '/system/menu', icon: '/src/assets/icon/menu.svg' },
))
</script>

<template>
	<main class="main">
		<NavList :list="pages"></NavList>
	</main>
</template>

<style scoped></style>