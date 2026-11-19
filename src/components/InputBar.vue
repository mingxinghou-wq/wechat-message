<template>
  <div class="input-bar-wrap">
    <div class="model-select-row">
      <el-select v-model="chat.selectedModel" placeholder="选择模型" size="small">
        <el-option v-for="m in chat.modelList" :key="m" :label="m" :value="m" />
      </el-select>
    </div>
    <div class="input-area">
      <el-input
        v-model="inputText"
        type="textarea"
        :rows="2"
        placeholder="输入问题，基于知识库问答"
        @keydown.enter.prevent="send"
      />
      <el-button type="primary" @click="send">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '../stores/useChat.js'
import { apiPost } from '../utils/request.js'
const chat = useChatStore()
const inputText = ref('')
const send = async () => {
  if (!inputText.value.trim()) return
  if (!chat.sessionId) chat.newSession()
  chat.messages.push({ isUser: true, text: inputText.value })
  const q = inputText.value
  inputText.value = ''
  const aiMsg = { isUser: false, text: '', loading: true, refs: [] }
  chat.messages.push(aiMsg)
  const base = import.meta.env.VITE_API_URL || ''
  try {
    const source = new EventSource(`${base}/api/rag/stream?q=${encodeURIComponent(q)}&tenant_id=${chat.tenantId}&model=${encodeURIComponent(chat.selectedModel)}`)
    source.onmessage = (e) => {
      if (e.data === '[DONE]') {
        source.close()
        aiMsg.loading = false
        apiPost('/api/session/save', { sessionId: chat.sessionId, messages: chat.messages, model: chat.selectedModel })
          .then(() => chat.fetchSessions())
        return
      }
      aiMsg.text += e.data
    }
    source.onerror = () => {
      source.close()
      aiMsg.loading = false
      aiMsg.text = aiMsg.text || '（暂未连接后端服务，请先配置 VITE_API_URL）'
    }
  } catch (err) {
    aiMsg.loading = false
    aiMsg.text = '（暂未连接后端服务）'
  }
}
</script>

<style scoped>
.input-bar-wrap { padding:12px 16px; border-top:1px solid #e5e7eb; background:#fff; }
.model-select-row { margin-bottom:10px; }
.input-area { display:flex; gap:10px; align-items:flex-end; }
.el-textarea { flex:1; }
</style>
