import MiniSearch from "minisearch"
import { StatusDocument } from "./fetchStatuses"

export default function(documents: StatusDocument[]) {
  const miniSearch = new MiniSearch({
    fields: ['content'],
    storeFields: ['content', 'uri'],
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
  miniSearch.addAll(documents)
  return miniSearch
}