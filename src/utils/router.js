import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/view/Home.vue'
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
	{ path: '/system', component: System },
	{ path: '/system/user', component: User },
	{ path: '/system/role', component: Role },
	{ path: '/system/menu', component: Menu },
	{ path: '/media', component: Media },
	{ path: '/media/album', component: Album },
	{ path: '/media/comic', component: Comic },
	{ path: '/other', component: Other },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

export { router }