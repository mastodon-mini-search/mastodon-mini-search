import localforage from "localforage"
import { StatusStore } from "../models/StatusStore"

export default async function() {
  const store = await localforage.getItem('store')
  if (store) {
    return store as StatusStore
  } else {

  }
}