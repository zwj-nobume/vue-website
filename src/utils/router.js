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
	{ path: '/', component: Home },
	{ path: '/login', component: Login },
	{ path: '/system', component: System },
	{ path: '/system/user', component: User },
	{ path: '/system/role', component: Role },
	{ path: '/system/menu', component: Menu },
	{ path: '/media', component: Media },
	{ path: '/media/album', component: Album },
	{ path: '/media/comic', component: Comic },
	{ path: '/other', component: Other },
]
const noVerify = new Set(['/login'])

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

router.beforeEach((to, from, next) => {
	if (!noVerify.has(to.fullPath) && (store.getters.getToken === null || store.getters.getToken === '')) {
		router.push('/login')
	}
	next()
})

export { router }