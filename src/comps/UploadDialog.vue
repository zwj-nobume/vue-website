<script setup>
import { apiPutUpload } from '@/utils/ajax';
import { isNull } from '@/utils/public';
import { ref, toRaw } from 'vue';

const emit = defineEmits([
	'reload',
	'func0',
	'func1',
	'func2',
	'func3',
	'func4',
	'func5',
	'func6',
	'func7',
	'func8',
	'func9',
])

const flist = ref(new Array())
const path = ref('')
const uploading = ref(false)

const selectFile = (e) => {
	flist.value = e.target.files
}

const upload = () => {
	const callback = (res) => {
		alert(res.message)
		if (200 === res.status) {
			flist.value = []
			dialogRef.value.close()
		}
		uploading.value = false
		emit('reload')
	}
	uploading.value = true
	apiPutUpload(`/api/file/upload/${path.value}`, flist.value, callback)
}

const filesInput = ref(null)
const dialogRef = ref(null)
const showModal = (params) => {
	const rawParams = toRaw(params)
	if (!isNull(rawParams)) {
		path.value = rawParams.path
	}
	dialogRef.value.showModal()
}

defineExpose({
	showModal,
})
</script>

<template>
	<dialog ref="dialogRef">
		<input ref="filesInput" type="file" name="files" @change="selectFile" multiple hidden>
		<p class="choose" @click.stop="filesInput.click">
			<img :class="{ 'hide': uploading }" src="/src/assets/icon/file-add.svg" alt="选择文件" width="98">
		<div :class="{ 'loading': uploading }"></div>
		</p>
		<p v-for="file in flist">{{ file.name }}</p>
		<p class="btn-list">
			<button class="cancel" type="button" @click.stop="dialogRef.close">取消</button>
			<button class="upload" type="button" @click.stop="upload">上传</button>
		</p>
	</dialog>
</template>

<style scoped>
dialog {
	width: 30vw;
}

dialog p.choose {
	margin: 0;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	border: 1px dashed;
}

dialog p.choose:hover {
	background-color: cornsilk;
	cursor: pointer;
}

dialog p.btn-list {
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
}

dialog p.btn-list button:first-child {
	margin-left: 0;
}

dialog p.btn-list button {
	flex: 1;
	margin-left: 5px;
	font-size: 1.2em;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: 15px;
}

dialog p.btn-list button.upload {
	background-color: orange;
}

dialog p.btn-list button.cancel {
	background-color: darkcyan;
}

dialog p.btn-list button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}
</style>