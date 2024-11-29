import MiniSearch from "minisearch"
import { StatusStore } from "../models/StatusStore"
import stripHTML from "./stripHTML"

const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u

export default function(store: StatusStore) {
  const miniSearch = new MiniSearch({
    fields: ['content'],
    idField: 'uri',
    tokenize(text) {
      // @ts-ignore
      const segmenter = Intl.Segmenter && new Intl.Segmenter("zh", { granularity: "word" })
      const tokens: string[] = []
      // @ts-ignore
      Array.from(segmenter.segment(text)).forEach(segment => {
        // @ts-ignore
        const token: string = segment.segment.toLowerCase()
        if (!token.match(SPACE_OR_PUNCTUATION)) {
          tokens.push(token)
        }
      })
      return tokens
    },
    searchOptions: {
      combineWith: 'AND',
      fuzzy: 0.35,
      maxFuzzy: 4
    }
  })
  Object.entries(store.statuses).forEach(([uri, status]) => {
    miniSearch.add({
      uri: uri,
      content: stripHTML(status.content)
    })
  })
  return miniSearch
}