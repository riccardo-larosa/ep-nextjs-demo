import { addProductToCart, getCart } from "../../services/cart";
import { getAccessToken } from "../../services/authentication";

// an endpoint for getting cart info
export default async function handler(req, res) {
  var token = req.cookies["token"];
  if (token === undefined) {
    token = await getAccessToken(req, res);
  }
  var cartId = req.cookies["ep-cart"];
  if (cartId === undefined) {
    console.log(`this is bad, we may need to redirect back to original url and see if we can get the original cookie`)
  }

  if (req.method === "GET") {

    console.log("GET");
    console.log(`token in /api/cart is ${token}`)
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
