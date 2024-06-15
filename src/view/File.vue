<script setup>
import TitleButton from '@/comps/TitleButton.vue';
import { onMounted, ref } from 'vue';
import { apiGet } from '../utils/ajax';

const flist = ref(new Array())
const dlist = ref(new Array())

const add = () => console.log('add')
const selAll = () => console.log('selAll')
const selResv = () => console.log('selResv')
const del = () => console.log('del')
const prev = () => console.log('prev')
const buttons = ref(new Array(
	{ name: "上一文件夹", emit: 'last-tree', icon: '/src/assets/icon/last-menu.svg', permission: 'system:file:query' },
	{ name: "添加", emit: 'add', icon: '/src/assets/icon/file-add.svg', permission: 'system:file:add' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg', permission: 'system:file:delete' },
))

const loadFile = () => {
	let path = '/' + dlist.value.join('/')
	const callback = (res) => {
		flist.value = res.data.sort(sortFile)
	}
	apiGet(`/api/file/list${path}`, callback)
}

const sortFile = (a, b) => {
	// 文件夹在最前面，然后是按文件名排序
	if (a.dir === false && b.dir === true) {
		return 1
	} else if (a.dir === b.dir) {
		if (a.name < b.name) {
			return -1
		} else if (a.name > b.name) {
			return 1
		}
		return 0
	}
	return -1
}

onMounted(loadFile)
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del" @last-tree="prev">
		</TitleButton>
		<section class="page">
			<ul class="file-box">
				<li class="file" v-for="file in flist" :data-hide="file.hide" :title="file.name">
					<img width="100" height="60" :src="file.dir ? '/src/assets/icon/directory.svg' : '/src/assets/icon/file.svg'" :alt="file.name">
					<span class="name">{{ file.name }}</span>
				</li>
			</ul>
		</section>
	</main>
</template>

<style scoped>
ul.file-box {
	margin: 0.5em 0 0 0;
	padding: 0;
	width: 90%;
	list-style: none;
	display: flex;
}

ul.file-box li.file {
	margin: 1em 0 0 1em;
	display: flex;
	width: 100px;
	flex-direction: column;
	align-items: center;
}

ul.file-box li.file:hover {
	cursor: pointer;
	/* -webkit-transform: scale(1.1) translateY(-8px); */
	transform: scale(1.1) translateY(-8px);
}

ul.file-box li.file[data-hide='true'] {
	display: none;
}

ul.file-box li.file span.name {
	margin-top: 0.5em;
	text-align: center;
	text-overflow: ellipsis;
	overflow-x: hidden;
	white-space: nowrap;
	width: 100%;
}
</style>