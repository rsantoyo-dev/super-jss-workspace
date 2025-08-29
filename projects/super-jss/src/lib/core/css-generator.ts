import {
  SjBreakPoints,
  SjStyle,
  SjTheme,
  ResponsiveStyle,
} from '../models/interfaces';
import { shorthandMappings } from '../models/mappings';

const resolveThemeColor = (value: string, theme: SjTheme): string => {
  const themeKeyParts = value.split('.');
  if (
    (themeKeyParts.length === 1 && value in theme.palette) ||
    value in theme.colors
  ) {
    if (value in theme.colors) {
      const colorObject = theme.colors[value as keyof typeof theme.colors];
      return typeof colorObject === 'object' ? colorObject['500'] : colorObject;
    }

    if (value in theme.palette) {
      return theme.palette[value as keyof typeof theme.palette].main;
    }
  } else if (themeKeyParts.length === 2) {
    const colorCategory = themeKeyParts[0];
    const colorShade = themeKeyParts[1];

    if (colorCategory in theme.colors) {
      const colorObject =
        theme.colors[colorCategory as keyof typeof theme.colors];
      return typeof colorObject === 'object'
        ? colorObject[colorShade as keyof typeof colorObject]
        : colorObject;
    }

    if (colorCategory in theme.palette) {
      const colorObject =
        theme.palette[colorCategory as keyof typeof theme.palette];
      return colorObject[colorShade as keyof typeof colorObject] || value;
    }
  }

  return value;
};

export class CssGenerator {
  constructor(private theme: SjTheme) {}

  public generateAtomicCss(styles: SjStyle): [string[], string] {
    const classes: string[] = [];
    let css = '';

    for (const key in styles) {
      const value = styles[key as keyof SjStyle];
      const cssProperty = shorthandMappings[key] || key;

      if (typeof value === 'object' && value !== null) {
        // Handle responsive styles
        for (const bp in value) {
          const className = `sj-${this.kebabCase(
            key
          )}-${bp}-${this.sanitizeValue(value[bp as keyof ResponsiveStyle])}`;
          classes.push(className);
          const responsiveValue = this.resolveStyleValue(
            key,
            value[bp as keyof ResponsiveStyle]
          );
          const mediaQuery = `@media (min-width: ${
            this.theme.breakpoints[bp as keyof SjBreakPoints]
          }px) {
  .${className} { ${this.kebabCase(
            cssProperty as string
          )}: ${responsiveValue}; }
}
`;
          css += mediaQuery;
        }
      } else {
        // Handle non-responsive styles
        const className = `sj-${this.kebabCase(key)}-${this.sanitizeValue(
          value
        )}`;
        classes.push(className);
        const resolvedValue = this.resolveStyleValue(key, value);
        css += `.${className} { ${this.kebabCase(
          cssProperty as string
        )}: ${resolvedValue}; }
`;
      }
    }

    return [classes, css];
  }

  private resolveStyleValue(
    key: string,
    value: string | number | undefined
  ): string {
    if (value === undefined) {
      return 'initial';
    }
    if (typeof value === 'number') {
      return this.theme.spacing(value);
    }
    return resolveThemeColor(value, this.theme);
  }

  private kebabCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }

  private sanitizeValue(value: any): string {
    if (typeof value === 'string') {
      return value.replace(/[^a-zA-Z0-9-]/g, '-').replace(/\./g, '_');
    }
    return String(value)
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/\./g, '_');
  }
}
