<script setup>
const props = defineProps({
	url: {
		type: Object,
		required: true
	},
})

const form = ref(new Object())
const elems = ref(new Array())
const link = () => { }

const dialogRef = ref(null)
const showModal = (params) => {
	dialogRef.value.showModal()
}

defineExpose({
	showModal,
})
</script>

<template>
	<dialog ref="dialogRef">
		<form method="dialog" @submit.prevent="link">
			<input type="text" name="id" v-model="form[id]">
			<ul>
				<li v-for="elem in elems"></li>
			</ul>
			<p>
				<button class="cancel" type="button" @click="dialogRef.close">取消</button>
				<button class="submit" type="submit">提交</button>
			</p>
		</form>
	</dialog>
</template>

<style scoped></style>