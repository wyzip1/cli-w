import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('pages/home/view/index.vue'),
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('pages/test/view/index.vue'),
		},
	],
})