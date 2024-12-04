<template>
  <article>
    <main v-html="status.content"></main>
    <div class="meta">
      <a :href="link" target="_blank">原文</a> 來自 <a :href="authorLink" target="_blank">@{{ status.acct }}</a>
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

const status = computed(() => props.store.statuses[props.result.id])
const link = computed(() => `${props.store.account.instanceUrl}/@${status.value.acct}/${status.value.id}`)
const authorLink = computed(() => `${props.store.account.instanceUrl}/@${status.value.acct}`)
/*
const typeNames = {
  post: '原創',
  boost: '轉嘟',
  favourite: '喜歡',
  bookmark: '書籤'
}
const types = computed(() => status.value.types.map(t => typeNames[t]).join(' '))
*/
</script>

<style scoped>
main {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  margin-top: 0.5rem;
}
</style>