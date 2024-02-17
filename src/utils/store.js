import { createStore } from 'vuex'

const store = createStore({
	state () {
		return {
			count: 0
		}
	},
	mutations: {
		add (state, payload) {
			state.count += payload
		},
		minus (state, payload) {
			state.count -= payload
		}
	}
})

export { store }