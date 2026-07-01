import React, { useState, useEffect } from "react"
import lodash from "lodash"
import { ChartDashboard } from "./ChartDashboard"

interface OverloadedProps {
  a: string
  b: string
  c: string
  d: string
  e: string
  f: string
  g: string
  h: string
}

export function Overloaded({ a, b, c, d, e, f, g, h }: OverloadedProps) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => { setX(1) }, [])
  useEffect(() => { setY(2) }, [])

  const data = lodash.range(10)

  return (
    <div>
      {data.map(n => (
        <span key={n}>{a}{b}{c}{d}{e}{f}{g}{h}{n}</span>
      ))}
      <ChartDashboard />
    </div>
  )
}
