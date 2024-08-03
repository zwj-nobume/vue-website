<script setup>
import LinkDialog from '@/comps/LinkDialog.vue';
import TablePage from '@/comps/TablePage.vue';
import TitleButton from '@/comps/TitleButton.vue';
import UpdateDialog from '@/comps/UpdateDialog.vue';
import { ref } from 'vue';

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

const updateDialog = ref(null)
const linkDialog = ref(null)
const elems = ref(new Array(
	{ name: 'roleName', label: "角色名", type: 'text', required: true },
	{ name: 'roleLabel', label: "角色标签", type: 'text', required: true },
))
const add = () => updateDialog.value.showModal()
const edit = (item) => updateDialog.value.showModal(item, 'edit')
const openLinkUser = (item) => {
	const params = {
		id: item.roleId,
		idName: 'roleId',
		elemIdName: 'userId',
		elemName: 'userName',
		linked: '/api/role/userIds',
		list: '/api/user/page',
		link: '/api/role/linkUR',
	}
	linkDialog.value.showModal(params)
}
const openLinkMenu = (item) => {
	const params = {
		id: item.roleId,
		idName: 'roleId',
		elemIdName: 'menuId',
		elemName: 'menuLabel',
		linked: '/api/role/menuIds',
		list: '/api/menu/page',
		link: '/api/role/linkRM',
	}
	linkDialog.value.showModal(params)
}

const url = ref({
	list: '/api/role/page',
	add: '/api/role/add',
	edit: '/api/role/edit',
	delete: '/api/role/delete',
})
const idName = ref('roleId')
const struct = ref(new Array(
	{ name: "角色名", value: 'roleName', sortFlag: 'role_name', modifiable: true, search: true },
	{ name: "角色标签", value: 'roleLabel', sortFlag: 'role_label', modifiable: true, search: true },
	{ name: "创建人", value: 'createName', sortFlag: 'create_name', search: true },
	{ name: "创建时间", value: 'createTime', sortFlag: 'create_time' },
))
const control = ref(new Array(
	{ name: "用户", emit: 'linkUser' },
	{ name: "菜单", emit: 'linkMenu' },
	{ name: "修改", emit: 'edit' },
))
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del"></TitleButton>
		<TablePage ref="tablePage" :url="url" :idName="idName" :struct="struct" :control="control"
			@linkUser="openLinkUser" @linkMenu="openLinkMenu" @edit="edit">
		</TablePage>
		<UpdateDialog ref="updateDialog" :url="url" :idName="idName" :elems="elems" @reload-table="reloadTable">
		</UpdateDialog>
		<LinkDialog ref="linkDialog" :url="url"></LinkDialog>
	</main>
</template>

<style scoped></style>