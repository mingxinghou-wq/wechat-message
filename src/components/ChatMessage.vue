<template>
  <div class="msg-wrap" :class="{ user: isUser }">
    <div class="avatar" v-if="!isUser">AI</div>
    <div class="bubble" :class="{ 'user-bubble': isUser }">
      <div v-if="isUser" class="md-body">{{ text }}</div>
      <div v-else>
        <div v-if="loading && !text" class="typing">
          <span></span><span></span><span></span>
        </div>
        <div v-else class="md-body" v-html="renderMarkdown(text)"></div>
        <el-button v-if="refs && refs.length > 0 && !loading" text class="ref-btn" @click="$emit('selectRef', refs)">
          <el-icon><Document /></el-icon> 查看引用 ({{ refs.length }})
        </el-button>
      </div>
    </div>
    <div class="avatar user-avatar" v-if="isUser">我</div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
import { Document } from '@element-plus/icons-vue'
defineProps(['isUser', 'text', 'loading', 'refs'])
const renderMarkdown = (str) => marked.parse(str || '')
</script>

<style scoped>
.msg-wrap {
  margin: 18px 0; display: flex; align-items: flex-start; gap: 12px;
  max-width: 820px; margin-left: auto; margin-right: auto;
}
.msg-wrap.user { flex-direction: row-reverse; }
.avatar {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; color: #fff;
  background: linear-gradient(135deg, #3b7cff, #6aa4ff);
}
.avatar.user-avatar { background: #8a8f99; }
.bubble {
  max-width: 74%; padding: 12px 16px;
  border-radius: 16px; background: var(--bg-bubble-ai);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-bubble);
  line-height: 1.7; font-size: 15px;
}
.user-bubble {
  background: var(--bg-bubble-user); color: #fff;
  border: none; box-shadow: 0 2px 8px rgba(59, 124, 255, 0.28);
}
.ref-btn { color: var(--accent); margin-top: 6px; padding-left: 0; }
.typing { display: flex; gap: 5px; padding: 6px 4px; }
.typing span {
  width: 7px; height: 7px; border-radius: 50%; background: var(--text-secondary);
  animation: blink 1.2s infinite;
}
.typing span:nth-child(2) { animation-delay: .2s; }
.typing span:nth-child(3) { animation-delay: .4s; }
@keyframes blink { 0%, 80%, 100% { opacity: .3; } 40% { opacity: 1; } }
</style>
