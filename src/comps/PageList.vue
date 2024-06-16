<script setup>
import { ref } from 'vue';

const props = defineProps({
	total: {
		type: Number,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
})
const emit = defineEmits([
	'load-page'
])

const cur = ref(1)
const midSize = 5
const midNum = (midSize + 1) / 2

const loadPage = (num) => {
	if (num === cur.value) return
	cur.value = num
	emit('load-page', num)
}

const lastPage = () => {
	if (cur.value <= 1) return
	loadPage(cur.value - 1)
}

const nextPage = () => {
	if (cur.value >= Math.ceil(props.total / props.size)) return
	loadPage(cur.value + 1)
}

defineExpose({
	cur,
})
</script>

<template>
	<ul>
		<li @click.stop="lastPage">&lt;</li>
		<li :class="{ hide: (cur - midNum + 1) <= 1 }" @click.stop="loadPage(1)">1</li>
		<span v-if="(cur - midNum + 1) > 2">...</span>
		<li :class="{
			cur: cur === (cur - midNum + i),
			hide: 0 >= (cur - midNum + i) || (cur - midNum + i) > Math.ceil(total / size),
		}" @click.stop="loadPage(cur - midNum + i)" v-for="i in midSize">
			{{ cur - midNum + i }}
		</li>
		<span v-if="(cur + midNum - 1) < Math.ceil(total / size) - 1">...</span>
		<li :class="{ hide: (cur + midNum - 1) >= Math.ceil(total / size) }" @click.stop="loadPage(Math.ceil(total / size))">
			{{ Math.ceil(total / size) }}
		</li>
		<li @click.stop="nextPage">&gt;</li>
	</ul>
</template>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	margin-right: 0.8em;
}

ul li {
	user-select: none;
	background-color: darkcyan;
	margin-right: 0.8em;
	padding-left: 0.6em;
	padding-right: 0.6em;
	border-radius: 5px;
}

ul span {
	margin-right: 0.8em;
}

ul li:last-child {
	margin-right: 0;
}

ul li.cur {
	filter: brightness(1.4);
}

ul li.hide {
	display: none;
}

ul li:hover {
	filter: brightness(1.4);
	cursor: pointer;
}
</style>