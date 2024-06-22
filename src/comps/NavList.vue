<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

defineProps({
	list: {
		type: Array,
		required: true,
	},
	width: {
		type: Number,
		default: 100,
		required: false,
	},
	height: {
		type: Number,
		default: 60,
		required: false,
	},
})

const router = useRouter()
const store = useStore()

const clevent = (item) => {
	if (typeof item.target === 'string' && item.target === '_blank') {
		const a = document.createElement('a')
		a.target = item.target
		a.href = item.path
		a.click()
		return
	}
	router.push(item.path)
}
</script>

<template>
	<ul class="list">
		<li class="btn" @click.stop="router.go(-1)">
			<img src="@/assets/icon/back.svg" :width="width" :height="height">
			<span class="name">上一页</span>
		</li>
		<li class="btn"
			v-for="li in list.filter(item => !item.permission || store.state.permission.has(item.permission))"
			:style="{ 'width': width + 'px' }" :title="li.name" @click.stop="clevent(li)">
			<img :src="li.icon ? li.icon : '/src/assets/icon/box.svg'" :width="width" :height="height">
			<span class="name">{{ li.name }}</span>
		</li>
	</ul>
</template>

<style scoped>
ul.list {
	margin: 0;
	padding: 0;
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: flex-start;
	list-style: none;
	scrollbar-width: none;
}

ul.list li.btn {
	margin: 1.2em 0 0 1.2em;
	display: flex;
	user-select: none;
	flex-direction: column;
}

ul.list li.btn:hover {
	cursor: pointer;
	/* -webkit-transform: scale(1.1) translateY(-8px); */
	transform: scale(1.1) translateY(-8px);
}

ul.list li.btn span.name {
	margin-top: 0.5em;
	text-align: center;
	text-overflow: ellipsis;
	overflow-x: hidden;
	white-space: nowrap;
	width: 100%;
}
</style>