<template>
  <button @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  click: () => Promise<void>
}>()

const disabled = ref(false)

async function handleClick() {
  try {
    disabled.value = true
    await props.click()
  } finally {
    disabled.value = false
  }
}

</script>

<style scoped>

</style>