export interface AccountSetting {
  instanceUrl: string
  acct: string
  apiKey?: string
}

export type ResolvedAccountSetting = AccountSetting & { accountId: string }