export async function getCart(cartId, token) {
  const APIBaseURL = process.env.NEXT_PUBLIC_EP_API_BASE_URL;

  var headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/v2/carts/${cartId}?include=items`,
    { method: "GET", headers: headers }
  );
  const { data } = await result.json();

  // console.log(`cart data is `, data);
  return data;
}

export async function addProductToCart(cartId, token, productId, quantity) {
  
  var headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/v2/carts/${cartId}/items`,
    {
      method: "POST",
      headers: headers,
      body: `{"data": { "id": "${productId}", "type": "cart_item", "quantity": ${quantity }}}`,
    }
  );
  const { data, errors } = await result.json();
  console.log(errors);
  // console.log(`added product ${productId} to cart: `, data);
  return data;
  
}
