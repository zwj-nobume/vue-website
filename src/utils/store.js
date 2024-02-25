import { createStore } from 'vuex'

const store = createStore({
	state () {
		return {
			token: localStorage.getItem('token'),
			permission: localStorage.getItem('permission')
		}
	},
	mutations: {
		setToken (state, payload) {
			state.token = payload.token
			state.permission = payload.permission
			localStorage.setItem('token', payload.token)
			localStorage.setItem('permission', payload.permission)
		},
		deleteToken (state) {
			state.token = ''
			state.permission = ''
			localStorage.removeItem('token')
			localStorage.removeItem('permission')
		},
	}
})

export { store }