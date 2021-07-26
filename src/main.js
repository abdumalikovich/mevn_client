import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
})

Vue.config.productionTip = false
 
router.beforeEach((to, from, next) => {
	let language = to.params.lang

	next()
})

new Vue({
	Vuex,
	VueRouter,
	router,

	store,
	render: h => h(App)
}).$mount('#app')
