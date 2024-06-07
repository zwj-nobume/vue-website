<script setup>
import { apiPut, apiPost } from '@/utils/ajax.js';
import { ref, toRaw } from 'vue';

const props = defineProps({
	url: {
		type: Object,
		required: true,
	},
	elems: {
		type: Array,
		required: true,
	},
})
const emit = defineEmits([
	'reload-table',
])

const flag = ref(new String(''))
const form = ref(new Object())
const update = () => {
	let checked = true
	props.elems.forEach(elem => {
		if (elem.required && !form.value[elem.name]) {
			alert(`${elem.label}不能为空`)
			checked = false
		}
	})
	if (!checked) return false
	const callback = (res) => {
		alert(res.message)
		dialogRef.value.close()
		emit('reload-table')
	}
	if ('add' === flag.value) {
		apiPut(props.url.add, form.value, callback)
	}
	if ('edit' === flag.value) {
		apiPost(props.url.edit, form.value, callback)
	}
}

const dialogRef = ref(null)
const showModal = (sflag, params) => {
	let rawParams = toRaw(params)
	Object.keys(form.value).forEach(key => delete form.value[key])
	flag.value = sflag
	if (typeof rawParams !== 'undefined' && rawParams !== null) {
		Object.keys(rawParams).forEach(key => form.value[key] = rawParams[key])
	}
	dialogRef.value.showModal()
}

defineExpose({
	showModal,
})
</script>

<template>
	<dialog ref="dialogRef">
		<form method="dialog" @submit.prevent="update">
			<p v-for="elem in elems">
				<label v-if="elem.type !== 'hidden'">{{ elem.label }}:&emsp;</label>
				<input :name="elem.name" :type="elem.type" v-model="form[elem.name]" />
			</p>
			<p>
				<button class="cancel" type="button" @click="dialogRef.close">取消</button>
				<button class="submit" type="submit">提交</button>
			</p>
		</form>
	</dialog>
</template>

<style scoped>
dialog {
	border: 1px solid;
	border-radius: 5%;
	font-size: x-large;
}

dialog form p {
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
}

dialog form p button:first-child {
	margin-left: 0;
}

dialog form p button {
	flex: 1;
	margin-left: 5px;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: 15px;
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
	font-size: larger;
}
</style>