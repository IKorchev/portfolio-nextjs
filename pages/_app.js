import "tailwindcss/tailwind.css"
import "../styles/Global.css"

import TagManager from "react-gtm-module"
import { useEffect } from "react"
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-8LJNE4W1XW" })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
