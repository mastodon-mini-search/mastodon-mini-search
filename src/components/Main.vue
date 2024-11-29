<template>
  <Setup v-if="!store" @setupComplete="saveStoreCreated"/>
  <Loader v-if="store" :store="store" @loadComplete="saveStoreAndIndex"/>
  <Searcher v-if="index" :index="index" @searchComplete="saveResults"/>
  <Results v-if="store && results.length > 0" :results="results" :store="store"/>
</template>

<script setup lang="ts">
import Setup from "./Setup.vue"
import { shallowRef, ShallowRef, reactive } from "vue"
import { StatusStore } from "../models/StatusStore"
import loadStore from "../functions/loadStore"
import saveStore from "../functions/saveStore"
import Loader from './Loader.vue'
import MiniSearch, { SearchResult } from 'minisearch'
import Filter from './Filter.vue'
import Searcher from './Searcher.vue'
import Results from './Results.vue'

const store: ShallowRef<StatusStore | undefined> = shallowRef(await loadStore())
const index: ShallowRef<MiniSearch | undefined> = shallowRef(undefined)
const filter = reactive({})
const results: ShallowRef<SearchResult[]> = shallowRef([])

function saveStoreCreated(storeCreated: StatusStore) {
  saveStore(storeCreated)
  store.value = storeCreated
}

function saveStoreAndIndex(storeToSave: StatusStore, indexToSave: MiniSearch) {
  saveStore(storeToSave)
  store.value = storeToSave
  index.value = indexToSave
}

function saveResults(rs: SearchResult[]) {
  results.value = rs
}

</script>

<style scoped>

</style>
