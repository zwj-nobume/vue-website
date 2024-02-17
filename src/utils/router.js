import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/view/Home.vue'
import System from '@/view/System.vue'
import User from '@/view/User.vue'
import Role from '@/view/Role.vue'
import Menu from '@/view/Menu.vue'
import Media from '@/view/Media.vue'
import Album from '@/view/Album.vue'
import Comic from '@/view/Comic.vue'
import View1 from '@/view/View1.vue'
import View2 from '@/view/View2.vue'
import View3 from '@/view/View3.vue'
import View4 from '@/view/View4.vue'
import View5 from '@/view/View5.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/system', component: System },
	{ path: '/system/user', component: User },
	{ path: '/system/role', component: Role },
	{ path: '/system/menu', component: Menu },
	{ path: '/media', component: Media },
	{ path: '/media/album', component: Album },
	{ path: '/media/comic', component: Comic },
	{ path: '/view1', component: View1 },
	{ path: '/view2', component: View2 },
	{ path: '/view3', component: View3 },
	{ path: '/view4', component: View4 },
	{ path: '/view5', component: View5 },
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

export { router }