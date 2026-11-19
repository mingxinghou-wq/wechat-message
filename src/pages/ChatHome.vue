<template>
  <div class="chat-page">
    <div class="main">
      <div class="msg-container" ref="msgBox">
        <ChatMessage
          v-for="(m,idx) in chat.messages"
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
watch(()=>chat.messages, ()=>{
  setTimeout(()=>{ msgBox.value?.scrollTop = msgBox.value.scrollHeight }, 50)
},{deep:true})
</script>

<style scoped>
.chat-page { display:flex; flex:1; height:100%; }
.main { flex:1; display:flex; flex-direction:column; height:100%; }
.msg-container { flex:1; padding:16px; overflow-y:auto; }
</style>
