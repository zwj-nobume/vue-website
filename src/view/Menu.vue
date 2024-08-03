<script setup>
import LinkDialog from '@/comps/LinkDialog.vue';
import TitleButton from '@/comps/TitleButton.vue';
import TreeTable from '@/comps/TreeTable.vue';
import UpdateDialog from '@/comps/UpdateDialog.vue';
import { ref } from 'vue';

const treeTable = ref(null)
const reloadTable = (item) => treeTable.value.loadTable(item)
const loadLastTable = () => treeTable.value.loadLastTable()
const selAll = () => treeTable.value.selAll()
const selResv = () => treeTable.value.selResv()
const del = () => treeTable.value.del()
const buttons = ref(new Array(
	{ name: "上一菜单", emit: 'last-tree', icon: '/src/assets/icon/last-menu.svg' },
	{ name: "添加", emit: 'add', icon: '/src/assets/icon/add-menu.svg' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const updateDialog = ref(null)
const linkDialog = ref(null)
const elems = ref(new Array(
	{ name: 'menuName', label: "菜单名称", type: 'text', required: true },
	{ name: 'menuLabel', label: "菜单标签", type: 'text', required: true },
	{ name: 'permission', label: "权限标识", type: 'text', required: true },
))
const add = () => updateDialog.value.showModal({
	parentId: treeTable.value.getLastParentId()
})
const edit = (item) => updateDialog.value.showModal(item, 'edit')
const openLinkRole = (item) => {
	const params = {
		id: item.menuId,
		idName: 'menuId',
		elemIdName: 'roleId',
		elemName: 'roleLabel',
		linked: '/api/menu/roleIds',
		list: '/api/role/page',
		link: '/api/menu/link',
	}
	linkDialog.value.showModal(params)
}

const url = ref({
	list: '/api/menu/page',
	add: '/api/menu/add',
	edit: '/api/menu/edit',
	delete: '/api/menu/delete',
})
const idName = ref('menuId')
const parentName = ref('parentId')
const struct = ref(new Array(
	{ name: "菜单名称", value: 'menuName', sortFlag: 'menu_name', modifiable: true, search: true },
	{ name: "菜单标签", value: 'menuLabel', sortFlag: 'menu_label', modifiable: true, search: true },
	{ name: "权限标识", value: 'permission', modifiable: true, search: true },
	{ name: "创建人", value: 'createName', sortFlag: 'create_name', search: true },
	{ name: "创建时间", value: 'createTime', sortFlag: 'create_time' },
))
const control = ref(new Array(
	{ name: "子菜单", emit: 'next' },
	{ name: "角色", emit: 'linkRole' },
	{ name: "修改", emit: 'edit' },
))
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @last-tree="loadLastTable" @add="add" @sel-all="selAll" @sel-resv="selResv"
			@del="del">
		</TitleButton>
		<TreeTable ref="treeTable" :url="url" :idName="idName" :parentName="parentName" :struct="struct"
			@linkRole="openLinkRole" :control="control" @next="reloadTable" @edit="edit">
		</TreeTable>
		<UpdateDialog ref="updateDialog" :url="url" :idName="idName" :elems="elems" @reload-table="reloadTable">
		</UpdateDialog>
		<LinkDialog ref="linkDialog" :url="url"></LinkDialog>
	</main>
</template>

<style scoped></style>