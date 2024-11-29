import MiniSearch from "minisearch"
import { StatusStore } from "../models/StatusStore"

export default function(store: StatusStore) {
  const miniSearch = new MiniSearch({
    fields: ['content'],
    idField: 'uri',
    tokenize(text, _) {
      // @ts-ignore
      const segmenter = Intl.Segmenter && new Intl.Segmenter("zh", { granularity: "word" })
      const tokens: string[] = []
      // @ts-ignore
      Array.from(segmenter.segment(text)).forEach(segment => {
        // @ts-ignore
        tokens.push(segment.segment)
      })
      return tokens
    },
  })
  Object.entries(store.statuses).forEach(([uri, status]) => {
    miniSearch.add({
      uri: uri,
      content: status.content
    })
  })
  return miniSearch
}