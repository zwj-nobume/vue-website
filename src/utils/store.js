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
