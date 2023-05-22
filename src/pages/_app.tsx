import { NextPageWithLayout } from "global"
import { AppProps } from "next/app"
import "@/styles/globals.css"

function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout }) {
  return <Component {...pageProps} />
}

export default App