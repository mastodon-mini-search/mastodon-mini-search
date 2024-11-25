import { createRestAPIClient, mastodon } from "masto"

interface StatusDocument {
  id: string
  content: string
  uri: string
  createdAt: string
  type: 'boost' | 'post'
}

function extractToDocument(status: mastodon.v1.Status): StatusDocument {
  if (status.reblog) {
    return {
      id: status.id,
      content: status.reblog.content,
      uri: status.reblog.uri,
      createdAt: status.createdAt,
      type: 'boost'
    }
  } else {
    return {
      id: status.id,
      content: status.content,
      uri: status.uri,
      createdAt: status.createdAt,
      type: 'post'
    }
  }
}

async function loadDocuments(statuses: StatusDocument[]) {
  const masto = createRestAPIClient({
    url: 'https://fsk.im'
  })

  let sinceId: string
  if (statuses.length === 0) {
    sinceId = '0'
  } else {
    sinceId = statuses[statuses.length - 1].id
  }

  while (true) {
    const lastId = statuses.length === 0 ? null : statuses[statuses.length - 1].id
    const batch = await masto.v1.accounts.$select('111537734740727476').statuses.list({
      limit: 40,
      maxId: lastId,
      sinceId: sinceId
    })
    if (batch.length == 0) {
      break
    } else {
      batch.forEach(status => {
        if (+status.id > +sinceId) {
          statuses.push(extractToDocument(status))
        }
      })
    }
  }
}

export default async function() {
  const json = window.localStorage.getItem('status_documents')
  let documents: StatusDocument[] = []
  if (json) {
    documents = JSON.parse(json)
  } else {
    documents = []
  }
  await loadDocuments(documents)
  window.localStorage.setItem('status_documents', JSON.stringify(documents))
  console.log(documents)
}

