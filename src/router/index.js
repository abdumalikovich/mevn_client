/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		name: 'home',
		path: '',
		component: () => import('../components/pages/home.vue')
	},
	{
		path: '/*',
		name: 'all',
		component: () => import('../components/pages/error.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAdmin)) {
			if (localStorage.expires - new Date() / 1000 > 0 && localStorage.token) next()
			else window.location.href = '/admin/login'
	} else {
		next()
	}
})

export default router
