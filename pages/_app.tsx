import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserProvider from "../contexts/dataContext";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#152656',
             },

    },
  });

  return <ThemeProvider theme={theme}><UserProvider>
    <Component {...pageProps} />
  </UserProvider></ThemeProvider>
}

export default MyApp
