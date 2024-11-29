import { AccountSetting, ResolvedAccountSetting } from "../models/AccountSetting"
import { createRestAPIClient } from "masto"

export default async function(account: AccountSetting): Promise<ResolvedAccountSetting> {
  const masto = createRestAPIClient({
    url: account.instanceUrl,
    accessToken: account.apiKey
  })

  const data = await masto.v1.accounts.lookup({ acct: account.username })
  return {
    ...account,
    accountId: data.id
  }
}