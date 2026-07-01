import React from "react";

interface Item {
  id: string
  label: string
}

interface BadListProps {
  items: Item[]
}

export function BadList({ items }: BadListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => {}}>
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export default function() {
  return <div>Anonymous</div>
}
