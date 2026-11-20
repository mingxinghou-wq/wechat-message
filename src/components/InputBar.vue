<template>
  <div class="input-bar-wrap">
    <div class="input-card">
      <div class="input-row">
        <el-input
          v-model="inputText"
          type="textarea"
          :rows="2"
          resize="none"
          placeholder="输入问题，基于知识库问答…"
          class="main-input"
          @keydown.enter.prevent="onEnter"
        />
        <button class="send-btn" :disabled="!inputText.trim()" @click="send">
          <el-icon><Promotion /></el-icon>
        </button>
      </div>
      <div class="tool-row">
        <el-select v-model="chat.selectedModel" placeholder="选择模型" size="small" class="model-select">
          <el-option v-for="m in chat.modelList" :key="m" :label="m" :value="m" />
        </el-select>
        <span class="hint">Enter 发送 · Shift+Enter 换行</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '../stores/useChat.js'
import { apiPost, getApiBase } from '../utils/request.js'
import { Promotion } from '@element-plus/icons-vue'

const chat = useChatStore()
const inputText = ref('')

const onEnter = (e) => {
  if (e.shiftKey) return
  send()
}

// 无后端时的本地演示流式：展示打字机效果与引用面板
const mockStream = (aiMsg, q) => {
  const answer = [
    '【演示模式 · 尚未配置后端】',
    '',
    `你问的是：「${q}」`,
    '',
    '当前没有连接真实知识库后端，这是前端内置的模拟回答，用来展示豆包式流式打字效果和右侧引用面板。',
    '',
    '### 如何接入真实问答',
    '1. 在左侧「后端地址」填入公网 **HTTPS** 的 FastAPI 地址（如 https://api.example.com）；',
    '2. 前端会自动切换为 SSE 流式调用 `/api/rag/stream`；',
    '3. 若在本机跑 Ollama，请用本地 `npm run dev`（http://localhost:3000）访问，Pages 线上版连不到 127.0.0.1。',
    '',
    '下面两条是示例引用片段，点气泡下方「查看引用」可在右侧面板展开。'
  ].join('\n')
  aiMsg.refs = [
    { similarity: 0.92, ts: '2026-11-20', content: 'RAG 检索增强生成：先从知识库向量库召回相关片段，再交给大模型基于片段作答，降低幻觉。' },
    { similarity: 0.87, ts: '2026-11-20', content: 'SSE（Server-Sent Events）通过 text/event-stream 逐字推送实现打字机效果，前端用 EventSource 接收。' }
  ]
  let i = 0
  const timer = setInterval(() => {
    i += 3
    aiMsg.text = answer.slice(0, i)
    if (i >= answer.length) {
      clearInterval(timer)
      aiMsg.loading = false
    }
  }, 24)
}

const send = async () => {
  if (!inputText.value.trim()) return
  if (!chat.sessionId) chat.newSession()
  chat.messages.push({ isUser: true, text: inputText.value })
  const q = inputText.value
  inputText.value = ''
  const aiMsg = { isUser: false, text: '', loading: true, refs: [] }
  chat.messages.push(aiMsg)
  const base = getApiBase()
  if (!base) { mockStream(aiMsg, q); return }
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
      aiMsg.text = aiMsg.text || '（暂未连接后端服务：请在左侧「后端地址」填入公网 HTTPS 地址）'
    }
  } catch (err) {
    aiMsg.loading = false
    aiMsg.text = '（暂未连接后端服务）'
  }
}
</script>

<style scoped>
.input-bar-wrap {
  padding: 14px 24px 20px;
  background: linear-gradient(to top, var(--bg-page) 70%, transparent);
}
.input-card {
  max-width: 820px; margin: 0 auto;
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow-card);
  padding: 12px 14px 10px;
}
.input-row { display: flex; gap: 12px; align-items: flex-end; }
.main-input { flex: 1; }
.main-input :deep(.el-textarea__inner) {
  border: none; box-shadow: none; background: transparent;
  font-size: 15px; line-height: 1.6; padding: 6px 4px;
  color: var(--text-primary);
}
.send-btn {
  width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
  background: var(--accent); color: #fff; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 17px;
  box-shadow: 0 2px 8px rgba(59, 124, 255, 0.3);
  transition: filter .15s, opacity .15s;
}
.send-btn:hover:not(:disabled) { filter: brightness(1.06); }
.send-btn:disabled { opacity: .4; cursor: not-allowed; }
.tool-row { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; }
.model-select { width: 200px; }
.hint { font-size: 12px; color: var(--text-secondary); }
</style>
