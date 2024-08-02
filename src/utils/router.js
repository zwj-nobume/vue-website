import { getStore, setRouter } from '@/utils/global'
import { createRouter, createWebHashHistory } from 'vue-router'

import { isBlank } from '@/utils/public'

import Dict from '@/view/Dict.vue'
import File from '@/view/File.vue'
import Home from '@/view/Home.vue'
import Log from '@/view/Log.vue'
import Login from '@/view/Login.vue'
import Menu from '@/view/Menu.vue'
import Other from '@/view/Other.vue'
import Personal from '@/view/Personal.vue'
import Role from '@/view/Role.vue'
import System from '@/view/System.vue'
import User from '@/view/User.vue'

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'login', path: '/login', component: Login },
	{ name: 'system', path: '/system', component: System, permission: 'system' },
	{ name: 'personal', path: '/personal', component: Personal },
	{ name: 'user', path: '/system/user', component: User, permission: 'system:user' },
	{ name: 'role', path: '/system/role', component: Role, permission: 'system:role' },
	{ name: 'menu', path: '/system/menu', component: Menu, permission: 'system:menu' },
	{ name: 'file', path: '/system/file', component: File, permission: 'system:file' },
	{ name: 'dict', path: '/system/dict', component: Dict, permission: 'system:dict' },
	{ name: 'log', path: '/system/log', component: Log, permission: 'system:log' },
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
	if (getStore().getters.getToken() === null || getStore().getters.getToken() === '') {
		alert("需要登录")
		router.push('/login')
		return
	}
	const findList = routes.filter(item => item.path === to.fullPath)
	if (findList.length === 1) {
		const findOne = findList[0]
		if (isBlank(findOne.permission)) {
			next()
			return
		}
		const permission = getStore().getters.getPermission()
		if (permission.has(findOne.permission)) {
			next()
			return
		}
		alert("未拥有目标页面的权限")
	}
})

setRouter(router)
export default router