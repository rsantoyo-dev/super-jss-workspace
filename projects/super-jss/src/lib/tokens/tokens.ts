import { InjectionToken } from '@angular/core';
import { SjTheme } from '../models/interfaces';

/**
 * Injection token used to provide a base SjTheme at bootstrap.
 * Consumers can override it to switch themes application-wide.
 */
export const SJ_THEME = new InjectionToken<SjTheme>('sj-theme');
