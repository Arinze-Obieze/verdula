import '@/styles/globals.css'
import { ProductsContextProvider } from '@/components/ProductsContext'
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </SessionProvider>
  )
}
