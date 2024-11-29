import localforage from "localforage"
import { StatusStore } from "../models/StatusStore"

export default async function(store: StatusStore) {
  await localforage.setItem('store', store)
}