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
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/catalog/nodes/${context.params.id}/relationships/products`,
    { method: "GET", headers: headers }
  );
  const { data }  = await res.json();
  console.log(data)
  return {
    props: {
      prodList: data,
    },
  };
};

export default node;
