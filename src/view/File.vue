<script setup>
import FileList from '@/comps/FileList.vue';
import FileSelect from '@/comps/FileSelect.vue';
import TitleButton from '@/comps/TitleButton.vue';
import UploadDialog from '@/comps/UploadDialog.vue';
import { apiDelete, apiGetDownload, apiPost, apiPut } from '@/utils/ajax';
import { isBlank } from '@/utils/public';
import { ref } from 'vue';

const fileList = ref(null)
const uploadDialog = ref(null)
const fileSelect = ref(null)

const buttons = ref(new Array(
	{ name: "新建", emit: 'mkdir', icon: '/src/assets/icon/floder-add.svg', permission: 'system:file:add' },
	{ name: "上传", emit: 'upload', icon: '/src/assets/icon/upload.svg', permission: 'system:file:add' },
	{ name: "下载", emit: 'download', icon: '/src/assets/icon/download.svg', permission: 'system:file:download' },
	{ name: "移动", emit: 'move', icon: '/src/assets/icon/move.svg', permission: 'system:file:edit' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg', permission: 'system:file:delete' },
))

const mkdir = () => {
	let folderName = prompt("请输入文件夹名字", "新建文件夹");
	if (!isBlank(folderName)) {
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
	fileSelect.value.showModal()
}
const moveStart = (targetPath, targetList) => {
	if (targetList.length > 1) {
		alert("最多只能选择一个目标路径")
		return
	}
	if (!isBlank(targetPath)) {
		for (let i = targetList.length; i > 0; i--) {
			targetList[i] = targetList[i - 1]
		}
		targetList[0] = targetPath
	}
	const curPath = getCurPath()
	const sourceArr = getSelectNames()
	if (sourceArr.length === 1) {
		const newName = prompt("请输入新文件名", sourceArr[0])
		targetList.push(newName)
	}
	const target = targetList.join('/')
	if (!isBlank(curPath)) {
		for (let i = 0; i < sourceArr.length; i++) {
			sourceArr[i] = `${curPath}/${sourceArr[i]}`
		}
	}
	const callback = (res) => {
		alert(res.message)
		loadFile()
		fileSelect.value.reloadFile()
	}
	apiPost(`/api/file/move/${target}`, sourceArr, callback)
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
		const callback = (res) => {
			alert(res.message)
			loadFile()
		}
		const curPath = getCurPath()
		if (selNames.length === 1) {
			const path = `${curPath}${curPath === '' ? '' : '/'}${selNames[0]}`
			const url = `/api/file/delete/${path}`
			apiDelete(url, null, callback)
		} else {
			const url = `/api/file/deleteBatch/${curPath}`
			apiDelete(url, selNames, callback)
		}
	}
}

const download = () => {
	const selNames = getSelectNames()
	if (selNames.length === 0) {
		alert("未选择要下载的文件")
		return
	}
	const curPath = getCurPath()
	selNames.forEach(fileName => {
		const path = `${curPath}${curPath === '' ? '' : '/'}${fileName}`
		apiGetDownload(`/api/file/download/${path}`, fileName)
	});
}

const loadFile = () => fileList.value.loadFile()
const getCurPath = () => fileList.value.getCurPath()
const getSelectNames = () => fileList.value.getSelectNames()
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @mkdir="mkdir" @upload="upload" @move="move" @sel-all="selAll" @sel-resv="selResv"
			@del="del" @download="download" :width="80" :height="48">
		</TitleButton>
		<FileList ref="fileList" :width="80" :height="48"></FileList>
		<UploadDialog ref="uploadDialog" @reload="loadFile"></UploadDialog>
		<FileSelect ref="fileSelect" @select="moveStart" selSingle></FileSelect>
	</main>
</template>

<style scoped></style>