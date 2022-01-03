import { addProductToCart, getCart } from "../../services/cart";

// an endpoint for getting cart info
export default async function handler(req, res) {
  var token = req.cookies["token"];
  var cartId = req.cookies["ep-cart"];

  if (req.method === "GET") {
    console.log("GET");
    const cart = await getCart(cartId, token);

    return res.status(200).json(cart);
  } else {
    console.log("POST");
    const cart = await addProductToCart(
      cartId,
      token,
      req.body.id,
      req.body.quantity
    );
    return res.status(200).json(cart);
  }
}
