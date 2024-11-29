import { ResolvedAccountSetting } from "../models/AccountSetting"
import { createRestAPIClient } from "masto"

export default async function(acct: string): Promise<ResolvedAccountSetting> {
  const parts = acct.split('@')
  const username = parts[0]
  const instanceUrl = `https://${parts[1]}`

  const masto = createRestAPIClient({
    url: instanceUrl
  })

  const data = await masto.v1.accounts.lookup({ acct: username })
  return {
    instanceUrl,
    acct,
    accountId: data.id
  }
}