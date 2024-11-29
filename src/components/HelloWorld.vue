<script setup lang="ts">
import { ref } from 'vue'
import fetchStatuses from '../functions/fetchStatuses'
import createIndex from '../functions/createIndex'
import loadStore from '../functions/loadStore'

defineProps<{ msg: string }>()

const count = ref(0)

async function doSearch() {
  /*
  const store = {
    account: {
      instanceUrl: 'https://fsk.im',
      username: 'merely',
      accountId: '111537734740727476'
    },
    position: {
      statusMinId: '0',
      favouriteMinId: '0',
      bookmarkMinId: '0'
    },
    statuses: {}
  }
  */
  const store = (await loadStore())!
  await fetchStatuses(store)
  const index = createIndex(store)
  console.log(index.search('螃蟹'))
  debugger
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="doSearch">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
