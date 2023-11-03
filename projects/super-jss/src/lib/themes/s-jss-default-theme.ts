import {SJssTheme} from "../model";

export const defaultThemeConfig = (): SJssTheme => {
  return {
    breakpoints: {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536},
    spacing: (factor) => `${0.8*factor}rem`,
    typography: {
      default: {fontFamily: '"Roboto","Helvetica"', fontSize: '1.2em'},
      H1: {fontSize: {xs: '3em', md: '3.5em'}, fontWeight: 'bold'},
      H2: {fontSize: {xs: '2.5em', md: '3em'}, fontWeight: 'bolder'},
      H3: {fontSize: {xs: '2.0em', md: '2.5em'}, fontWeight: 'bolder'},
      H4: {fontSize: {xs: '1.8em', md: '2em'}, fontWeight: 'bolder'},
      H5: {fontSize: {xs: '1.5em', md: '1.8em'}, fontWeight: 'bolder'},
      H6: {fontSize: {xs: '1em', md: '1.2em'}, fontWeight: 'bolder'},
      P: {fontSize: '1em', fontWeight: 'normal'},
      SPAN: {fontSize: '0.8em', fontWeight: 'normal'},
      STRONG: {fontSize: '1em', fontWeight: 'bold'},
      BODY1: {fontSize: '1em', fontWeight: 'normal'},
      BODY2: {fontSize: '0.8em', fontWeight: 'normal'},
      CAPTION: {fontSize: '0.6em', fontWeight: 'normal'},
    },
    palette: {
      common: {
        dark: {
          main: '#2C3E50', // Dark blue-gray
          light: '#34495E',
          dark: '#1A2836',
          contrastText: '#ECF0F1', // Light gray for contrast
        },
        light: {
          main: '#ECF0F1', // Light gray
          light: '#F7F9FA',
          dark: '#D0D3D4',
          contrastText: '#2C3E50', // Dark blue-gray for contrast
        },
        neutral: {
          main: '#95A5A6', // Neutral gray
          light: '#AAB7B8',
          dark: '#7D8A8B',
          contrastText: '#FFFFFF', // White for contrast
        }
      },
      primary: {
        main: '#3498DB', // Vibrant blue
        light: '#5DADE2',
        dark: '#1F618D',
        contrastText: '#FFFFFF', // White for contrast
      },
      secondary: {
        main: '#E74C3C', // Vibrant red
        light: '#EA6E5A',
        dark: '#AF2718',
        contrastText: '#FFFFFF', // White for contrast
      },
      tertiary: {
        main: '#F39C12', // Vibrant orange
        light: '#F7BC60',
        dark: '#BA7810',
        contrastText: '#FFFFFF', // White for contrast
      },
      error: {
        main: '#C0392B', // Darker red for errors
        light: '#D15B4A',
        dark: '#8D2917',
        contrastText: '#FFFFFF', // White for contrast
      },
      warning: {
        main: '#F1C40F', // Vibrant yellow for warnings
        light: '#F4D346',
        dark: '#B7950B',
        contrastText: '#2C3E50', // Dark blue-gray for contrast
      },
      info: {
        main: '#2980B9', // Darker blue for info
        light: '#4097C2',
        dark: '#1C5A8A',
        contrastText: '#FFFFFF', // White for contrast
      },
      success: {
        main: '#27AE60', // Vibrant green for success
        light: '#58C483',
        dark: '#1E7D43',
        contrastText: '#FFFFFF', // White for contrast
      },
      text: {
        primary: '#2C3E50', // Dark blue-gray for primary text
        secondary: '#7D8A8B', // Neutral gray for secondary text
        disabled: 'rgba(44, 62, 80, 0.39)', // Dark blue-gray with transparency for disabled text
      },
    }


  }
}
