<template>
  <article>
    <div v-html="status.content"></div>
    <hr>
    {{ props.result.id }}
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
</script>

<style scoped>

</style>