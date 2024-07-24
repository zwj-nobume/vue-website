<script setup>
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
	parentName: {
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
	'next',
	'linkRole',
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

const table = ref(new Array())
const parentId = ref([''])
const sortFlag = ref('create_time')
const dictMap = ref(new Map())

const loadTable = (item) => {
	if (!isNull(item) && !isNull(item[props.idName])) parentId.value.push(item[props.idName])
	const params = new Object()
	params[props.parentName] = getLastParentId()
	if (sortFlag.value !== '') params.sortFlag = sortFlag.value
	const arr = new Array()
	Object.keys(params).forEach(key => arr.push(`${key}=${params[key]}`))
	apiGet(`${props.url.list}?${arr.join('&')}`, res => {
		table.value = res.data
	})
}

const loadLastTable = () => {
	if (parentId.value.length <= 1) return
	parentId.value.pop()
	loadTable()
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

const getLastParentId = () => {
	const lastParentId = parentId.value[parentId.value.length - 1]
	return lastParentId === '' ? 'NULL' : lastParentId
}

defineExpose({
	getLastParentId,
	loadTable,
	loadLastTable,
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
						{{ isBlank(td.dict) ? tr[td.value] : dictMap.get(td.dict)[tr[td.value]] }}</td>
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
		<span>排序标识:&emsp;</span>
		<select v-model="sortFlag" @change="loadTable()">
			<option v-for="op in struct" :value="op.sortFlag">{{ op.name }}</option>
			<option v-for="op in struct" :value="op.sortFlag + ' DESC'">{{ op.name }} 倒序</option>
		</select>
	</p>
</template>

<style scoped>
table {
	width: 90%;
	table-layout: fixed;
}

table th,
table td {
	height: 2em;
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
	align-items: center;
}

p.page span {
	margin-left: 10px;
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