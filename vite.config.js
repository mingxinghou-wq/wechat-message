import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const repoName = "wechat-message"
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [vue()],
  server: {
    port: 3000
  }
})
