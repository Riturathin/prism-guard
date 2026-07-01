import React, { createContext } from "react"

export const AppContext = createContext({ theme: "light" })

export function ContextExample() {
  return (
    <AppContext.Provider value={{ theme: "dark" }}>
      <div>Content</div>
    </AppContext.Provider>
  )
}
