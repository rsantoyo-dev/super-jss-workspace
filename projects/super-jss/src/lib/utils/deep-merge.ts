/**
 * Deeply merges plain objects without mutating inputs.
 * Arrays and primitives in source override target values.
 * @param target Base object.
 * @param source Overrides object.
 * @returns New merged object.
 */
export function deepMerge(target: any, source: any): any {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

/** Type guard for plain object values (non-array). */
function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
