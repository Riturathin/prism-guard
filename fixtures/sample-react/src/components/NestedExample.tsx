import React, { useEffect, useState } from "react"

export function NestedExample() {
  const [count, setCount] = useState(0)

  function InnerWidget() {
    return <span>{count}</span>
  }

  useEffect(() => { setCount(c => c + 1) }, [])
  useEffect(() => { document.title = "a" }, [])
  useEffect(() => { document.title = "b" }, [])
  useEffect(() => { document.title = "c" }, [])

  return <InnerWidget />
}
