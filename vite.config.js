import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import path from 'path'

export default defineConfig({
  // root: 'src',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        company: path.resolve(__dirname, 'src/company/index.html'),
        service: path.resolve(__dirname, 'src/service/index.html'),
        works: path.resolve(__dirname, 'src/works/index.html'),
        contact: path.resolve(__dirname, 'src/contact/index.html')
      }
    }
  },
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    ViteEjsPlugin()
  ]
})