import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('merges nested objects without mutating originals', () => {
    const a = { x: 1, obj: { a: 1, sub: { z: 1 } } };
    const b = { y: 2, obj: { b: 2, sub: { w: 3 } } };

    const res = deepMerge(a, b);

    expect(res).toEqual({ x: 1, y: 2, obj: { a: 1, b: 2, sub: { z: 1, w: 3 } } });
    // originals unchanged
    expect(a).toEqual({ x: 1, obj: { a: 1, sub: { z: 1 } } });
    expect(b).toEqual({ y: 2, obj: { b: 2, sub: { w: 3 } } });
  });

  it('overwrites non-object values from source', () => {
    const a = { n: 1, s: 'a' } as any;
    const b = { n: 2, s: 'b' } as any;
    const res = deepMerge(a, b);
    expect(res.n).toBe(2);
    expect(res.s).toBe('b');
  });
});

