import { defineConfig } from 'vite'

export default defineConfig({
	base: './',
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		target: 'es2023',
		rollupOptions: {
			output: {
				format: 'iife',
				name: 'village'
			}
		}
	},
})
