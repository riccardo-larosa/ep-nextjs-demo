import Link from "next/link";
import { getCart } from "../services/cart";

export default function cart(props) {
  console.log(props);
  return (
    <div>
      <h1>Cart</h1>
      <h3>Total: {props.data.meta.display_price.with_tax.formatted}</h3>
      <ul>
        {props.included.items.map((item) => (
          <li key={item.id}>
            <Link href={`/product/${item.product_id}`} key={item.id}>
              <a>{item.name}</a>
            </Link>
            - quantity: {item.quantity}-{" "}
            {item.meta.display_price.without_tax.value.formatted}
            <br />
            <img  src={item.image.href} height='110px'/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  var token = req.cookies["token"];
  var cartId = req.cookies["ep-cart"];
  console.log(`token is ${token}`);
  const results = await getCart(cartId, token);

  return {
    props: results,
  };
}
