<script setup>
import AddDialog from '@/comps/AddDialog.vue';
import TablePage from '@/comps/TablePage.vue';
import { ref } from 'vue';
import TitleButton from '../comps/TitleButton.vue';

const tablePage = ref(null)
const reloadTable = () => tablePage.value.loadTable()
const selAll = () => tablePage.value.selAll()
const selResv = () => tablePage.value.selResv()
const del = () => tablePage.value.del()
const buttons = ref(new Array(
	{ name: "添加", emit: 'add', icon: '/src/assets/icon/add-user.svg' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const addDialog = ref(null)
const elems = ref(new Array(
	{ name: 'userName', label: "用户名", type: 'text', required: true },
	{ name: 'password', label: "密码", type: 'password', required: true },
	{ name: 'email', label: "邮箱", type: 'email', required: true },
))
const add = () => addDialog.value.showModal()

const url = ref({
	list: '/api/user/page',
	add: '/api/user/add',
	edit: '/api/user/edit',
	delete: '/api/user/delete',
})
const idName = ref('userId')
const struct = ref(new Array(
	{ name: "用户名", value: 'userName', sortFlag: 'user_name', modifiable: true },
	{ name: "邮箱", value: 'email', sortFlag: 'email', modifiable: true, regexp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ },
	{ name: "创建人", value: 'createName', sortFlag: 'create_name' },
	{ name: "创建时间", value: 'createTime', sortFlag: 'create_time' },
))
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del">
		</TitleButton>
		<TablePage ref="tablePage" :url="url" :idName="idName" :struct="struct"></TablePage>
		<AddDialog ref="addDialog" :url="url" :elems="elems" @reload-table="reloadTable"></AddDialog>
	</main>
</template>

<style scoped></style>