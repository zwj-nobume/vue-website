<script setup>
import FileList from '@/comps/FileList.vue';
import TitleButton from '@/comps/TitleButton.vue';
import UploadDialog from '@/comps/UploadDialog.vue';
import { apiDelete, apiPut } from '@/utils/ajax';
import { ref } from 'vue';

const fileList = ref(null)
const uploadDialog = ref(null)

const buttons = ref(new Array(
	{ name: "添加文件夹", emit: 'mkdir', icon: '/src/assets/icon/floder-add.svg', permission: 'system:file:add' },
	{ name: "上传文件", emit: 'upload', icon: '/src/assets/icon/upload.svg', permission: 'system:file:add' },
	{ name: "移动", emit: 'move', icon: '/src/assets/icon/move.svg', permission: 'system:file:edit' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg', permission: 'system:file:delete' },
))

const mkdir = () => {
	let folderName = prompt("请输入文件夹名字", "新建文件夹");
	if (typeof folderName !== 'undefined' && folderName != null && folderName != "") {
		const curPath = getCurPath()
		const path = `${curPath}${curPath === '' ? '' : '/'}${folderName}`
		const callback = (res) => {
			alert(res.message)
			loadFile()
		}
		apiPut(`/api/file/mkdir/${path}`, null, callback)
	}
}

const upload = () => uploadDialog.value.showModal({ path: getCurPath() })

const move = () => {
	const selNames = getSelectNames()
	if (selNames.length === 0) {
		alert("未选择要移动的文件或文件夹")
		return
	}
}

const selAll = () => fileList.value.selAll()
const selResv = () => fileList.value.selResv()

const del = () => {
	const selNames = getSelectNames()
	if (selNames.length === 0) {
		alert("未选择要删除的文件或文件夹")
		return
	}
	if (confirm("确定要删除选择的文件或文件夹吗?")) {
		let callback = (res) => {
			alert(res.message)
			loadFile()
		}
		const curPath = getCurPath()
		if (selNames.length === 1) {
			const path = `${curPath}${curPath === '' ? '' : '/'}${selNames[0]}`
			let url = `/api/file/delete/${path}`
			apiDelete(url, null, callback)
		} else {
			let url = `/api/file/deleteBatch/${curPath}`
			apiDelete(url, selNames, callback)
		}
	}
}

const loadFile = () => fileList.value.loadFile()
const getCurPath = () => fileList.value.getCurPath()
const getSelectNames = () => fileList.value.getSelectNames()
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @mkdir="mkdir" @upload="upload" @move="move" @sel-all="selAll" @sel-resv="selResv"
			@del="del">
		</TitleButton>
		<FileList ref="fileList"></FileList>
		<UploadDialog ref="uploadDialog" @reload="loadFile"></UploadDialog>
	</main>
</template>

<style scoped></style>