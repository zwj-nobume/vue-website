<script setup>
import TreeCheckBoxList from '@/comps/TreeCheckBoxList.vue';
import { apiGet, apiPost } from '@/utils/ajax';
import { ref, toRaw } from 'vue';

const linkUrl = ref('')
const form = ref(new Object())
const elems = ref(new Array())
const link = () => {
	const callback = (res) => {
		alert(res.message)
		dialogRef.value.close()
	}
	apiPost(linkUrl.value, form.value, callback)
}

const dialogRef = ref(null)
const showModal = (params) => {
	const rawParams = toRaw(params)
	if (typeof rawParams === 'undefined') {
		alert("请先绑定参数")
		return
	}
	form.value.id = rawParams.id
	let url = `${rawParams.tgtUrl}?${rawParams.idName}=${rawParams.id}`
	let callback = (res) => {
		form.value.ids = res.data
	}
	apiGet(url, callback)
	url = `${rawParams.allUrl}?pageSize=1000`
	callback = (res) => {
		elems.value.length = 0
		let elemMap = new Map()
		res.data.forEach(item => {
			let elem = {
				id: item[rawParams.elemIdName],
				name: item[rawParams.elemName]
			}
			elemMap.set(elem.id, elem)
			if (typeof item['parentId'] !== 'undefined' && elemMap.has(item['parentId'])) {
				let parentELem = elemMap.get(item['parentId'])
				if (typeof parentELem['children'] === 'undefined') {
					parentELem['children'] = new Array()
				}
				parentELem['children'].push(elem)
			} else {
				elems.value.push(elem)
			}
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
			<TreeCheckBoxList :elems="elems" v-model="form.ids"></TreeCheckBoxList>
			<p>
				<button class="cancel" type="button" @click.stop="dialogRef.close">取消</button>
				<button class="submit" type="submit">提交</button>
			</p>
		</form>
	</dialog>
</template>

<style scoped>
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