<script setup>
const props = defineProps({
	elems: {
		type: Array,
		default: [],
	},
})

const model = defineModel()
</script>

<template>
	<ul>
		<li v-for="elem in elems">
			<input type="checkbox" :value="elem.id" v-model="model" />
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
</style>