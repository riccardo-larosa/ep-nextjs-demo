import ProductList from "../../../components/ProductList";
import { useRouter } from "next/router";
import { getAccessToken } from "../../../services/authentication";

const node = ({ prodList }) => {
  //   const router = useRouter();
  //   const { id } = router.query;
  //console.log(prodList);
  return (
    <div>
      Products for this node: 
      <ProductList products={prodList} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  //const token = await getAccessToken(context.req, context.res);
  const  cookies = context.req.cookies
  var token = cookies['token']
  
  var headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/catalog/nodes/${context.params.id}/relationships/products?include=main_image`,
    { method: "GET", headers: headers }
  );
  const { data, included }  = await res.json();
  //console.log(data)
  const products = data.map(product => {
    var imageId = false;
    if (product.relationships !== undefined) {
      if (product.relationships.main_image !== undefined) {
        imageId = product.relationships.main_image.data.id;
        console.log(`imageId is ${imageId}`);
      }
    }

    return {
      ...product, 
      image: imageId ? included.main_images.find(img => img.id === imageId).link.href : '/light-hex.svg'
    }        

  });
  return {
    props: {
      prodList: products,
    },
  };
};

export default node;
