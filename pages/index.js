import Head from 'next/head'
import Image from 'next/image'
import NodeList from '../components/NodeList'
import getAccessToken from '../services/authentication'

export default function Home({nodes}) {
  //console.log(nodes)
  return (
    <div>
      <Head>
        <title>EP Next Demo</title>
        <meta name="description" content="EP Next Demo" />
      </Head>
      
      <h1>Welcome to EP Next</h1>
      <NodeList nodes={nodes} />

    </div>
  )
}

export const getStaticProps = async () => {
  
  const token = await getAccessToken()
  var headers = {
    Authorization: `Bearer ${token}`
  }
  // console.log(headers)
  const res = await fetch(`https://api.moltin.com/catalog/nodes`, {method: 'GET', headers: headers})
  const {data} = await res.json()
  return {
    props: {
      nodes: data
    }
  }
}
