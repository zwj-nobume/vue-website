<script setup>
import TitleButton from '@/comps/TitleButton.vue';
import { apiGet, apiPut } from '@/utils/ajax';
import { onMounted, ref } from 'vue';

const flist = ref(new Array())
const dlist = ref(new Array())
const selItem = ref(new Set())

const buttons = ref(new Array(
	{ name: "上一文件夹", emit: 'last-tree', icon: '/src/assets/icon/last-menu.svg', permission: 'system:file:query' },
	{ name: "添加文件夹", emit: 'mkdir', icon: '/src/assets/icon/floder-add.svg', permission: 'system:file:add' },
	{ name: "上传文件", emit: 'upload', icon: '/src/assets/icon/upload.svg', permission: 'system:file:add' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg', permission: 'system:file:delete' },
))

const mkdir = () => {
	let folderName = prompt("请输入文件夹名字", "新建文件夹");
	if (folderName != null && folderName != "") {
		dlist.value.push(folderName)
		let path = '/' + dlist.value.join('/')
		const callback = (res) => {
			alert(res.message)
			dlist.value.pop()
			loadFile()
		}
		apiPut(`/api/file/mkdir${path}`, null, callback)
	}
}

const upload = () => console.log('upload')

const sel = (name) => {
	if (selItem.value.has(name)) {
		selItem.value.delete(name)
	} else {
		selItem.value.add(name)
	}
}

const selAll = () => {
	flist.value.forEach(file => {
		selItem.value.add(file.name)
	})
}

const selResv = () => {
	flist.value.forEach(file => {
		sel(file.name)
	})
}

const del = () => console.log('del')
const prev = () => {
	if (dlist.value.length != 0) {
		dlist.value.pop()
		loadFile()
	}
}

const next = (file) => {
	if (file.dir === true) {
		dlist.value.push(file.name)
		loadFile()
	}
}

const loadFile = () => {
	let path = '/' + dlist.value.join('/')
	const callback = (res) => {
		flist.value = res.data.sort(sortFile)
		selItem.value.clear()
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
		<TitleButton :list="buttons" @mkdir="mkdir" @upload="upload" @sel-all="selAll" @sel-resv="selResv" @del="del"
			@last-tree="prev">
		</TitleButton>
		<section class="page">
			<ul class="file-box">
				<li :class="{ 'file': true, 'selected': selItem.has(file.name) }" v-for="file in flist"
					:data-hide="file.hide" @click.stop="sel(file.name)" @dblclick.stop="next(file)" :title="file.name">
					<img width="100" height="60"
						:src="file.dir ? '/src/assets/icon/directory.svg' : '/src/assets/icon/file.svg'"
						:alt="file.name">
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
	padding: 0.5em;
	border-radius: 10px;
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

ul.file-box li.file.selected {
	border: 1px solid;
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