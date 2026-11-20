<template>
  <div class="sidebar">
    <div class="logo-row">
      <div class="brand">
        <div class="brand-mark">KB</div>
        <div class="brand-name">ChatKB</div>
      </div>
      <button class="new-btn" @click="chat.newSession()" title="新建会话">
        <el-icon><Plus /></el-icon><span>新会话</span>
      </button>
    </div>

    <div class="session-list">
      <div
        v-for="s in chat.sessionList"
        :key="s.id"
        class="session-item"
        :class="{ active: chat.sessionId === s.id }"
        @click="chat.loadSession(s)"
      >
        <el-icon class="s-icon"><ChatLineRound /></el-icon>
        <span class="title">{{ s.title || '新会话' }}</span>
      </div>
      <div v-if="!chat.sessionList.length" class="empty">暂无历史会话</div>
    </div>

    <div class="footer">
      <button class="foot-btn" @click="setEndpoint">
        <el-icon><Connection /></el-icon><span>后端地址</span>
      </button>
      <button class="foot-btn" @click="themeToggle">
        <el-icon><Moon /></el-icon><span>切换深浅色</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '../stores/useChat.js'
import { setApiBase, getApiBase } from '../utils/request.js'
import { Plus, ChatLineRound, Connection, Moon } from '@element-plus/icons-vue'

const chat = useChatStore()
onMounted(() => { chat.fetchSessions(); chat.fetchModels() })

const themeToggle = () => document.documentElement.classList.toggle('dark')

const setEndpoint = () => {
  const cur = getApiBase()
  const v = window.prompt('输入后端公网 HTTPS 地址（如 https://api.example.com），留空清除：', cur || '')
  if (v !== null) {
    setApiBase(v)
    window.alert('已保存，刷新页面后生效')
  }
}
</script>

<style scoped>
.sidebar {
  width: 264px; height: 100vh; flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 18px 12px;
  display: flex; flex-direction: column;
}
.logo-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; padding: 0 4px; }
.brand { display: flex; align-items: center; gap: 10px; }
.brand-mark {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, #3b7cff, #6aa4ff);
  color: #fff; font-weight: 700; font-size: 14px;
  display: flex; align-items: center; justify-content: center;
}
.brand-name { font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
.new-btn {
  display: flex; align-items: center; gap: 6px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 10px;
  padding: 8px 13px; font-size: 13px; cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 124, 255, 0.3);
  transition: filter .15s;
}
.new-btn:hover { filter: brightness(1.06); }

.session-list { flex: 1; overflow-y: auto; }
.session-item {
  display: flex; align-items: center; gap: 9px;
  padding: 10px 11px; border-radius: 10px;
  cursor: pointer; margin-bottom: 3px; font-size: 14px;
  color: var(--text-primary);
  transition: background .15s;
}
.session-item:hover { background: var(--bg-hover); }
.session-item.active { background: var(--bg-active); color: var(--accent); font-weight: 600; }
.s-icon { font-size: 15px; flex-shrink: 0; }
.title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.empty { color: var(--text-secondary); font-size: 13px; text-align: center; margin-top: 28px; }

.footer { margin-top: auto; padding-top: 12px; display: flex; flex-direction: column; gap: 4px; }
.foot-btn {
  display: flex; align-items: center; gap: 9px;
  background: transparent; border: none; color: var(--text-secondary);
  padding: 9px 11px; border-radius: 10px; font-size: 13.5px; cursor: pointer;
}
.foot-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
</style>
