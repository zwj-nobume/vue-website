import { createStore } from 'vuex'

const token = localStorage.getItem('token')
const permission = localStorage.getItem('permission')

const store = createStore({
	state() {
		return {
			token: token,
			permission: new Set(permission === null ? [] : permission.split(';')),
		}
	},
	mutations: {
		setToken(state, payload) {
			state.token = payload
			localStorage.setItem('token', payload)
		},
		deleteToken(state) {
			state.token = ''
			localStorage.removeItem('token')
		},
		setPermission(state, payload) {
			state.permission.clear()
			payload.forEach(item => state.permission.add(item))
			localStorage.setItem('permission', payload.join(';'))
		},
		deletePermission(state) {
			state.permission.clear()
			localStorage.removeItem('permission')
		},
	},
	getters: {
		getToken(state) {
			return state.token
		},
		getPermission(state) {
			return state.permission
		},
	}
})

export { store }
