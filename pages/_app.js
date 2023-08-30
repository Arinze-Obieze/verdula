import '@/styles/globals.css'
import { ProductsContextProvider } from '@/components/ProductsContext'
export default function App({ Component, pageProps }) {
  return (

      <ProductsContextProvider>
      <Component {...pageProps} />
      </ProductsContextProvider>

  )
}
