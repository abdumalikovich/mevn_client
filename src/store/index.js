import Vue from 'vue'
import Vuex from 'vuex'
import api from '../services/api'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		Form: {
			A: false,
			Success: false,
			BlurredBg: false,
			Menu: false,
		},
		Error: {
			Status: false,
			Text: 'Произошла ошибка'
		},
		AllData: {
			A: [],
		}
	},
	getters: {
		Form: state => state.Form,
		AllData: state => state.AllData,
		Error: state => state.Error,
	},
	mutations: {
		async OpenForm(state, data) {
			document.body.style.overflowY = 'hidden'

			state.Form[data[0]] = true
			state.Form.BlurredBg = true
		},
		async СloseForms(state) {
			document.body.style.overflowY = 'scroll'

			for (let item in state.Form) {
				state.Form[item] = false
			}

			state.Error.Status = false
			state.Form.BlurredBg = false
		},
		async ShowForm(state, data) {
			state.Forms.Course = true
		},
		async GetData(state, data) {
			state.AllData[data.service] = data.data
		},
		async Patch(state, data) {
			let id = data.doc.id
			let find = this.state.AllData[data.service].filter(item => item.id == id)[0]
			let idx = this.state.AllData[data.service].indexOf(find)
			let item = this.state.AllData[data.service][idx]

			for(let key in item) {
				for(let new_key in Object.assign(data.doc)) {
					if(key == new_key) {
						item[key] = data.doc[new_key]
					}
				}
			}
		},
		async Add(state, data) {
			for (let item in state.Form) {
				state.Form[item] = false
			}
			
			if (data.status == 200 && data.data.ok == true) {
				state.Form.BlurredBg = true
				state.Form.Success = true

				setTimeout(() => {
					state.Form.BlurredBg = false
					state.Form.Success = false

					document.body.style.overflowY = 'scroll'
				}, 6000)
			} else {
				if (data == 'no_server') {
					state.Form.BlurredBg = true
					state.Error.Status = true
					state.Error.Text = 'Ошибка. Сервер выключен'
				} else if (data == 'no_response') {
					state.Form.BlurredBg = true
					state.Error.Status = true
					state.Error.Text = 'Ошибка. Пожалуйста, заполните все поля'
				} else {
					state.Form.BlurredBg = true
					state.Error.Status = true
					state.Error.Text = 'Простите, произошла неизвестная ошибка'
				}
			}
		}
	},
	actions: {
		async ShowForm({ commit, dispatch }) {
			event.preventDefault()
			commit('ShowForm')
		},
		async СloseForms({ commit, dispatch }) {
			commit('СloseForms')
		},
		async OpenForm({ commit, dispatch }, data) {
			commit('OpenForm', data)
		},
		async Patch({ commit, dispatch }, data) {
			event.preventDefault()
			
			await api.patch(data)
				.then(res => {
					commit('Patch', res.data)
				})
				.catch((error) => {
					let err_res = ''

					if (error.response) {
						commit('Add', err_res = 'no_response')
					} else if (error.request) {
						commit('Add', err_res = 'no_server')
					} else {
						commit('Add', err_res = 'server_error')
					}
				})
		},
		async Add({ commit, dispatch }, data) {
			event.preventDefault()

			let formData = new FormData(event.target)
			let unique = Object

			formData.append('service', data.service)

			api.add(formData)
				.then(res => {
					commit('Add', res)
				})
				.catch((error) => {
					let err_res = ''

					if (error.response) {
						commit('Add', err_res = 'no_response')
					} else if (error.request) {
						commit('Add', err_res = 'no_server')
					} else {
						commit('Add', err_res = 'server_error')
					}
				})
		},
		async GetData({ commit, dispatch }, data) {
			for(let item of data) {
				await api.GetData({ service: item })
					.then(async response => {
						commit('GetData', response.data)
					})
			}
		},
}})
