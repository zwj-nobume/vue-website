<script setup>
import AddDialog from '@/comps/AddDialog.vue';
import TablePage from '@/comps/TablePage.vue';
import TitleButton from '@/comps/TitleButton.vue';
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
const elems = ref(new Array(
	{ name: 'albumName', label: "专辑名称", type: 'text', required: true },
	{ name: 'albumPath', label: "专辑路径", type: 'text', required: true },
	{ name: 'albumCover', label: "专辑封面", type: 'text' },
))
const add = () => addDialog.value.showModal()

const url = ref({
	list: '/api/album/list',
	add: '/api/album/add',
	edit: '/api/album/edit',
	delete: '/api/album/delete',
})
const idName = ref('albumId')
const struct = ref(new Array(
	{ name: "专辑名称", value: 'albumName', sortFlag: 'ai.album_name', modifiable: true },
	{ name: "专辑路径", value: 'albumPath', sortFlag: 'ai.album_path', modifiable: true },
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