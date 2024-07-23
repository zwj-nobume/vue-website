import { apiGet } from '@/utils/ajax'
import { isBlank } from '@/utils/public'
import { createStore } from 'vuex'

const token = localStorage.getItem('token')
const permission = localStorage.getItem('permission')

const store = createStore({
	state() {
		return {
			token: token,
			permission: new Set(permission === null ? [] : permission.split(';')),
			dict: new Map(),
		}
	},
	getters: {
		getToken: (state) => () => {
			return state.token
		},
		getPermission: (state) => () => {
			return state.permission
		},
		getDict: (state) => async (key) => {
			if (isBlank(key)) return null
			const getDictValue = (valueText) => {
				const indexFlag = valueText.indexOf(':')
				return JSON.parse(valueText.substring(indexFlag + 1))
			}
			if (state.dict.has(key)) {
				const valueText = state.dict.get(key)
				return getDictValue(valueText)
			} else {
				const callback = (res) => {
					if (!isBlank(res.data)) {
						state.dict.set(key, res.data)
						return getDictValue(res.data)
					} return null
				}
				return apiGet(`/api/dict/value?key=${key}`, callback)
			}
		},
	},
	mutations: {
		setToken: (state, payload) => {
			state.token = payload
			localStorage.setItem('token', payload)
		},
		setPermission: (state, payload) => {
			state.permission.clear()
			payload.forEach(item => state.permission.add(item))
			localStorage.setItem('permission', payload.join(';'))
		},
		setDict: (state, payload) => {
			state.dict.set(payload.key, payload.value)
		},
	},
	actions: {
		deleteToken: (context) => {
			context.state.token = ''
			localStorage.removeItem('token')
		},
		deletePermission: (context) => {
			context.state.permission.clear()
			localStorage.removeItem('permission')
		},
		deleteDictKey: (context, payload) => {
			const dict = context.state.dict
			if (!dict.has(payload)) return
			dict.delete(payload)
		}
	},
})

export { store }
