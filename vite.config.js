import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import path from 'path'

export default defineConfig({
  // root: 'src',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        company: path.resolve(__dirname, 'company/index.html'),
        service: path.resolve(__dirname, 'service/index.html'),
        works: path.resolve(__dirname, 'works/index.html'),
        contact: path.resolve(__dirname, 'contact/index.html')
      }
    }
  },
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    ViteEjsPlugin({
      root: path.resolve(__dirname),
      views: path.resolve(__dirname)
    })
  ]
})