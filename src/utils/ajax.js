import { router } from '@/utils/router.js'
import { store } from '@/utils/store.js'

const apiGet = (url, callback) => {
	const token = store.getters.getToken
	const request = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	apiAjax(url, request, callback)
}

const apiGetDownload = (url, fileName) => {
	const callback = (blob) => {
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
	const token = store.getters.getToken
	const request = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	apiAjaxBlob(url, request, callback)
}

const apiPost = (url, data, callback) => {
	let token = store.getters.getToken
	const request = {
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
	const token = store.getters.getToken
	const request = {
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
	const token = store.getters.getToken
	const request = {
		method: "PUT",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	apiAjax(url, request, callback)
}

const apiPutUpload = (url, files, callback) => {
	const token = store.getters.getToken
	const formData = new FormData()
	for (const file of files) {
		formData.append("files", file)
	}
	const request = {
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		body: formData
	}
	apiAjax(url, request, callback)
}

const apiDelete = (url, data, callback) => {
	const token = store.getters.getToken
	const request = {
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
	const confirmVal = confirm(msg ? msg : "需要退出登录吗?")
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
	}).then(res => callback(res)).catch(async err => {
		if (401 === err.status) {
			const errObj = await err.json()
			alert(errObj.message)
			store.commit('deleteToken')
			router.push('/login')
		} else {
			return err.json()
		}
	}).then(res => {
		if (typeof res !== "undefined" && typeof res.status !== "undefined" && typeof res.message !== "undefined") {
			alert(`${res.status}: ${res.message}`)
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
	}).then(blob => callback(blob)).catch(async err => {
		if (401 === err.status) {
			const errObj = await err.json()
			alert(errObj.message)
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

export { apiDelete, apiGet, apiGetBlob, apiGetDownload, apiPost, apiPostBlob, apiPut, apiPutUpload, logout }
