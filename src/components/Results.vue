<template>
  <ul>
    <li v-for="result in props.results" :key="result.id">
      <ResultItem :result="result" :store="store"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { StatusStore } from '../models/StatusStore'
import { SearchResult } from 'minisearch'
import ResultItem from './ResultItem.vue'

const props = defineProps<{
  store: StatusStore,
  results: SearchResult[]
}>()


</script>

<style scoped>

</style>