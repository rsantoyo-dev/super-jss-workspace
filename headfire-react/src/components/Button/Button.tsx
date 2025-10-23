import React from 'react'
import { useHeadfireInlineCss } from '../../headfire/useHeadfireCss'
// Import co-located DSL as raw text and inject inline for reliable parsing
// @ts-expect-error Vite raw import
import cssRaw from './button.hf.css?raw'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  useHeadfireInlineCss(cssRaw)
  return (
    <button className="hf-button" {...props} />
  )
}
