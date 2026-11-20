<template>
  <div class="ref-panel" v-if="refList.length > 0">
    <div class="ref-head">
      <el-icon><Document /></el-icon><span>参考片段</span>
    </div>
    <div class="ref-item" v-for="(item, i) in refList" :key="i">
      <div class="meta">相似度：{{ (item.similarity * 100).toFixed(0) }}%<span v-if="item.ts"> · {{ item.ts }}</span></div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
defineProps(['refList'])
</script>

<style scoped>
.ref-panel {
  width: 320px; flex-shrink: 0;
  border-left: 1px solid var(--border);
  padding: 18px 16px; overflow-y: auto;
  background: var(--bg-sidebar);
}
.ref-head { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; margin-bottom: 14px; }
.ref-item {
  margin-bottom: 12px; padding: 12px;
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: 12px;
}
.meta { font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; }
.content { font-size: 13.5px; line-height: 1.6; color: var(--text-primary); }
</style>
