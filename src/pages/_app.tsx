import ScrollTop from '@/components/ScrollTop'
import Layout from '@/layouts';
import '@/styles/globals.css'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <CssBaseline />
    <ScrollTop>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ScrollTop>
  </>
}
