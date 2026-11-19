<template>
  <div class="msg-wrap" :class="{user: isUser}">
    <div class="bubble">
      <div v-if="isUser">{{ text }}</div>
      <div v-else>
        <div v-html="renderMarkdown(text)"></div>
        <el-button v-if="refs && refs.length>0" text @click="$emit('selectRef', refs)">查看引用</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from 'marked'
defineProps(['isUser','text','loading','refs'])
const renderMarkdown = (str) => marked.parse(str || '')
</script>

<style scoped>
.msg-wrap { margin:12px 0; display:flex; }
.msg-wrap.user { justify-content:flex-end; }
.bubble { max-width:70%; padding:10px 14px; border-radius:12px; background:#f3f4f6; }
.msg-wrap.user .bubble { background:#409eff; color:#fff; }
</style>
