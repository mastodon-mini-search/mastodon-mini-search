<template>
  <article>
    {{ props.status.content }}
  </article>
</template>

<script setup lang="ts">
import { StatusDocument } from '../models/StatusStore'
const props = defineProps<{
  uri: string
  status: StatusDocument
}>()
</script>

<style scoped>

</style>