<script setup>
import { apiPost, apiPut } from '@/utils/ajax';
import { isNull } from '@/utils/public';
import { ref, toRaw } from 'vue';

const props = defineProps({
	url: {
		type: Object,
		required: true,
	},
	idName: {
		type: String,
		required: true,
	},
	elems: {
		type: Array,
		required: true,
	},
})
const emit = defineEmits([
	'reload-table',
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

const flag = ref('')
const form = ref({})
const old = ref({})
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
		apiPut(props.url[flag.value], form.value, callback)
	}
	if ('edit' === flag.value || 'editpwd' === flag.value) {
		const data = {}
		data[props.idName] = old.value[props.idName]
		props.elems.forEach(elem => {
			if (form.value[elem.name] !== old.value[elem.name]) data[elem.name] = form.value[elem.name]
		})
		apiPost(props.url[flag.value], data, callback)
	}
}

const dialogRef = ref(null)
const showModal = (params, sflag = 'add') => {
	const rawParams = toRaw(params)
	form.value = {}
	flag.value = sflag
	if (!isNull(rawParams)) {
		Object.assign(form.value, rawParams)
		Object.assign(old.value, rawParams)
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
				<input v-if="isNull(elem.item) || 'input' === elem.item" :name="elem.name" :type="elem.type"
					v-model="form[elem.name]" />
				<select v-if="'select' === elem.item" :name="elem.name" v-model="form[elem.name]">
					<option v-for="option in elem.options" :value="option.value">{{ option.text }}</option>
				</select>
			</p>
			<p class="btn-list">
				<button class="cancel" type="button" @click.stop="dialogRef.close">取消</button>
				<button class="submit" type="submit">提交</button>
			</p>
		</form>
	</dialog>
</template>

<style scoped>
dialog form p {
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
}

dialog form p label {
	width: 30%;
	display: flex;
	justify-content: flex-end;
}

dialog form p.btn-list button:first-child {
	margin-left: 0;
}

dialog form p.btn-list button {
	flex: 1;
	margin-left: 5px;
	padding: 0;
	border: 0;
	border-radius: 8px;
	margin-top: 15px;
	font-size: 1.2em;
}

dialog form p.btn-list button.submit {
	background-color: orange;
}

dialog form p.btn-list button.cancel {
	background-color: darkcyan;
}

dialog form p.btn-list button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}

dialog form p select,
dialog form p input {
	flex: 1;
}
</style>