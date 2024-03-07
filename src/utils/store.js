import { createStore } from 'vuex'

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
		delTable(state) {
			let delTable = state.table.filter(tb => tb.selected)
			console.log(delTable)
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