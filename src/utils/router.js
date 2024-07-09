import { store } from '@/utils/store'
import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import Menu from '@/view/Menu.vue'
import Other from '@/view/Other.vue'
import Role from '@/view/Role.vue'
import System from '@/view/System.vue'
import User from '@/view/User.vue'
import File from '@/view/File.vue'
import Dict from '@/view/Dict.vue'

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'login', path: '/login', component: Login },
	{ name: 'system', path: '/system', component: System, permission: 'system' },
	{ name: 'user', path: '/system/user', component: User, permission: 'system:user' },
	{ name: 'role', path: '/system/role', component: Role, permission: 'system:role' },
	{ name: 'menu', path: '/system/menu', component: Menu, permission: 'system:menu' },
	{ name: 'file', path: '/system/file', component: File, permission: 'system:file' },
	{ name: 'dict', path: '/system/dict', component: Dict, permission: 'system:dict' },
	{ name: 'other', path: '/other', component: Other },
]
const noVerify = new Set(['/login'])

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

router.beforeEach((to, from, next) => {
	if (noVerify.has(to.fullPath)) {
		next()
		return
	}
	if (store.getters.getToken === null || store.getters.getToken === '') {
		alert("需要登录")
		store.commit('deleteToken')
		router.push('/login')
		return
	}
	const findList = routes.filter(item => item.path === to.fullPath)
	if (findList.length === 1) {
		const findOne = findList[0]
		if (typeof findOne.permission === 'undefined') {
			next()
			return
		}
		const permission = store.getters.getPermission
		if (permission.has(findOne.permission)) {
			next()
			return
		}
		alert("未拥有目标页面的权限")
	}
})

export { router }
