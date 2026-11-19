import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiGet } from '../utils/request.js'

export const useChatStore = defineStore('chat', () => {
  const sessionId = ref('')
  const sessionList = ref([])
  const messages = ref([])
  const tenantId = ref('default')
  const modelList = ref([])
  const selectedModel = ref('qwen2.5:7b')

  const fetchModels = async () => {
    try {
      const res = await apiGet('/api/model/list')
      modelList.value = res.models || []
    } catch (e) {
      modelList.value = ['qwen2.5:7b', 'qwen2.5:14b', 'deepseek-r1:7b']
    }
  }
  const fetchSessions = async () => {
    try {
      const res = await apiGet('/api/session/list')
      sessionList.value = res || []
    } catch (e) {
      sessionList.value = []
    }
  }
  const newSession = () => {
    sessionId.value = `sess_${Date.now()}`
    messages.value = []
  }
  const loadSession = (sess) => {
    sessionId.value = sess.id
    messages.value = sess.messages || []
    if (sess.model) selectedModel.value = sess.model
  }
  return {
    sessionId, sessionList, messages, tenantId, modelList, selectedModel,
    fetchSessions, fetchModels, newSession, loadSession
  }
})
