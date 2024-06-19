<script setup>
import { apiPutUpload } from '@/utils/ajax.js'
import { ref, toRaw } from 'vue';

const emit = defineEmits([
	'reload'
])

const flist = ref(new Array())
const path = ref('')

const selectFile = (e) => {
	flist.value = e.target.files
}

const upload = () => {
	let callback = (res) => {
		alert(res.message)
		if (200 === res.status) {
			dialogRef.value.close()
		}
		emit('reload')
	}
	apiPutUpload(`/api/file/upload${path.value}`, flist.value, callback)
}

const filesInput = ref(null)
const dialogRef = ref(null)
const showModal = (params) => {
	const rawParams = toRaw(params)
	if (typeof rawParams !== 'undefined') {
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
			<img src="/src/assets/icon/file-add.svg" alt="选择文件" width="100">
		</p>
		<p v-for="file in flist">{{ file.name }}</p>
		<p class="button">
			<button class="cancel" type="button" @click.stop="dialogRef.close">取消</button>
			<button class="upload" type="button" @click.stop="upload">上传</button>
		</p>
	</dialog>
</template>

<style scoped>
dialog {
	width: 30vw;
	border: 1px solid;
	border-radius: 5%;
	font-size: x-large;
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

dialog p.button {
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
}

dialog p.button button:first-child {
	margin-left: 0;
}

dialog p.button button {
	flex: 1;
	margin-left: 5px;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: 15px;
}

dialog p.button button.upload {
	background-color: orange;
}

dialog p.button button.cancel {
	background-color: darkcyan;
}

dialog p.button button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}

dialog p.button input,
dialog p.button button {
	font-size: larger;
}
</style>