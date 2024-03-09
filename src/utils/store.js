import { createStore } from 'vuex'
import { apiDelete } from '@/utils/ajax'
import { router } from '@/utils/router'

const token = localStorage.getItem('token')
const permission = localStorage.getItem('permission')

const store = createStore({
	state() {
		return {
			token: token,
			permission: new Set(permission === null ? [] : permission.split(';')),
			table: new Array(),
		}
	},
	mutations: {
		setToken(state, payload) {
			state.token = payload.token
			state.permission.clear()
			payload.permission.forEach(item => state.permission.add(item))
			localStorage.setItem('token', payload.token)
			localStorage.setItem('permission', payload.permission.join(';'))
		},
		deleteToken(state) {
			state.token = ''
			state.permission.clear()
			localStorage.removeItem('token')
			localStorage.removeItem('permission')
		},
		setTable(state, payload) {
			state.table = payload
		},
		selAllTable(state) {
			state.table.forEach(tb => tb.selected = true)
		},
		selResvTable(state) {
			state.table.forEach(tb => tb.selected = !tb.selected)
		},
		delTable(state, payload) {
			let delTable = state.table.filter(tb => tb.selected)
			if (delTable.length === 0) {
				alert("请先选择需要删除的记录")
				return
			}
			if (window.confirm(`确认要删除选中的 ${delTable.length} 条记录吗?`)) {
				let ids = delTable.map(tb => tb[payload.idName])
				const callback = (res) => {
					alert(res.message)
					router.go(0)
				}
				apiDelete(payload.url, ids, callback)
			}
		}
	},
	getters: {
		getToken(state) {
			return state.token
		},
		getPermission(state) {
			return state.permission
		},
		getTable(state) {
			return state.table
		}
	}
})

export { store }