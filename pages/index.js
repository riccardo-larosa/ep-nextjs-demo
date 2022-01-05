import Head from "next/head";
// import Image from 'next/image'
import NodeList from "../components/NodeList";
import { getAccessToken } from "../services/authentication";

export default function Home({ nodes }) {
  return (
    <div>
      <Head>
        <title>EP Next Demo</title>
        <meta name="description" content="EP Next Demo" />
      </Head>

      <h1>Welcome to EP Next</h1>
      <NodeList nodes={nodes} />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  
  const cookies = req.cookies;
  var token = cookies["token"];

  var headers = {
    Authorization: `Bearer ${token}`,
  };
  // const resp = await fetch(`https://api.moltin.com/catalog/nodes`, {
  const resp = await fetch(`https://api.moltin.com/catalog/hierarchies/ab644d5f-52ec-4442-b0e8-51ef2d643cad/nodes`, {
    method: "GET",
    headers: headers,
  });
  const { data } = await resp.json();
  return {
    props: {
      nodes: data,
    },
  };
}
