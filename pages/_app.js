import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import UiContextProvider from '../context/uiContext'
import { Popup, Navbar } from '../views/components'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} >
      <UiContextProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="ico" sizes="32x32" href="https://res.cloudinary.com/dzpphtqox/image/upload/v1644996340/Scholar%20Vote/logo_z3np9x.ico" />
          <title>Scholar Vote</title>
        </Head>
        <Popup />
        <Navbar />
        <Component {...pageProps} />
      </UiContextProvider>
    </SessionProvider>
  )
}

export default MyApp
