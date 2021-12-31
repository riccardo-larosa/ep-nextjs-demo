import { useRouter } from "next/router";
import getAccessToken from "../../../services/authentication";

const product = ({ product }) => {
  //   const router = useRouter();
  //   const { id } = router.query;
  console.log(product);
  return <div>this is a product {product.attributes["name"]}</div>;
};

// in this case we are using getStaticProps
// BUT we could easily used getServerSideProps
export const getStaticProps = async (context) => {
  const token = await getAccessToken();
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/catalog/products/${context.params.id}`,
    { method: "GET", headers: headers }
  );
  const { data } = await res.json();
  return {
    props: {
      product: data,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10,
    },
  };
};

export const getStaticPaths = async () => {
  const token = await getAccessToken();
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/catalog/products`,
    { method: "GET", headers: headers }
  );
  const { data } = await res.json();
  const products = data;

  const ids = products.map((product) => product.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));
  //params:{ id:'1', id:'2'}
  console.log(paths);
  return {
    paths: paths,
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    fallback: "blocking",
  };
};

export default product;
