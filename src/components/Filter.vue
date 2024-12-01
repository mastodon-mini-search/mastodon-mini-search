<template>
  <div>
    <input type="checkbox" v-model="props.filter.post"/>原創
    <input type="checkbox" v-model="props.filter.boost"/>轉嘟
  </div>
</template>

<script setup lang="ts">
import FilterState from '../models/FilterState'

const props = defineProps<{
  filter: FilterState
}>()
</script>

<style scoped>

</style>