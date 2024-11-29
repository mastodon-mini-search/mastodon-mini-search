<template>
  <Setup v-if="!store" @setupComplete="saveStoreCreated"/>

  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import Setup from "./Setup.vue"
import HelloWorld from "./HelloWorld.vue"
import { shallowRef, ShallowRef } from "vue"
import { StatusStore } from "../models/StatusStore"
import loadStore from "../functions/loadStore"
import saveStore from "../functions/saveStore"

const store: ShallowRef<StatusStore | undefined> = shallowRef(await loadStore())
function saveStoreCreated(storeCreated: StatusStore) {
  saveStore(storeCreated)
  store.value = storeCreated
}


</script>

<style scoped>

</style>
