import Script from "next/script"
import "tailwindcss/tailwind.css"
import "../styles/Global.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy='lazyOnLoad'
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-8LJNE4W1XW'
      />
      <Script strategy='lazyOnload'>
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8LJNE4W1XW');`}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
