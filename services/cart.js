export async function getCart (cartId, token){

    const APIBaseURL = process.env.NEXT_PUBLIC_EP_API_BASE_URL;
    //const token = req.cookies['token'];
    
    var headers = {
        Authorization: `Bearer ${token}`,
      };
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_EP_API_BASE_URL}/v2/carts/${cartId}`,
        { method: "GET", headers: headers }
      );
      const { data } = await result.json();
  
    console.log(`cart data is `, data)
    return data;
  };