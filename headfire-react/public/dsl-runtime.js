// Headfire runtime: inject default themes, compile DSL, and wire theme toggle
(function () {
  const BPS = Object.freeze({ xs: '0px', sm: '600px', md: '960px', lg: '1280px', xl: '1920px' });
  const ORDER = ['sm', 'md', 'lg', 'xl'];

  function ensureDefaultThemes() {
    if (document.getElementById('hf-themes')) return;
    const s = document.createElement('style');
    s.id = 'hf-themes';
    s.textContent = `:root[data-hf-theme="dark"]{\n  --primary:#60a5fa;\n  --primary-contrast:#1f2937;\n  --space-2:8px;\n  --space-4:16px;\n  --dark-light:#374151;\n  --dark-main:#1f2937;\n  --dark-contrast:#f9fafb;\n  --app-bg:#0b1020;\n}\n:root[data-hf-theme=\"light\"]{\n  --primary:#3b82f6;\n  --primary-contrast:#ffffff;\n  --space-2:8px;\n  --space-4:16px;\n  --dark-light:#f3f4f6;\n  --dark-main:#e5e7eb;\n  --dark-contrast:#111827;\n  --app-bg:#f3f4f6;\n}`;
    document.head.appendChild(s);
  }
  function ensureThemeAttr() { const root = document.documentElement; if (!root.getAttribute('data-hf-theme')) root.setAttribute('data-hf-theme', 'dark'); }
  function themeify(v) { return String(v).replace(/theme\(([^)]+)\)/g, (_, k) => `var(--${String(k).trim()})`); }
  function splitArgs(s) { const out=[]; let d=0,b=0; for(let i=0;i<s.length;i++){const c=s[i]; if(c==='(')d++; else if(c===')')d=Math.max(0,d-1); else if(c===','&&d===0){out.push(s.slice(b,i).trim()); b=i+1}} const t=s.slice(b).trim(); if(t) out.push(t); return out; }
  function parseResp(a){ const m=new Map(); for(const e of splitArgs(a)){ const r=e.match(/^(\w+)\(([^)]*)\)$/); if(r) m.set(r[1], r[2]); } return m; }
  function parseInline(v){ const by=new Map(); let rest=''; let i=0; const n=v.length; const isN=c=>/[a-zA-Z-]/.test(c); const B=new Set(['xs','sm','md','lg','xl']); while(i<n){ const c=v[i]; if(isN(c)){ let j=i; while(j<n&&isN(v[j])) j++; const name=v.slice(i,j); if(v[j]==='('){ let k=j+1,d=1; while(k<n&&d>0){ if(v[k]==='(') d++; else if(v[k]===')') d--; k++; } const arg=v.slice(j+1,k-1); if(B.has(name)) by.set(name, arg.trim()); else rest+=v.slice(i,k); i=k; continue; } rest+=c; i++; } else { rest+=c; i++; } } return {by, rest}; }
  function splitDecls(b){ return b.split(';').map(s=>s.trim()).filter(Boolean).map(l=>{ const x=l.indexOf(':'); if(x<0) return null; return [l.slice(0,x).trim(), l.slice(x+1).trim()]; }).filter(Boolean); }
  function compileDecls(decls){ const root=[], media=[]; for(const [prop,raw] of decls){ const themed=themeify(raw); const inl=parseInline(themed); if(inl.by.size||(inl.rest&&inl.rest.trim())){ if(inl.by.has('xs')) root.push(`${prop}: ${inl.by.get('xs')};`); else if(inl.rest&&inl.rest.trim()) root.push(`${prop}: ${inl.rest.trim()};`); for(const bp of ORDER){ if(!inl.by.has(bp)) continue; media.push({bp, decl:`${prop}: ${inl.by.get(bp)};`}); } continue; } const m=themed.match(/responsive\((.*)\)/); if(m){ const by=parseResp(m[1]); if(by.has('xs')) root.push(`${prop}: ${by.get('xs')};`); for(const bp of ORDER){ if(!by.has(bp)) continue; media.push({bp, decl:`${prop}: ${by.get(bp)};`}); } continue; } root.push(`${prop}: ${themed};`);} return {root,media}; }
  function buildMedia(sel, md){ const buckets=new Map(); for(const e of md){ if(!buckets.has(e.bp)) buckets.set(e.bp,[]); buckets.get(e.bp).push(e.decl);} const out=[]; for(const bp of ORDER){ const list=buckets.get(bp); if(!list||!list.length) continue; out.push(`@media (min-width: ${BPS[bp]}) {\n  ${sel} { ${list.join(' ')} }\n}`);} return out; }
  function parseRules(css){ const R=/([^{}]+)\{([^{}]*)\}/g; const out=[]; let m; while((m=R.exec(css))){ const sel=m[1].trim(), body=m[2]; if(sel&&body) out.push({selector:sel, body}); } return out; }
  async function gather(){ let src=''; document.querySelectorAll('style[data-headfire]').forEach(n=>{ src+=`\n${n.textContent||''}`;}); const links=document.querySelectorAll('link[rel="stylesheet"][data-headfire]'); for(const el of Array.from(links)){ const href=el.getAttribute('href'); if(!href) continue; try{ const r=await fetch(href); if(r.ok) src+=`\n${await r.text()}`; }catch(_){}} return src; }
  function write(css){ let out=document.querySelector('style[data-headfire-out]'); if(!out){ out=document.createElement('style'); out.setAttribute('data-headfire-out',''); document.head.appendChild(out);} out.textContent=css; }
  function compile(css){ const out=[]; for(const {selector,body} of parseRules(css)){ const {root,media}=compileDecls(splitDecls(body)); if(root.length) out.push(`${selector} { ${root.join(' ')} }`); out.push(...buildMedia(selector,media)); } return out.join('\n'); }
  async function recompile(){ ensureDefaultThemes(); ensureThemeAttr(); const s=await gather(); if(s.trim()) write(compile(s)); }
  async function run(){ await recompile(); try{ window.Headfire=window.Headfire||{}; window.Headfire.recompile=recompile; }catch(_){ } document.addEventListener('click', e=>{ const t=e.target; if(!(t instanceof Element)) return; if(!t.closest('[data-hf-theme-toggle]')) return; const root=document.documentElement; const cur=root.getAttribute('data-hf-theme')||'dark'; root.setAttribute('data-hf-theme', cur==='dark'?'light':'dark'); }); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

