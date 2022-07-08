import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import buildFtlFilePlugin, { publicPath } from "vite-ftl-plugin";
import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
		plugins: [
			vue(),
			buildFtlFilePlugin({
				// templatePath: {
				//   index: path.join(process.cwd(), "./templates/index.html"),
				//   test: path.join(process.cwd(), "./src/entranceHtml/test.html"),
				// },
				templatePath: path.join(process.cwd(), './templates/index.html'),
				ftlDir: './build', // ftl最终的路径地址
			}),
			styleImport({
				libs: [VantResolve()],
			}),
		],
		optimizeDeps: {
			include: Object.keys(require('./package.json')['dependencies']),
		},
		resolve: {
			alias: {
				src: path.resolve(__dirname, './src'),
				context: path.resolve(__dirname, './src/context'),
				coms: path.resolve(__dirname, './src/components'),
				layout: path.resolve(__dirname, './src/layout'),
				pages: path.resolve(__dirname, './src/pages'),
				router: path.resolve(__dirname, './src/router'),
				styles: path.resolve(__dirname, './src/styles'),
				utils: path.resolve(__dirname, './src/utils'),
				views: path.resolve(__dirname, './src/views'),
				api: path.resolve(__dirname, './src/api'),
				store: path.resolve(__dirname, './src/store'),
			},
		},
		base: mode === 'development' ? '/' : publicPath,
		server: {
			// host: "0.0.0.0",
			proxy: {
				'/developmentApi': {
					target: '', //此处填写本地开发环境的代理地址
					changeOrigin: true,
					rewrite: path => path.replace(/^\/developmentApi/, ''),
				},
			},
		},
		build: {
			manifest: true,
			rollupOptions: {
				input: {
					index: path.join(__dirname, './src/entranceHtml/index.html'),
					test: path.join(__dirname, './src/entranceHtml/test.html'),
				},
				output: {
					manualChunks: {
						vue: ['vue'],
						vant: ["vant"],
					},
				},
			},
		},
  })
};
