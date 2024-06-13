<script setup>
import { apiGet, apiPost } from '@/utils/ajax.js';
import { ref, toRaw } from 'vue';

const linkUrl = ref('')
const form = ref(new Object())
const elems = ref(new Set())
const link = () => {
	const callback = (res) => {
		alert(res.message)
		dialogRef.value.close()
	}
	apiPost(linkUrl.value, form.value, callback)
}

const dialogRef = ref(null)
const showModal = (params) => {
	let rawParams = toRaw(params)
	form.value.id = rawParams.id
	let url = `${rawParams.tgtUrl}?${rawParams.idName}=${rawParams.id}`
	let callback = (res) => {
		form.value.ids = res.data
	}
	apiGet(url, callback)
	url = `${rawParams.allUrl}?pageSize=1000`
	callback = (res) => {
		elems.value.clear()
		res.data.forEach(item => {
			elems.value.add({
				id: item[rawParams.elemIdName],
				name: item[rawParams.elemName]
			})
		})
	}
	apiGet(url, callback)
	linkUrl.value = rawParams.linkUrl
	dialogRef.value.showModal()
}

defineExpose({
	showModal,
})
</script>

<template>
	<dialog ref="dialogRef">
		<form method="dialog" @submit.prevent="link">
			<input type="hidden" name="id" v-model="form.id">
			<ul>
				<li v-for="elem in elems" :data-id="elem.id">
					<input type="checkbox" v-model="form.ids" :value="elem.id" />
					<label>{{ elem.name }}</label>
				</li>
			</ul>
			<p>
				<button class="cancel" type="button" @click="dialogRef.close">取消</button>
				<button class="submit" type="submit">提交</button>
			</p>
		</form>
	</dialog>
</template>

<style scoped>
form ul {
	list-style: none;
	padding: 0 0 0 1em;
}

dialog {
	border: 1px solid;
	font-size: 1.2em;
	border-radius: 5%;
}

dialog form p {
	margin-bottom: 0;
	font-size: 1.2em;
	display: flex;
	flex-direction: column;
}

dialog form p button {
	flex: 1;
	margin-left: 5px;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: .5em;
}

dialog form p button.submit {
	background-color: orange;
}

dialog form p button.cancel {
	background-color: darkcyan;
}

dialog form p button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}

dialog form p input,
dialog form p button {
	font-size: large;
}
</style>