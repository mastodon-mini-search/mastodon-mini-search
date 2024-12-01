<template>
  <ul>
    <li v-for="result in filteredResult" :key="result.id">
      <ResultItem :result="result" :store="store"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { StatusStore } from '../models/StatusStore'
import { SearchResult } from 'minisearch'
import ResultItem from './ResultItem.vue'
import FilterState from '../models/FilterState'
import { computed } from 'vue'

const props = defineProps<{
  store: StatusStore,
  results: SearchResult[],
  filter: FilterState
}>()

const filteredResult = computed(() => {
  return props.results.filter(r => {
    const status = props.store.statuses[r.id]
    return status.types.some(x => props.filter[x])
  })
})
</script>

<style scoped>
ul {
  padding: 0;
  list-style: none;
}
</style>