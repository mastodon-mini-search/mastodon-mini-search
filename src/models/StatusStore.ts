import { ResolvedAccountSetting } from "./AccountSetting"

export type StatusType = 'post' | 'boost' | 'favourite' | 'bookmark'

export interface StatusDocument {
  content: string
  createdAt: string
  types: StatusType[]
  acct: string
  id: string
}

export interface LoadedPosition {
  statusMinId: string
  favouriteMinId: string
  bookmarkMinId: string
}

export interface StatusStore {
  account: ResolvedAccountSetting
  position: LoadedPosition,
  statuses: Record<string, StatusDocument>
}