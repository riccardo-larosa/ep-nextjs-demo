import Link from "next/link";
import { getCart } from "../services/cart";

export default function cart(props) {
  console.log(props);
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {props.included.items.map((item) => (
          <li>
            <Link href={`/product/${item.id}`} key={item.id}>
              <a>{item.name}</a>
            </Link>
            - quantity: {item.quantity}-{" "}
            {item.meta.display_price.without_tax.value.formatted}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  var token = req.cookies["token"];
  var cartId = req.cookies["ep-cart"];

  const results = await getCart(cartId, token);

  return {
    props: results,
  };
}
