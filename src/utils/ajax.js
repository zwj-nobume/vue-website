import { getRouter, getStore } from '@/utils/global';

const apiGet = async (url, callback) => {
	const token = getStore().getters.getToken()
	const request = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	return apiAjax(url, request, callback)
}

const apiGetDownload = async (url, fileName) => {
	const callback = (blob) => {
		const fileURL = window.URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = fileURL
		link.download = fileName
		link.click()
		window.URL.revokeObjectURL(fileURL);
	}
	return apiGetBlob(url, callback)
}

const apiGetBlob = async (url, callback) => {
	const token = getStore().getters.getToken()
	const request = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	}
	return apiAjaxBlob(url, request, callback)
}

const apiPost = async (url, data, callback) => {
	let token = getStore().getters.getToken()
	const request = {
		method: "POST",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	return apiAjax(url, request, callback)
}

const apiPostBlob = async (url, data, callback) => {
	const token = getStore().getters.getToken()
	const request = {
		method: "POST",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	return apiAjaxBlob(url, request, callback)
}

const apiPut = async (url, data, callback) => {
	const token = getStore().getters.getToken()
	const request = {
		method: "PUT",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	return apiAjax(url, request, callback)
}

const apiPutUpload = async (url, files, callback) => {
	const token = getStore().getters.getToken()
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
	return apiAjax(url, request, callback)
}

const apiDelete = async (url, data, callback) => {
	const token = getStore().getters.getToken()
	const request = {
		method: "DELETE",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: data === null ? "" : JSON.stringify(data)
	}
	return apiAjax(url, request, callback)
}

const logout = (msg) => {
	const confirmVal = confirm(msg ? msg : "需要退出登录吗?")
	if (confirmVal) {
		apiPost("/api/logout", null, (res) => {
			alert(res.message)
			getStore().dispatch('deleteToken')
			getRouter().push('/login')
		})
	}
}

const apiAjax = async (url, request, callback) => {
	try {
		const res = await defaultAjax(url, request)
		return callback(res)
	} catch (error) {
		const err = await error.json()
		alert(err.message)
		if (401 === err.status) {
			getStore().dispatch('deleteToken')
			getRouter().push('/login')
		} else return Promise.reject(err)
	}
}

const apiAjaxBlob = async (url, request, callback) => {
	try {
		const blob = await defaultAjaxBlob(url, request)
		return callback(blob)
	} catch (error) {
		const err = await error.json()
		alert(err.message)
		if (401 === err.status) {
			getStore().dispatch('deleteToken')
			getRouter().push('/login')
		} else return Promise.reject(err)
	}
}

const defaultAjax = async (url, request) => {
	url = encodeURI(url)
	const response = await fetch(url, request)
	if (200 === response.status) return response.json()
	return Promise.reject(response)
}

const defaultAjaxBlob = async (url, request) => {
	url = encodeURI(url)
	const response = await fetch(url, request)
	if (200 === response.status) return response.blob()
	return Promise.reject(response)
}

export { apiDelete, apiGet, apiGetBlob, apiGetDownload, apiPost, apiPostBlob, apiPut, apiPutUpload, logout };
