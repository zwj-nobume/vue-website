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
	{ name: "添加", emit: 'add', icon: '/src/assets/icon/add-user.svg' },
	{ name: "全选", emit: 'sel-all', icon: '/src/assets/icon/sel-all.svg' },
	{ name: "反选", emit: 'sel-resv', icon: '/src/assets/icon/sel-resv.svg' },
	{ name: "删除", emit: 'del', icon: '/src/assets/icon/delete.svg' },
))

const addDialog = ref(null)
const editDialog = ref(null)
const linkDialog = ref(null)
const addElems = ref(new Array(
	{ name: 'userName', label: "用户名", type: 'text', required: true },
	{ name: 'password', label: "密码", type: 'password', required: true },
	{ name: 'email', label: "邮箱", type: 'email', required: true },
))
const editElems = ref(new Array(
	{ name: 'userName', label: "用户名", type: 'text', required: true },
	{ name: 'email', label: "邮箱", type: 'email', required: true },
))
const add = () => addDialog.value.showModal('add')
const edit = (item) => editDialog.value.showModal('edit', item)
const openLinkRole = (item) => {
	const params = {
		id: item.userId,
		idName: 'userId',
		elemIdName: 'roleId',
		elemName: 'roleLabel',
		linked: '/api/user/roleIds',
		list: '/api/role/page',
		link: '/api/user/link',
	}
	linkDialog.value.showModal(params)
}

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
const control = ref(new Array(
	{ name: "角色", emit: 'linkRole' },
	{ name: "修改", emit: 'edit' },
))
</script>

<template>
	<main class="main">
		<TitleButton :list="buttons" @add="add" @sel-all="selAll" @sel-resv="selResv" @del="del"></TitleButton>
		<TablePage ref="tablePage" :url="url" :idName="idName" :struct="struct" :control="control"
			@linkRole="openLinkRole" @edit="edit">
		</TablePage>
		<UpdateDialog ref="addDialog" :url="url" :elems="addElems" @reload-table="reloadTable"></UpdateDialog>
		<UpdateDialog ref="editDialog" :url="url" :elems="editElems" @reload-table="reloadTable"></UpdateDialog>
		<LinkDialog ref="linkDialog" :url="url"></LinkDialog>
	</main>
</template>

<style scoped></style>