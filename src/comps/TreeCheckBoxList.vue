<script setup>
import { isEmpty } from '@/utils/public';
import { toRaw } from 'vue';

const props = defineProps({
	elems: {
		type: Array,
		default: [],
	},
})

const boxChange = (event) => {
	const id = event.target.value
	const idIndex = toRaw(props.elems).map(item => item.id).indexOf(id)
	addAll(props.elems[idIndex].children, event.target.checked)
}
const addAll = (items = [], flag = true) => items.forEach(item => {
	flag ? model.value.add(item.id) : model.value.delete(item.id)
	if (!isEmpty(item.children)) addAll(item.children, flag)
})
const model = defineModel()
</script>

<template>
	<ul>
		<li v-for="elem in elems">
			<input type="checkbox" :value="elem.id" v-model="model" @change="boxChange" />
			<label>{{ elem.name }}</label>
			<TreeCheckBoxList v-if="elem.children" :elems="elem.children" v-model="model"></TreeCheckBoxList>
		</li>
	</ul>
</template>

<style scoped>
ul {
	list-style: none;
	padding: 0 0 0 1em;
}

ul li input[type="checkbox"] {
	width: auto;
	height: auto;
}
</style>