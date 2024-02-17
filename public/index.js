window.addEventListener('load', () => {
	registerSW();
})

async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register('./sw.js')
		} catch (err) {
			console.error('Service Wroker注册失败')
		}
	}
}