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
	plugins: [
		vue()
	],
})
