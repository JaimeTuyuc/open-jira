import { UIProvider } from '@/context/ui';
import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { ligthTheme, darkTheme } from '../themes';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider
        theme={darkTheme}
      >
        <CssBaseline />
        <Component {...pageProps} />
        </ThemeProvider>
    </UIProvider>
  )
}
