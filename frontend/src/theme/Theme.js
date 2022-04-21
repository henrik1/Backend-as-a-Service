import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material";

const themeConfig = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3399FF',
    },
    secondary: {
      main: '#3399FF',
    },
    background: {
      default: '#011E3C',
      paper: '#0A1929',
    },
  },
  typography: {
    body1: {
      fontFamily: 'IBMPlexSans',
      color: 'rgb(178, 186, 194)'
    },
    body2: {
      fontFamily: 'IBMPlexSans',
    },
    button: {
      color: 'white'
    },
    h1: {
      fontFamily: 'PlusJakartaSans',
    },
    h2: {
      fontFamily: 'PlusJakartaSans',
    },
    h5: {
      fontFamily: 'PlusJakartaSans',
      color: '#3399FF'
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 5
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 30,
          right: 30
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 25, 41, 0.72)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #3399FF'
        },
      }
    },
    MuiBackdrop: {
      defaultProps: {
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 25, 41, 0.72)',
          backdropFilter: 'blur(10px)',
        },
        invisible: {
          backgroundColor: 'rgba(10, 25, 41, 0.72)',
          backdropFilter: 'blur(0px)',
        }
      }
    }
  }
}

const theme = createTheme(themeConfig);

export function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
