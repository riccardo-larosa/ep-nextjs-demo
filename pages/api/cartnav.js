import { getCart } from "../../services/cart";

// an endpoint for getting cart info
export default async function handler(req, res) {
  var token = req.cookies["token"];
  var cartId = req.cookies["ep-cart"];

  const cart = await getCart(cartId, token);
  return res.status(200).json(cart);
}
