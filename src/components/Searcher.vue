<template>
  <form @submit.prevent="doSearch">
    <input type="text" v-model="query">
    <input type="submit" value="搜索">
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MiniSearch, { SearchResult } from 'minisearch'

const props = defineProps<{
  index: MiniSearch
}>()
const emit = defineEmits<{
  (e: 'searchComplete', results: SearchResult[]): void
}>()
const query = ref('')

async function doSearch() {
  const results = props.index.search(query.value)
  emit('searchComplete', results)
}
</script>

<style scoped>

</style>