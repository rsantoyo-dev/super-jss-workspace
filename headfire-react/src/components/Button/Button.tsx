import React from 'react'
// Import co-located DSL directly; Vite plugin injects link and triggers compile
import './button.hf.css'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="hf-button" {...props} />
  )
}
