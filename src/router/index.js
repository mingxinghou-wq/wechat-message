import { createRouter, createWebHistory } from 'vue-router'
import ChatHome from '../pages/ChatHome.vue'

const base = '/wechat-message/'
const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', component: ChatHome }
  ]
})

export default router
