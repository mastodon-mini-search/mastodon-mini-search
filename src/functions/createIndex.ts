import MiniSearch from "minisearch"
import { StatusStore } from "../models/StatusStore"
import stripHTML from "./stripHTML"
import { bigram } from "n-gram"
import isCJKWord from "./isCJKWord"
import normalizeChinese from "./normalizeChinese"

const SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u
const CJK_RANGE = '\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff'
const CJK_NCJK = new RegExp(`([${CJK_RANGE}])([^${CJK_RANGE}])`, 'g')
const NCJK_CJK = new RegExp(`([^${CJK_RANGE}])([${CJK_RANGE}])`, 'g')

function addSpaceBetweenCJKandNonCJK(text: string) {
  return text.replace(CJK_NCJK, '$1 $2').replace(NCJK_CJK, '$1 $2')
}

export default function(store: StatusStore) {
  const miniSearch = new MiniSearch({
    fields: ['content'],
    idField: 'uri',
    tokenize(text) {
      const tokens: string[] = []

      const segments = addSpaceBetweenCJKandNonCJK(text).split(SPACE_OR_PUNCTUATION)

      segments.forEach(segment => {
        if (isCJKWord(segment)) {
          const normalized = Array.from(segment).map(char => normalizeChinese(char))
          normalized.forEach(char => tokens.push(char))
          // @ts-ignore
          bigram(normalized).forEach(tokenArray => tokens.push(tokenArray.join('')))
        } else {
          tokens.push(segment)
        }
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