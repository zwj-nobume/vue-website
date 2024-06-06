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
	{ name: "添加", emit: 'add', icon: '/src/assets/icon/add-role.svg' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const addDialog = ref(null)
const elems = ref(new Array(
	{ name: 'roleName', label: "角色名", type: 'text', required: true },
	{ name: 'roleLabel', label: "角色标签", type: 'text', required: true },
))
const add = () => addDialog.value.showModal()

const openRoleMenu = () => { }

const url = ref({
	list: '/api/role/page',
	add: '/api/role/add',
	edit: '/api/role/edit',
	link: '/api/role/link',
	delete: '/api/role/delete',
})
const idName = ref('roleId')
const struct = ref(new Array(
	{ name: "角色名", value: 'roleName', sortFlag: 'role_name', modifiable: true },
	{ name: "角色标签", value: 'roleLabel', sortFlag: 'role_label', modifiable: true },
	{ name: "创建人", value: 'createName', sortFlag: 'create_name' },
	{ name: "创建时间", value: 'createTime', sortFlag: 'create_time' },
))
const control = ref(new Array(
	{ name: "角色权限", emit: 'role-menu' },
))
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del">
		</TitleButton>
		<TablePage ref="tablePage" :url="url" :idName="idName" :struct="struct" :control="control"
			@role-menu="openRoleMenu">
		</TablePage>
		<AddDialog ref="addDialog" :url="url" :elems="elems" @reload-table="reloadTable"></AddDialog>
	</main>
</template>

<style scoped></style>