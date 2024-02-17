import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		vue()
	],
})
