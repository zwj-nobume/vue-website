<script setup>
import NavList from '@/comps/NavList.vue';
import { apiGetDownload } from '@/utils/ajax';
import { ref } from 'vue';

const pages = ref(new Array(
	// { name: 'Memos', path: 'https://memos.colonq.cn:81', icon: '/src/assets/icon/memos.svg', target: '_blank' },
	// { name: 'NextCloud', path: 'https://nextcloud.colonq.cn:81', icon: '/src/assets/icon/nextcloud.svg', target: '_blank' },
	// { name: 'Jellyfin', path: 'https://jellyfin.colonq.cn:81', icon: '/src/assets/icon/jellyfin.svg', target: '_blank' },
	// { name: 'CalibreWeb', path: 'https://calibre.colonq.cn:81', icon: '/src/assets/icon/calibre.svg', target: '_blank' },
	// { name: 'Gitea', path: 'https://gitea.colonq.cn:81', icon: '/src/assets/icon/gitea.svg', target: '_blank' },
	// { name: 'PhpMyAdmin', path: 'https://pma.colonq.cn:81', icon: '/src/assets/icon/pma.svg', target: '_blank' },
	// { name: 'Transmission', path: 'https://transmission.colonq.cn:81', icon: '/src/assets/icon/transmission.svg', target: '_blank' },
))

const download = () => {
	console.log('download')
	apiGetDownload('/api/file/download/VMware.vscode-boot-dev-pack-0.1.0.vsix', 'test1.vsix')
}
</script>

<template>
	<main class="main">
		<NavList :list="pages"></NavList>
		<button @click.stop="download">点击下载</button>
	</main>
</template>

<style scoped></style>