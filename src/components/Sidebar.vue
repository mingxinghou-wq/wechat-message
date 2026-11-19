<template>
  <div class="sidebar">
    <div class="logo-row">
      <div class="logo">ChatKB</div>
      <el-button @click="chat.newSession()" type="primary" circle>
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>
    <div class="session-list">
      <div
        v-for="s in chat.sessionList"
        :key="s.id"
        class="session-item"
        :class="{active: chat.sessionId === s.id}"
        @click="chat.loadSession(s)"
      >
        <span class="title">{{ s.title || '新会话' }}</span>
      </div>
      <div v-if="!chat.sessionList.length" class="empty">暂无历史会话</div>
    </div>
    <el-divider />
    <div class="menu">
      <div class="menu-item" @click="$router.push('/')">对话</div>
    </div>
    <div class="footer">
      <el-button text @click="themeToggle">切换浅色/深色</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '../stores/useChat.js'
import { Plus } from '@element-plus/icons-vue'
const chat = useChatStore()
onMounted(() => { chat.fetchSessions(); chat.fetchModels() })
const themeToggle = () => document.documentElement.classList.toggle('dark')
</script>

<style scoped>
.sidebar {
  width:260px; height:100vh; background:#fff;
  border-right:1px solid #e5e7eb; padding:20px 12px;
  display:flex; flex-direction:column; flex-shrink:0;
}
.logo-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.logo { font-size:22px; font-weight:600; }
.session-list { flex:1; overflow-y:auto; }
.session-item { padding:9px 10px; border-radius:6px; cursor:pointer; margin-bottom:4px; font-size:14px; }
.session-item:hover { background:#f3f4f6; }
.session-item.active { background:#409eff; color:#fff; }
.empty { color:#999; font-size:13px; text-align:center; margin-top:20px; }
.menu-item { padding:10px 12px; border-radius:6px; cursor:pointer; margin-bottom:4px; }
.menu-item:hover { background:#f3f4f6; }
.footer { margin-top:auto; padding-top:12px; }
</style>
