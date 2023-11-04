import ScrollTop from '@/components/ScrollTop'
import '@/styles/globals.css'
import { CssBaseline } from '@mui/material'
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';

type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

export default function App({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return <>
    <CssBaseline />
    <ScrollTop>
      {getLayout(<Component {...pageProps} />)}
    </ScrollTop>
  </>
}
