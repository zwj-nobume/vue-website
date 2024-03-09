import { store } from '@/utils/store.js'
import { router } from '@/utils/router.js'

const apiGet = (url, callback) => {
	let token = store.getters.getToken
	let request = token === null || token === void 0 ? null : {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	apiAjax(url, request, callback)
}

const apiGetDownload = (url, fileName) => {
	let callback = (blob) => {
		const fileURL = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = fileURL
		link.download = fileName
		link.click()
		window.URL.revokeObjectURL(fileURL);
	}
	apiGetBlob(url, callback)
}

const apiGetBlob = (url, callback) => {
	let token = store.getters.getToken
	let request = token === null || token === void 0 ? null : {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	apiAjaxBlob(url, request, callback)
}

const apiPost = (url, data, callback) => {
	let token = store.getters.getToken
	token = token === null || token === void 0 ? "" : token
	let request = {
		method: "POST",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	apiAjax(url, request, callback)
}

const apiPostBlob = (url, data, callback) => {
	let token = store.getters.getToken
	let request = token === null || token === void 0 ? null : {
		method: "POST",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	apiAjaxBlob(url, request, callback)
}

const apiPut = (url, data, callback) => {
	let token = store.getters.getToken
	token = token === null || token === void 0 ? "" : token
	let request = {
		method: "PUT",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	apiAjax(url, request, callback)
}

const apiDelete = (url, data, callback) => {
	let token = store.getters.getToken
	let request = token === null || token === void 0 ? null : {
		method: "DELETE",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	apiAjax(url, request, callback)
}

const logout = (msg) => {
	let confirmVal = confirm(msg ? msg : "需要退出登录吗?")
	if (confirmVal) {
		apiPost("/api/logout", null, (res) => {
			alert(res.message)
			store.commit('deleteToken')
			router.push('/login')
		})
	}
}

const apiAjax = (url, request, callback) => {
	fetch(url, request).then(res => {
		if (200 === res.status) {
			return res.json()
		} else {
			return Promise.reject(res)
		}
	}).then(res => callback(res)).catch(err => {
		if (401 === err.status) {
			alert("需要登录")
			store.commit('deleteToken')
			router.push('/login')
		} else {
			return err.json()
		}
	}).then(res => {
		if (typeof res !== "undefined" && typeof res.error !== "undefined") {
			alert(`${res.error}: ${res.message}`)
		}
	})
}

const apiAjaxBlob = (url, request, callback) => {
	fetch(url, request).then(res => {
		if (200 === res.status) {
			return res.blob()
		} else {
			return Promise.reject(res)
		}
	}).then(blob => callback(blob)).catch(err => {
		if (401 === err.status) {
			alert("需要登录")
			store.commit('deleteToken')
			router.push('/login')
		} else {
			return err.json()
		}
	}).then(res => {
		if (typeof res !== "undefined" && typeof res.error !== "undefined") {
			alert(`${res.error}: ${res.message}`)
		}
	})
}

export { apiGet, apiGetDownload, apiGetBlob, apiPost, apiPostBlob, apiPut, apiDelete, logout }