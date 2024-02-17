import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/view/Home.vue'
import View1 from '@/view/View1.vue'
import View2 from '@/view/View2.vue'
import View3 from '@/view/View3.vue'
import View4 from '@/view/View4.vue'
import View5 from '@/view/View5.vue'

const routes = [
	{ path: '/', component: Home },
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