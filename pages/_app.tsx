import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){(dataLayer).push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_ID}');`
      }}
      />
        
    </Provider>
  )
}

export default MyApp
