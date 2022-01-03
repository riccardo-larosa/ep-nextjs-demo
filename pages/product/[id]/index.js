import { useRouter } from "next/router";
import { getAccessToken } from "../../../services/authentication";
import Meta from "../../../components/Meta";
import useSWR from "swr";
import fetcher from "../../../services/fetcher";


function product({ product }) {
  const { data, mutate } = useSWR('/api/cart', fetcher);
  console.log(product);
  return (
    <>
      <Meta title={product.attributes.name} />
      <div>{product.attributes.name}</div>
      <span> {product.meta.display_price.without_tax.formatted}</span>
      <button type="button"
        onClick={() => {
          fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({id: product.id, type: "cart_item", quantity: 1})
          })
          mutate()
        }
        
        } >
        Add to Cart
      </button>
      <br />
      <span> {product.attributes.sku}</span><br />
      <span>{product.attributes.description}</span>
    </>
  );
}

// in this case we are using getStaticProps
// BUT we could easily used getServerSideProps
export const getStaticProps = async (context) => {
  const token = await getAccessToken(context.req, context.res);
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

export const getStaticPaths = async ( context ) => {
  // in this case the req is processed server side so I don't have cookies 
  const token = await getAccessToken( context.req, context.res);
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
    // fallback: false
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    fallback: "blocking",
  };
};

export default product;
