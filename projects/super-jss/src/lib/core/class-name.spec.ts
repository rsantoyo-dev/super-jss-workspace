import { generateAtomicClassName, generateBundleId } from './class-name';

describe('class-name helpers', () => {
  it('generates deterministic atomic class names', () => {
    const a = generateAtomicClassName('', 'padding', 'md', 2);
    const b = generateAtomicClassName('', 'padding', 'md', 2);
    expect(a).toBe(b);
    expect(a).toContain('sj-');
  });

  it('generates stable bundle id for same styles', () => {
    const s1 = JSON.stringify({ color: 'primary.main', padding: 1 });
    const s2 = JSON.stringify({ color: 'primary.main', padding: 1 });
    const id1 = generateBundleId(s1);
    const id2 = generateBundleId(s2);
    expect(id1).toBe(id2);
    expect(id1.startsWith('sjb-')).toBeTrue();
  });
});

