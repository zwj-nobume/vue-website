<script setup>
import NavList from '@/comps/NavList.vue';
import { apiGet } from '@/utils/ajax';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
if (store.state.permission.size === 0) {
	apiGet("/api/user/permission", (res) => {
		store.commit('setPermission', res.data)
	})
}

const pages = ref(new Array(
	{ name: '系统管理', path: '/system', icon: '/src/assets/icon/system.svg', permission: 'system' },
	{ name: '其他服务', path: '/other', icon: '/src/assets/icon/other.svg' },
))
</script>

<template>
	<main class="main">
		<NavList :list="pages"></NavList>
	</main>
</template>

<style scoped></style>