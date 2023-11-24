import {Injectable, computed, signal, OnDestroy, WritableSignal} from '@angular/core';
import {SjBreakPoints, SjPalette, SjTypography} from '../models/interfaces';
import {getCurrentBreakpoint} from "../core/core-methods";
@Injectable({
  providedIn: 'root'
})
export class SjThemeService implements OnDestroy{

  // Signals to manage reactive state for breakpoints and theme configurations
  breakpoints = signal({xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560});
  typography: WritableSignal<SjTypography> = signal({
    default: {fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: 1, lineHeight: 1.6},
    H1: {fontSize: {xs: 2.5, md: 3.5}, fontWeight: '600', lineHeight: 4},
    H2: {fontSize: {xs: 2, md: 3}, fontWeight: '600', lineHeight: 3.5},
    H3: {fontSize: {xs: 1.75, md: 2.5}, fontWeight: '600', lineHeight: 3},
    H4: {fontSize: {xs: 1.5, md: 2}, fontWeight: '600', lineHeight: 2},
    H5: {fontSize: {xs: 1.25, md: 1.75}, fontWeight: '600', lineHeight: 2},
    H6: {fontSize: {xs: 1, md: 1.25}, fontWeight: '600', lineHeight: 1.5},
    P: {fontSize: 1, fontWeight: 'normal', lineHeight: 1.4},
    SPAN: {fontSize: 0.9, fontWeight: 'normal', lineHeight: 1.2},
    STRONG: {fontSize: 1, fontWeight: 'bold', lineHeight: 1.2},
    BODY: {fontSize: 1, fontWeight: 'normal', lineHeight: 1.2},
    CAPTION: {fontSize: 0.8, fontWeight: 'normal', lineHeight: 1.2},
  });
  colors = signal({
    blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#3498DB',
    600: '#2E86C1',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    contrast: '#c26d29'
  },
    indigo: {
    50: '#E8EAF6',
    100: '#C5CAE9',
    200: '#9FA8DA',
    300: '#7986CB',
    400: '#5C6BC0',
    500: '#3F51B5',
    600: '#3949AB',
    700: '#303F9F',
    800: '#283593',
    900: '#1A237E',
    contrast: '#f59242'
  },
    purple: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
    contrast: '#f59242'
  },
    pink: {
      50: '#FCE4EC',
      100: '#F8BBD0',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63',
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
      contrast: '#f59242'
    },
    red: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#E74C3C',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#771010',
      contrast: '#f59242'
    },
    orange: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#F39C12',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#bb4600',
      contrast: '#f59242'
    },
    yellow: {
      50: '#FFFDE7',
      100: '#FFF9C4',
      200: '#FFF59D',
      300: '#FFF176',
      400: '#FFEE58',
      500: '#FFEB3B',
      600: '#FDD835',
      700: '#FBC02D',
      800: '#F9A825',
      900: '#F57F17',
      contrast: '#f59242'
    },
    green: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
      contrast: '#f59242'
    },
    teal: {
      50: '#E0F2F1',
      100: '#B2DFDB',
      200: '#80CBC4',
      300: '#4DB6AC',
      400: '#26A69A',
      500: '#009688',
      600: '#00897B',
      700: '#00796B',
      800: '#00695C',
      900: '#004D40',
      contrast: '#f59242'
    },
    cyan: {
      50: '#E0F7FA',
      100: '#B2EBF2',
      200: '#80DEEA',
      300: '#4DD0E1',
      400: '#26C6DA',
      500: '#00BCD4',
      600: '#00ACC1',
      700: '#0097A7',
      800: '#00838F',
      900: '#006064',
      contrast: '#f59242'
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      contrast: '#f59242'
    },
    black: '#000000',
    white: '#FFFFFF'
  });

  // Palette signal for managing theme's color palette
  private palette = signal({
      primary: {
        main: this.colors().blue[500],
        light: this.colors().blue[300],
        dark: this.colors().blue[700],
        contrast: this.colors().yellow[500]
      },
      secondary: {
        main: this.colors().orange[500],
        light: this.colors().orange[300],
        dark: this.colors().orange[700],
        contrast: this.colors().blue[300],
      },
      tertiary: {
        main: this.colors().red[500],
        light: this.colors().red[300],
        dark: this.colors().red[700],
        contrast: this.colors().white,
      },
      success: {
        main: this.colors().green[500],
        light: this.colors().green[300],
        dark: this.colors().green[700],
        contrast: this.colors().gray[50],
      },
      info: {
        main: this.colors().cyan[500],
        light: this.colors().cyan[300],
        dark: this.colors().cyan[700],
        contrast: this.colors().gray[50],
      },
      warning: {
        main: this.colors().orange[500],
        light: this.colors().orange[300],
        dark: this.colors().orange[700],
        contrast: this.colors().gray[50],
      },
      error: {
        main: this.colors().red[500],
        light: this.colors().red[300],
        dark: this.colors().red[700],
        contrast: this.colors().gray[50],
      },
      dark: {
        main: this.colors().gray[800],
        light: this.colors().gray[600],
        dark: this.colors().black,
        contrast: this.colors().gray[50],
      },
      neutral: {
        main: this.colors().gray[500],
        light: this.colors().gray[300],
        dark: this.colors().gray[700],
        contrast: this.colors().gray[50],
      },
      light: {
        main: this.colors().gray[200],
        light: this.colors().gray[50],
        dark: this.colors().gray[400],
        contrast: this.colors().gray[900],
      }
    })

  sjTheme = computed(() => {
    return {
      breakpoints: this.breakpoints(),
      spacing: (factor: number): string => `${factor*8}px`,
      typography: this.typography(),
      colors: this.colors(),
      palette: this.palette(),
    }
  });

  // Signal to track the current breakpoint
  currentBreakpoint = signal('xs');

  /**
   * Constructor to set up event listeners for window resize and load events.
   * This is necessary to update the theme according to the window size.
   */

  constructor() {
    window.addEventListener('resize', () => this.updateRender());
    window.addEventListener('load', () => this.updateRender());
  }

  /**
   * Updates the rendering based on the current window size.
   * This function sets the current breakpoint according to the window width.
   */
  updateRender(){
    this.currentBreakpoint.set(getCurrentBreakpoint(this.sjTheme().breakpoints, window.innerWidth));
  }

  /**
   * Sets a new palette for the theme.
   * @param palette Partial configuration for the theme's palette.
   */
  public setPalette(palette: Partial<SjPalette>) {
    this.palette.set({ ...this.palette(), ...palette });  }

  /**
   * Sets new breakpoints for the theme.
   * @param breakpoints Partial configuration for the theme's breakpoints.
   */
  public setBreakpoints(breakpoints: Partial<SjBreakPoints>) {
    this.breakpoints.set({...this.breakpoints(), ...breakpoints});
  }

  /**
   * Sets new typography for the theme.
   * @param typo Partial configuration for the theme's typography.
   */
  public setTypography(typo: Partial<SjTypography>) {
    this.typography.set({ ...this.typography(), ...typo});  }

  /**
   * Lifecycle hook that is called when the service is destroyed.
   * Removes event listeners for resize and load to prevent memory leaks.
   */
  ngOnDestroy() {
    window.removeEventListener('resize', this.updateRender);
    window.removeEventListener('load', this.updateRender);
  }

}




