<script setup>
import TreeCheckBoxList from '@/comps/TreeCheckBoxList.vue';
import { apiGet, apiPost } from '@/utils/ajax';
import { isBlank, isNull } from '@/utils/public';
import { ref, toRaw } from 'vue';

const linkUrl = ref('')
const form = ref(new Object())
const elems = ref(new Array())
const link = () => {
	const data = {
		id: form.value.id,
		ids: Array.from(form.value.ids)
	}
	const callback = (res) => {
		alert(res.message)
		dialogRef.value.close()
	}
	apiPost(linkUrl.value, data, callback)
}

const dialogRef = ref(null)
const showModal = (params) => {
	const rawParams = toRaw(params)
	if (isNull(rawParams)) {
		alert("请先绑定参数")
		return
	}
	form.value.id = rawParams.id
	const lurl = `${rawParams.linked}?${rawParams.idName}=${rawParams.id}`
	const lcallback = (res) => {
		form.value.ids = new Set(res.data)
	}
	apiGet(lurl, lcallback)
	const url = `${rawParams.list}?pageSize=1000`
	const callback = (res) => {
		elems.value.length = 0
		const elemMap = new Map()
		res.data.forEach(item => {
			const elem = {
				id: item[rawParams.elemIdName],
				name: item[rawParams.elemName]
			}
			elemMap.set(elem.id, elem)
			if (!isBlank(item['parentId']) && elemMap.has(item['parentId'])) {
				const parentELem = elemMap.get(item['parentId'])
				if (isNull(parentELem['children'])) {
					parentELem['children'] = new Array()
				}
				parentELem['children'].push(elem)
			} else {
				elems.value.push(elem)
			}
		})
	}
	apiGet(url, callback)
	linkUrl.value = rawParams.link
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
dialog form>ul {
	max-height: 50vh;
	overflow-y: auto;
	scrollbar-width: thin;
}

dialog form p {
	margin-top: 0.5em;
	margin-bottom: 0;
	display: flex;
	flex-direction: column;
}

dialog form p button {
	flex: 1;
	margin-left: 5px;
	font-size: 1.2em;
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
</style>