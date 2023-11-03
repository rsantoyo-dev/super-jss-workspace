// Importing necessary modules
import { signal } from "@angular/core";
import { defaultThemeConfig } from "../themes";
import { Breakpoints } from "../model";
import { convertQuickAccessToStyle } from "./helpers";

// Creating signals for theme, innerWidth and breakpoint
export const sjTheme = signal(defaultThemeConfig()); // signal for theme
export const sjInnerWidth = signal(window.innerWidth); // signal for innerWidth
export const sjBreakPoint = signal(Breakpoints.XS); // signal for breakpoint

/**
 * Returns the pixel value of a given breakpoint from the current theme.
 * @param x - The breakpoint to get the value for.
 * @returns The pixel value of the given breakpoint.
 * @example
 * sjGetBreakpointValue('sm') // returns '640px'
 */
export const sjGetBreakpointValue = (x:Breakpoints) => sjTheme().breakpoints[x]+'px';

/**
 * Returns the spacing value in pixels based on the current theme.
 * @param x - The number of spacing units to convert to pixels.
 * @returns The spacing value in pixels.
 * @remarks
 * This function uses the `sjTheme` function to retrieve the current theme and calculate the spacing value in pixels based on the number of spacing units provided.
 * 
 * Example usage:
 * ```
 * const spacingValue = sjSpace(2);
 * ```
 */
export const sjSpace = (x:number) => sjTheme().spacing(x);

/**
 * Returns the style object for a given quick access string.
 * @param x - The quick access string to convert to a style object.
 * @returns The style object for the given quick access string.
 * @remarks
 * This function uses the `convertQuickAccessToStyle` function from the `./helpers` module to convert the quick access string to a style object based on the current theme.
 * 
 * Example usage:
 * ```
 * const styleObject = sjGetStyle('m-2 p-4 bg-primary');
 * ```
 */
export const sjGetStyle = (x:string) => convertQuickAccessToStyle(x, sjTheme());
