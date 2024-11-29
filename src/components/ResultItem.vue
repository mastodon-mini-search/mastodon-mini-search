<template>
  <article>
    <main v-html="status.content"></main>
    <div>
      <a :href="props.result.id" target="_blank">原文</a>
    </div>
    <hr>
  </article>
</template>

<script setup lang="ts">
import { StatusStore } from '../models/StatusStore'
import { SearchResult } from 'minisearch'
import { computed } from 'vue'

const props = defineProps<{
  result: SearchResult
  store: StatusStore
}>()

const typeNames = {
  post: '原創',
  boost: '轉嘟',
  favourite: '喜歡',
  bookmark: '書籤'
}

const status = computed(() => props.store.statuses[props.result.id])
const types = computed(() => status.value.types.map(t => typeNames[t]).join(' '))
</script>

<style scoped>
main {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>