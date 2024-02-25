import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			token: '',
			permission: []
		}
	},
	mutations: {
		setToken(state, payload) {
			state.token = payload.token
			state.permission = payload.permission
			localStorage.setItem('token', payload.token)
			localStorage.setItem('permission', payload.permission.join(';'))
		},
		deleteToken(state) {
			state.token = ''
			state.permission = []
			localStorage.removeItem('token')
			localStorage.removeItem('permission')
		},
	},
	getters: {
		getToken(state) {
			state.token = localStorage.getItem('token')
			return state.token
		},
		getPermission(state) {
			state.permission = localStorage.getItem('permission').split(';')
			return state.permission
		}
	}
})

export { store }