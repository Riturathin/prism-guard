import React from "react"
import { fetchUsers } from "../data/api"

export function DataView() {
  const users = fetchUsers()
  return <div>{String(users)}</div>
}
