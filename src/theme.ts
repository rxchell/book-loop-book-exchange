"use client";

import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}


const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81"
        },
        "danger": {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d"
        },
        "success": {
          "50": "#ecfdf5",
          "100": "#d1fae5",
          "200": "#a7f3d0",
          "300": "#6ee7b7",
          "400": "#34d399",
          "500": "#10b981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065f46",
          "900": "#064e3b"
        },
        "warning": {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        "background": {
          "body": "linear-gradient(-30deg, var(--joy-palette-neutral-100), var(--joy-palette-neutral-200))"
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81",
          "solidHoverBg": "var(--joy-palette-primary-400)"
        },
        "neutral": {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b"
        },
        "danger": {
          "50": "#ffebee",
          "100": "#ffcdd2",
          "200": "#ef9a9a",
          "300": "#e57373",
          "400": "#ef5350",
          "500": "#f44336",
          "600": "#e53935",
          "700": "#d32f2f",
          "800": "#c62828",
          "900": "#b71c1c"
        },
        "success": {
          "50": "#ecfdf5",
          "100": "#d1fae5",
          "200": "#a7f3d0",
          "300": "#6ee7b7",
          "400": "#34d399",
          "500": "#10b981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065f46",
          "900": "#064e3b"
        },
        "warning": {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        },
        "background": {
          "body": "linear-gradient(-30deg, var(--joy-palette-neutral-900), var(--joy-palette-neutral-800))"
        }
      }
    }
  },
  typography: {
    h1: {
      // `--joy` is the default CSS variable prefix.
      // If you have a custom prefix, you have to use it instead.
      // For more details about the custom prefix, go to https://mui.com/joy-ui/customization/using-css-variables/#custom-prefix
      background:
          'linear-gradient(-30deg, var(--joy-palette-primary-plainActiveBg), var(--joy-palette-primary-solidBg))',
      // `Webkit*` properties must come later.
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginTop: 15,
      marginBottom: 15,
    },
    "h2": {
      background:
          'linear-gradient(-30deg, var(--joy-palette-primary-plainActiveBg), var(--joy-palette-primary-solidBg))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginTop: 15,
      marginBottom: 15,
    },
    "h3": {
      marginTop: 10,
      marginBottom: 10,
    },
    "body-md": {
      marginTop: 5,
      marginBottom: 5,
    }
  }
})

const theme2 = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidHoverBg: '#7F8BF0',
          solidBg: '#5F6EED',
          solidActiveBg: '#5768F6',
          solidDisabledBg: '#BCBED7',
          plainColor: '#414141',
          plainActiveBg: '#5F6EED',
          plainHoverBg: '#CED5FF',
          softBg: '#AFCAFC',
          softColor: '#424EB8',
          softHoverBg: '#C4D8FD',
          softActiveBg: '#9ABDFD',
          softDisabledColor: '#3E7FF9',
          softDisabledBg: '#E9EFFC',
          outlinedColor: '#5F6EED',
          outlinedBorder: '#BCC4FC',
          outlinedHoverBorder: '#5F6EED',
          outlinedHoverBg: '#EFF1FD',
          outlinedActiveBg: '#D2D6FC',
        },
        neutral: {
          solidBg: '#ECEBF1',
          solidColor: '#525050',
          solidActiveBg: '#D8D6F2',
          solidHoverBg: '#D8D6F2',
        },
        danger: {
          solidBg: '#F07373',
          solidActiveBg: '#EB7979',
          solidHoverBg: '#DB6060',
        },
        success: {
          solidBg: '#75C0A1',
          solidActiveBg: '#5FD8A6',
          solidHoverBg: '#60CFA1',
          solidDisabledBg: '#A8D7C4',
        },
        //   info: {
        //     solidBg: '#84B6FA',
        //     solidActiveBg: '#619AE6',
        //     solidHoverBg: '#629DF1',
        //     solidDisabledBg: '#B8CFEF',
        //   },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: '#5F6EED',
          solidHoverBg: '#7F8BF0',
          solidActiveBg: '#5768F6',
          solidDisabledBg: '#B9BEEA',
          solidDisabledColor: '#8E8EB2',
        },
        danger: {
          solidBg: '#F16F6F',
          solidActiveBg: '#F26060',
          solidHoverBg: '#F26060',
          solidDisabledBg: '#E4AEAE',
          solidDisabledColor: '#AC8484',
        },
        success: {
          solidBg: '#53C094',
          solidActiveBg: '#3FBE8B',
          solidHoverBg: '#3B9771',
          solidDisabledBg: '#A8DAC5',
          solidDisabledColor: '#76A48F',
        },
        //   info: {
        //     solidBg: '#5C99ED',
        //     solidActiveBg: '#448DF6',
        //     solidHoverBg: '#4280D7',
        //     solidDisabledBg: '#A5C4EE',
        //     solidDisabledColor: '#6E8CC3',
        //   },
        neutral: {
          solidBg: '#565663',
          solidActiveBg: '#82828D',
          solidHoverBg: '#565663',
        },
      },
    },
  },
});
export default theme;