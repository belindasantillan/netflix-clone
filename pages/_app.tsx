import { AuthProvider } from '@/hooks/useAuth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <title>Home - Netflix</title>
      <link rel="shortcut icon" href="../static/favicon.ico"/>
    </Head>
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  </>
  )
}
