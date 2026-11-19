<template>
  <div class="ref-panel" v-if="refList.length>0">
    <h4>参考片段</h4>
    <div class="ref-item" v-for="item in refList" :key="item.msg_id">
      <div class="meta">相似度：{{ (item.similarity*100).toFixed(0) }}% | {{ item.ts }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps(['refList'])
</script>

<style scoped>
.ref-panel { width:320px; border-left:1px solid #e5e7eb; padding:16px; overflow-y:auto; background:#fafafa; flex-shrink:0; }
.ref-item { margin-bottom:12px; padding:8px; background:#fff; border-radius:6px; }
.meta { font-size:12px; color:#666; margin-bottom:4px; }
</style>
