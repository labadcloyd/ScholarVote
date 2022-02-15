import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import UiContextProvider from '../context/uiContext'
import Popup from '../views/components/popup/popup'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} >
      <UiContextProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="ico" sizes="32x32" href="/images/favicon.ico" />
          <title>My Student Vote</title>
        </Head>
        <Popup />
        <Component {...pageProps} />
      </UiContextProvider>
    </SessionProvider>
  )
}

export default MyApp
