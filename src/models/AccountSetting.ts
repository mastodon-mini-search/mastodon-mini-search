export interface AccountSetting {
  instanceUrl: string
  username: string
  apiKey?: string
}

export type ResolvedAccountSetting = AccountSetting & { accountId: string }