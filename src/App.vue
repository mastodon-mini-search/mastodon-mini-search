<template>
  <Suspense>
    <Main/>
    <template #fallback>
      正在加載...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Main from "./components/Main.vue"
</script>

<style scoped>

</style>
