import Head from 'next/head'
// import Image from 'next/image'
import NodeList from '../components/NodeList'
import { getAccessToken } from '../services/authentication'

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

export async function getServerSideProps({req, res}) {
  
  // be careful that getServerSideProps is executed on the server 
  // so it doesn't have the browser cookie that you are setting in the _middleware.js 
  console.log('start getServerSideProps')
  const  cookies = req.cookies
  console.log(`getServerSideProps - cookies is: ${JSON.stringify(cookies)}`)
  var token = req.cookies['token']
  console.log(`1. getServiceSideProps cookie is ${token}`)
  
  if ( token === undefined) {
     token = await getAccessToken(req, res)    
  } 
  console.log(`2. getServiceSideProps cookie is ${token}`)
  var headers = {
    Authorization: `Bearer ${token}`
  }
  // console.log(headers)
  const resp = await fetch(`https://api.moltin.com/catalog/nodes`, {method: 'GET', headers: headers})
  const {data} = await resp.json()
  return {
    props: {
      nodes: data
    }
  }
}
