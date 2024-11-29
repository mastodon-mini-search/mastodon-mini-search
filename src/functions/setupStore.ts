import { StatusStore } from "../models/StatusStore"
import resolveAccount from "./resolveAccount"

export default async function(acct: string): Promise<StatusStore> {
  const account = await resolveAccount(acct)
  return {
    account,
    statuses: {},
    position: {
      statusMinId: '0',
      favouriteMinId: '0',
      bookmarkMinId: '0'
    }
  }
}