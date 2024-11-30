import Layout from '../components/layout/Layout'
import '../styles/globals.css'

// This is a special file, this is the component which will be used to render the pages at the current level. Here, we are receiving Component which are pages at the current level and pageProps which are props passed to the component. We can add common changes for all the pages at this file.
function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
