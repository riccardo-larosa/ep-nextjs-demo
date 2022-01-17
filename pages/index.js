import Head from "next/head";
// import Image from 'next/image'
import NodeList from "../components/NodeList";
import { getAccessToken } from "../services/authentication";
import { getHierarchies } from "../services/catalog";

export default function Home({ nodes }) {
  console.log(`Home started`);
  if (nodes === undefined) {
    console.log(`nodes are undefined`)
  }
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
  
  // const cookies = req.cookies;
  var token = req.cookies["token"];
  const results = await getHierarchies(token);
  return {
    props: {
      nodes: results.data,
    },
  };
}
