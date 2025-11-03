import { Injectable } from '@angular/core';

/**
 * Global registry for style bundles and hashes.
 * Phase 1 scaffold: caches bundle keys → className and tracks hit/miss counters.
 * Injection is still performed by SjCssGeneratorService; this registry centralizes
 * cache knowledge and enables future cross-service sharing and SSR hydration.
 */
@Injectable({ providedIn: 'root' })
export class StyleRegistry {
  private enabled = false;

  // bundleKey (e.g., 'bundle::' + JSON) → className
  private bundleMap = new Map<string, string>();

  // Simple counters for observability in dev
  public hits = 0;
  public misses = 0;

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(v: boolean): void {
    this.enabled = !!v;
  }

  getBundleClass(key: string): string | undefined {
    const found = this.bundleMap.get(key);
    if (this.enabled) {
      if (found) this.hits++; else this.misses++;
    }
    return found;
  }

  setBundleClass(key: string, className: string): void {
    this.bundleMap.set(key, className);
  }

  snapshot() {
    return {
      enabled: this.enabled,
      bundles: this.bundleMap.size,
      hits: this.hits,
      misses: this.misses,
      hitRate: this.hits + this.misses > 0 ? this.hits / (this.hits + this.misses) : 0,
    };
  }

  resetCounters() {
    this.hits = 0;
    this.misses = 0;
  }
}
