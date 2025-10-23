#!/usr/bin/env node

import { readFileSync } from 'fs';
import { parseAndCompile, CompilerOptions } from './index';
import { defaultDarkThemeObject, themeToTokenMap } from './themes';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: headfire <file.css>');
  process.exit(1);
}

const cssInput = readFileSync(filePath, 'utf-8');
const options: CompilerOptions = {
  theme: themeToTokenMap(defaultDarkThemeObject),
  breakpoints: { xs: '0px', sm: '600px', md: '960px', lg: '1280px', xl: '1920px' },
};

const compiled = parseAndCompile(cssInput, options);
console.log(compiled);
