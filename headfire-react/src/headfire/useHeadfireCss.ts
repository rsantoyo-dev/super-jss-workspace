import { useEffect } from 'react'

/**
 * Inject a DSL CSS file (served as an asset URL) into <head> with data-headfire,
 * then trigger Headfire recompile. Removes it on unmount.
 */
export function useHeadfireCss(url: string) {
  useEffect(() => {
    if (!url) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.setAttribute('data-headfire', '')
    document.head.appendChild(link)
    ;(window as any).Headfire?.recompile?.()
    return () => {
      try {
        document.head.removeChild(link)
        ;(window as any).Headfire?.recompile?.()
      } catch {}
    }
  }, [url])
}

/**
 * Inject inline DSL into a <style data-headfire> tag and trigger recompile.
 * Useful with Vite `?raw` imports so we avoid fetching assets.
 */
export function useHeadfireInlineCss(cssSource: string) {
  useEffect(() => {
    if (!cssSource) return
    const style = document.createElement('style')
    style.setAttribute('data-headfire', '')
    style.textContent = cssSource
    document.head.appendChild(style)
    ;(window as any).Headfire?.recompile?.()
    return () => {
      try {
        document.head.removeChild(style)
        ;(window as any).Headfire?.recompile?.()
      } catch {}
    }
  }, [cssSource])
}
