import { useRouter } from "next/router";
import { getAccessToken } from "../../../services/authentication";
import Meta from "../../../components/Meta";
import useSWR, { mutate } from "swr";
import fetcher from "../../../services/fetcher";
import productStyles from "../../../styles/Product.module.css";

function Product({ product }) {
  const { data } = useSWR("/api/cart", fetcher);
  console.log(product); 
  var imageHref = "";
  if (product.included !== undefined) {
      console.log(product.included.main_images[0].href);
      imageHref = product.included.main_images[0].link.href;
      console.log(`image href is`, imageHref);
  }
  var product = product.data; 
  
  return (
    <>
      <Meta title={product.attributes.name} />
      <div className={productStyles.productCart}>
      <div className={productStyles.producInfo}>{product.attributes.name}</div>
      <div className={productStyles.productImage}><img src={imageHref}/></div>
      <h5> {product.meta.display_price.without_tax.formatted}</h5>
      <button
        type="button"
        onClick={async () => {
          await fetcher("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: product.id,
              type: "cart_item",
              quantity: 1,
            }),
          });
          mutate("/api/cart");
        }}
      >
        Add to Cart
      </button>
      <h6> {product.attributes.sku}</h6>
      <br />
      <h6>{product.attributes.description}</h6>
      </div>
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
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/catalog/products/${context.params.id}?include=main_image`,
    { method: "GET", headers: headers }
  );
  // const { data } = await res.json();
  const results = await res.json();
  return {
    props: {
      product: results,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10,
    },
  };
};

export const getStaticPaths = async (context) => {
  // in this case the req is processed server side so I don't have cookies
  const token = await getAccessToken(context.req, context.res);
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

export default Product;
