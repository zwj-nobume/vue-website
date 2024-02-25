import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function _resolve(dir) {
	return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': _resolve('src'),
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8848',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		}
	},
	plugins: [
		vue()
	],
})
