import '@mui/joy/styles';

declare module '@mui/joy/styles' {
    interface Palette {
        info: true;
    }

    interface PaletteOptions {
        info?: {
      solidBg?: string;
      solidHoverBg?: string;
      solidActiveBg?: string;
      solidDisabledBg?: string;
      solidDisabledColor?: string;
    };
  }

  interface TypographySystem {
    fontFamily?: {
      body?: string;
      display?: string;
    };
  }

  interface TypographySystemOptions {
    fontFamily?: {
      body?: string;
      display?: string;
    };
  }
}
