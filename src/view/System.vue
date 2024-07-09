<script setup>
import NavList from '@/comps/NavList.vue';
import { ref } from 'vue';

const pages = ref(new Array(
	{ name: "用户管理", path: '/system/user', icon: '/src/assets/icon/user.svg', permission: 'system:user' },
	{ name: "角色管理", path: '/system/role', icon: '/src/assets/icon/role.svg', permission: 'system:role' },
	{ name: "菜单管理", path: '/system/menu', icon: '/src/assets/icon/menu.svg', permission: 'system:menu' },
	{ name: "文件管理", path: '/system/file', icon: '/src/assets/icon/file-manager.svg', permission: 'system:file' },
	{ name: "字典管理", path: '/system/dict', icon: '/src/assets/icon/dict-manager.svg', permission: 'system:dict' },
))
</script>

<template>
	<main class="main">
		<NavList :list="pages"></NavList>
	</main>
</template>

<style scoped></style>