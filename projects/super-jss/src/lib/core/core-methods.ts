import { SjBreakPoints } from "../models/interfaces";

/**
 * Determines the current breakpoint based on the screen width and defined breakpoints.
 * @param {SjBreakPoints} breakpoints - The defined breakpoints in the theme.
 * @param {number} screenWidth - The current width of the screen.
 * @returns {string} - The current breakpoint key.
 */

export const getCurrentBreakpoint = (breakpoints:SjBreakPoints,screenWidth: number): string => {
    let bp = 'xs'
    for (const key of Object.keys(breakpoints)) {
        const breakpoint = key as keyof SjBreakPoints;
        bp = breakpoints[breakpoint] <= screenWidth ? breakpoint : bp;
    }
    return bp;
}
