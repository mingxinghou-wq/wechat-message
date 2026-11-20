<template>
  <div class="chat-page">
    <div class="main">
      <div class="msg-container" ref="msgBox">
        <div v-if="!chat.messages.length" class="welcome">
          <div class="welcome-mark">KB</div>
          <h2>你好，我是 ChatKB</h2>
          <p>基于你的知识库回答问题，左侧可切换会话，右侧展示引用片段</p>
        </div>
        <ChatMessage
          v-for="(m, idx) in chat.messages"
          :key="idx"
          v-bind="m"
          @selectRef="onSelectRef"
        />
      </div>
      <InputBar />
    </div>
    <RefPanel :ref-list="currentRefs" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useChatStore } from '../stores/useChat.js'
import ChatMessage from '../components/ChatMessage.vue'
import InputBar from '../components/InputBar.vue'
import RefPanel from '../components/RefPanel.vue'

const chat = useChatStore()
const msgBox = ref(null)
const currentRefs = ref([])
const onSelectRef = (refs) => { currentRefs.value = refs }
watch(() => chat.messages, () => {
  setTimeout(() => {
    if (msgBox.value) msgBox.value.scrollTop = msgBox.value.scrollHeight
  }, 50)
}, { deep: true })
</script>

<style scoped>
.chat-page { display: flex; flex: 1; height: 100%; }
.main { flex: 1; display: flex; flex-direction: column; height: 100%; min-width: 0; }
.msg-container { flex: 1; padding: 24px 24px 8px; overflow-y: auto; }
.welcome { text-align: center; margin-top: 15vh; color: var(--text-secondary); }
.welcome-mark {
  width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 16px;
  background: linear-gradient(135deg, #3b7cff, #6aa4ff);
  color: #fff; font-size: 22px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.welcome h2 { color: var(--text-primary); font-size: 22px; margin: 0 0 8px; }
.welcome p { font-size: 14px; }
</style>
