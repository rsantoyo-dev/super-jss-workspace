import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Breakpoints, SJssTheme } from '../model';

/**
 * Determines the current breakpoint based on the inner width of the window.
 * @param theme - The current theme configuration.
 * @param innerWidth - The current inner width of the window.
 * @returns The current breakpoint.
 */
export const determineBreakpoint = (theme: WritableSignal<SJssTheme>, innerWidth: WritableSignal<number>): Breakpoints => {
    let breakpoint: Breakpoints = Breakpoints.XS;
    for (const key in theme().breakpoints) {
      if (theme().breakpoints[key as Breakpoints] <= innerWidth()) {
        breakpoint = key as Breakpoints;
      } else {
        break;
      }
    }
    return breakpoint;
  }