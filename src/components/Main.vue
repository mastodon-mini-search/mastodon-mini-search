<template>
  <Setup v-if="!store" @setupComplete="saveStoreCreated"/>
  <Loader v-if="store" :store="store"/>
</template>

<script setup lang="ts">
import Setup from "./Setup.vue"
import { shallowRef, ShallowRef } from "vue"
import { StatusStore } from "../models/StatusStore"
import loadStore from "../functions/loadStore"
import saveStore from "../functions/saveStore"
import Loader from './Loader.vue'

const store: ShallowRef<StatusStore | undefined> = shallowRef(await loadStore())
function saveStoreCreated(storeCreated: StatusStore) {
  saveStore(storeCreated)
  store.value = storeCreated
}


</script>

<style scoped>

</style>
