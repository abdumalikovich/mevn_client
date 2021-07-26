/* eslint-disable no-console */
import api from './index'

export default {
	// THE NEW SHIT
	patch(data) {
		return api().patch('admin/patch', data)
	},
	add(data) {
		return api().post('admin/add', data)
	},
	auth(data) {
		return api().post('admin/auth', data)
	},
	GetData(data) {
		return api().get('/get/' + data.service)
	},
	GetCheck(data) {
		return api().get('/GetCheck')
	},
	GetCourse(data) {
		return api().get('/GetCourse/' + data.element)
	},
	GetJob(data) {
		return api().get('/GetJob/' + data.element)
	},
}
