<template>
  <div>
    當前賬號：{{ props.store.account.acct }}
  </div>
  <div>
    已加載嘟文：{{ count }} <BlockingButton :click="doFetch">加載</BlockingButton>
  </div>
</template>

<script setup lang="ts">
import BlockingButton from './BlockingButton.vue'
import fetchStatuses from '../functions/fetchStatuses'
import createIndex from '../functions/createIndex'
import { StatusStore } from '../models/StatusStore'
import { ref } from 'vue'

const props = defineProps<{
  store: StatusStore
}>()

const count = ref(Object.keys(props.store.statuses).length)

async function doFetch() {
  await fetchStatuses(props.store, function() {
    count.value = Object.keys(props.store.statuses).length
  })
}
</script>

<style scoped>

</style>