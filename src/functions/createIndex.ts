import MiniSearch from "minisearch"
import { StatusStore } from "../models/StatusStore"
import stripHTML from "./stripHTML"
import { bigram } from "n-gram"
import isCJKWord from "./isCJKWord"

const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u

export default function(store: StatusStore) {
  const miniSearch = new MiniSearch({
    fields: ['content'],
    idField: 'uri',
    tokenize(text) {
      // @ts-ignore
      const wordSegmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

      const tokens: string[] = []

      const segments = text.split(SPACE_OR_PUNCTUATION)

      segments.forEach(segment => {
        // @ts-ignore
        const words: string[] = Array.from(wordSegmenter.segment(segment)).map(s => s.segment)
        const CJKSegments: string[] = ['']
        words.forEach(word => {
          if (isCJKWord(word)) {
            CJKSegments[CJKSegments.length - 1] += word
          } else {
            CJKSegments.push('')
            tokens.push(word.toLowerCase())
          }
        })
        CJKSegments.forEach(segment => {
          if (segment.length > 0) {
            // @ts-ignore
            bigram(segment).forEach(token => tokens.push(token))
          }
        })
      })
      return tokens
    },
    searchOptions: {
      combineWith: 'AND',
      fuzzy(term) {
        if (isCJKWord(term)) {
          return false
        } else {
          return 0.35
        }
      },
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