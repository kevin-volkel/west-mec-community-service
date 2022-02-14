import Layout from './components/layout/Layout'
import HeadTag from './components/layout/HeadTag'
import 'semantic-ui-css/semantic.min.css'
import '../styles/login.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    {/* <Layout> */}
      <HeadTag/>
      <Component {...pageProps} />
    {/* </Layout> */}
  </>
  
}

export default MyApp
