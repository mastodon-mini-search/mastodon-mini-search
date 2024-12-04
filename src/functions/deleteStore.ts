import localforage from "localforage"

export default async function() {
  await localforage.removeItem('store')
}