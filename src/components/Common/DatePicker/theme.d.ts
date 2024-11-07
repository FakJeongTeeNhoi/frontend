import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiPickersToolbar?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
  }
}
