import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '@/utils/store'

import Home from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import System from '@/view/System.vue'
import User from '@/view/User.vue'
import Role from '@/view/Role.vue'
import Menu from '@/view/Menu.vue'
import Media from '@/view/Media.vue'
import Album from '@/view/Album.vue'
import Comic from '@/view/Comic.vue'
import Other from '@/view/Other.vue'

const routes = [
	{ name: 'home', path: '/', component: Home },
	{ name: 'login', path: '/login', component: Login },
	{ name: 'system', path: '/system', component: System, permission: 'system' },
	{ name: 'user', path: '/system/user', component: User, permission: 'system:user' },
	{ name: 'role', path: '/system/role', component: Role, permission: 'system:role' },
	{ name: 'menu', path: '/system/menu', component: Menu, permission: 'system:menu' },
	{ name: 'media', path: '/media', component: Media, permission: 'media' },
	{ name: 'album', path: '/media/album', component: Album, permission: 'media:album' },
	{ name: 'comic', path: '/media/comic', component: Comic, permission: 'media:comic' },
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
		router.push('/login')
		return
	}
	let findList = routes.filter(item => item.path === to.fullPath)
	if (findList.length === 1) {
		let findOne = findList[0]
		if (typeof findOne.permission === 'undefined') {
			next()
			return
		}
		let permission = store.getters.getPermission
		if (permission.has(findOne.permission)) {
			next()
			return
		}
		alert("未拥有目标页面的权限")
	}
})

export { router }