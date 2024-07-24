<script setup>
import PageList from '@/comps/PageList.vue';
import { apiDelete, apiGet, apiPost } from '@/utils/ajax';
import { isBlank, isNull } from '@/utils/public';
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
		required: false,
	},
	sortFlag: {
		type: String,
		default: 'create_time',
		required: false,
	},
	pageSize: {
		type: Number,
		default: 20,
		required: false,
	}
})

const store = useStore()
const emit = defineEmits([
	'linkUser',
	'linkRole',
	'linkMenu',
	'edit',
	'func0',
	'func1',
	'func2',
	'func3',
	'func4',
	'func5',
	'func6',
	'func7',
	'func8',
	'func9',
])

const page = ref(null)
const table = ref(new Array())
const searchForm = ref({
	sortFlag: props.sortFlag,
	pageSize: props.pageSize,
})
const total = ref(0)
const sizeList = ref([10, 20, 30, 40, 50])
const dictMap = ref(new Map())

const loadTable = (pageNum) => {
	if (isNull(pageNum)) {
		pageNum = 1
		page.value.cur = 1
	}
	searchForm.value.pageNum = pageNum
	const arr = new Array()
	Object.keys(searchForm.value).forEach(key => arr.push(`${key}=${searchForm.value[key]}`))
	apiGet(`${props.url.list}?${arr.join('&')}`, res => {
		table.value = res.data
		total.value = res.total
	})
}

const selectLine = (num) => {
	const line = table.value[num]
	const selected = line.selected
	selected ? line.selected = false : line.selected = true
}

const selAll = () => table.value.forEach(tb => tb.selected = true)
const selResv = () => table.value.forEach(tb => tb.selected = !tb.selected)

const upd = (num, td) => {
	if (!td.modifiable) return
	const line = table.value[num]
	const newVal = prompt(`${td.name}`, line[td.value])
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
	const delTable = table.value.filter(tb => tb.selected)
	if (delTable.length === 0) {
		alert("请先选择需要删除的记录")
		return
	}
	if (confirm(`确认要删除选中的 ${delTable.length} 条记录吗?`)) {
		const ids = delTable.map(tb => tb[props.idName])
		const callback = (res) => {
			alert(res.message)
			loadTable()
		}
		apiDelete(props.url.delete, ids, callback)
	}
}

defineExpose({
	loadTable,
	selAll,
	selResv,
	del,
})

onMounted(() => {
	props.struct.forEach(item => {
		if (!isBlank(item.dict)) {
			store.getters.getDict(item.dict).then(res => {
				if (!isNull(res)) dictMap.value.set(item.dict, res)
			})
		}
	})
	loadTable()
})
</script>

<template>
	<section class="page">
		<table>
			<thead>
				<tr>
					<th v-for="td in struct">{{ td.name }}</th>
					<th v-if="!isNull(control)">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(tr, i) in table" @click.stop="selectLine(i)" :class="{ selected: tr.selected }">
					<td v-for="td in struct" @dblclick.stop="upd(i, td)"
						:title="isBlank(td.dict) ? tr[td.value] : dictMap.get(td.dict)[tr[td.value]]">
						{{ isBlank(td.dict) ? tr[td.value] : dictMap.get(td.dict)[tr[td.value]] }}
					</td>
					<td class="control" v-if="!isNull(control)">
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
	<ul>
		<li>
			<select v-model="searchForm.sortFlag" @change="loadTable()">
				<option value="">排序标识</option>
				<option value="" disabled>=====</option>
				<option v-for="op in struct" :value="op.sortFlag">{{ op.name }}</option>
				<option v-for="op in struct" :value="op.sortFlag + ' DESC'">{{ op.name }} 倒序</option>
			</select>
		</li>
		<li>
			<select v-model="searchForm.pageSize" @change="loadTable()">
				<option value="">每页数量</option>
				<option value="" disabled>=====</option>
				<option v-for="size in sizeList" :value="size">{{ size }}</option>
			</select>
		</li>
		<li v-for="search in struct.filter(item => item.search)">
			<select v-if="search.dict" v-model="searchForm[search.value]" @change="loadTable()">
				<option value="">{{ search.name }}</option>
				<option value="" disabled>=====</option>
				<option v-for="op in dictMap.has(search.dict) ? Object.keys(dictMap.get(search.dict)) : []" :value="op">
					{{ dictMap.has(search.dict) ? dictMap.get(search.dict)[op] : '' }}
				</option>
			</select>
			<input v-if="!search.dict" v-model="searchForm[search.value]" @change="loadTable()"
				:type="search.type ? search.type : 'text'" :placeholder="search.name">
		</li>
	</ul>
	<PageList ref="page" @load-page="loadTable" :total="total" :size="searchForm.pageSize"></PageList>
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

p.page>ul:not(:last-child) {
	display: flex;
	flex: 1;
	align-items: center;
	list-style: none;
	margin: 0;
	padding: 0;
}

p.page>ul>li {
	margin-left: 10px;
}

p.page>ul>li select {
	width: auto;
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