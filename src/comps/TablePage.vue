<script setup>
import PageList from '@/comps/PageList.vue';
import { apiDelete, apiGet, apiPost } from '@/utils/ajax';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
	url: {
		type: Object,
		required: true,
	},
	idName: {
		type: String,
		required: true,
	},
	struct: {
		type: Array,
		required: true,
	},
	control: {
		type: Array,
		required: false
	},
})

const store = useStore()
const emit = defineEmits([
	'linkUser',
	'linkRole',
	'linkMenu',
	'edit',
])

const page = ref(null)
const table = ref(new Array())
const sortFlag = ref('')
const pageSize = ref(20)
const total = ref(0)
const sizeList = ref([10, 20, 30, 40, 50])
const loadTable = (pageNum) => {
	if (typeof pageNum === 'undefined' || pageNum === null) {
		pageNum = 1
		page.value.cur = 1
	}
	let params = {
		pageNum: pageNum,
		pageSize: pageSize.value,
	}
	if (sortFlag.value !== "") params.sortFlag = sortFlag.value
	let arr = new Array()
	Object.keys(params).forEach(key => arr.push(`${key}=${params[key]}`))
	apiGet(`${props.url.list}?${arr.join('&')}`, res => {
		table.value = res.data
		total.value = res.total
	})
}

const selectLine = (num) => {
	let line = table.value[num]
	let selected = line.selected
	selected ? line.selected = false : line.selected = true
}

const selAll = () => table.value.forEach(tb => tb.selected = true)
const selResv = () => table.value.forEach(tb => tb.selected = !tb.selected)

const upd = (num, td) => {
	if (!td.modifiable) return
	let line = table.value[num]
	let newVal = prompt(`${td.name}`, line[td.value])
	if (newVal === null) return
	if (newVal === line[td.value]) {
		alert("数据未修改")
		return
	}
	if (td.regexp && newVal.match(td.regexp) === null) {
		alert("输入格式不匹配")
		return
	}
	const data = new Object()
	data[props.idName] = line[props.idName]
	data[td.value] = newVal
	const callback = (res) => {
		alert(res.message)
		line[td.value] = newVal
	}
	apiPost(props.url.edit, data, callback)
}

const del = () => {
	let delTable = table.value.filter(tb => tb.selected)
	if (delTable.length === 0) {
		alert("请先选择需要删除的记录")
		return
	}
	if (window.confirm(`确认要删除选中的 ${delTable.length} 条记录吗?`)) {
		let ids = delTable.map(tb => tb[props.idName])
		const callback = (res) => {
			alert(res.message)
			loadTable()
		}
		apiDelete(props.url.delete, ids, callback)
	}
}

const ifNull = (item) => {
	return typeof item === 'undefined' || item === null
}

defineExpose({
	loadTable,
	selAll,
	selResv,
	del,
})

onMounted(() => loadTable())
</script>

<template>
	<section class="page">
		<table>
			<thead>
				<tr>
					<th v-for="td in struct">{{ td.name }}</th>
					<th v-if="!ifNull(control)">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(tr, i) in table" @click.stop="selectLine(i)" :class="{ selected: tr.selected }">
					<td v-for="td in struct" @dblclick.stop="upd(i, td)">{{ tr[td.value] }}</td>
					<td class="control" v-if="!ifNull(control)">
						<a href="javascript:void(0);"
							v-for="ctl in control.filter(item => !item.permission || store.state.permission.has(item.permission))"
							@click.stop="emit(ctl.emit, tr)">
							{{ ctl.name }}
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
	<p class="page">
	<div>
		<span>排序标识:&emsp;</span>
		<select v-model="sortFlag" @change="loadTable()">
			<option v-for="op in struct" :value="op.sortFlag">{{ op.name }}</option>
			<option v-for="op in struct" :value="op.sortFlag + ' DESC'">{{ op.name }} 倒序</option>
		</select>
		<span>每页数量:&emsp;</span>
		<select v-model="pageSize" @change="loadTable()">
			<option v-for="size in sizeList" :value="size">{{ size }}</option>
		</select>
	</div>
	<PageList ref="page" @load-page="loadTable" :total="total" :size="pageSize"></PageList>
	</p>
</template>

<style scoped>
table {
	width: 90%;
	table-layout: fixed;
}

table th,
table td {
	min-height: 2em;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow-x: hidden;
	user-select: none;
	border-bottom: 1px solid gray;
}

table tbody tr.selected,
table tbody tr:hover {
	background-color: rgba(128, 128, 128, 0.5);
}

table tbody tr td button {
	margin: 0;
	padding: 0;
	border: 0;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	font-size: 1em;
	background-color: orange;
}

table tbody tr td button:hover {
	filter: brightness(1.4);
	cursor: pointer;
}

p.page {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

p.page div {
	display: flex;
	align-items: center;
}

p.page div span {
	margin-left: 10px;
}

section.page,
p.page div select,
p.page ul {
	font-size: 1.3em;
}

table td.control {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

table td.control a {
	font-size: smaller;
	margin-top: 0.5em;
}

table td.control a:not(:first-child) {
	margin-left: 0.5em;
}
</style>