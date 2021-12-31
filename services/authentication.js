


const getAccessToken = async () => {

  //Logic should be
  // if you don't have a token or if it's invalid or expired, 
  //    then get a new one
  //    else keep the token and move on  
  //
  // TODO: following code always get a new token
  // TODO: token should be saved in a cookie
  // TODO: if req is coming from the server then you don't have a cookie, 
  //        then we will generate a new one
  const clientID = process.env.NEXT_PUBLIC_EP_CLIENT_ID;
  const APIBaseURL = process.env.NEXT_PUBLIC_EP_API_BASE_URL;
  const grantType = "implicit";
  
  const authResponse = await fetch(
    `${APIBaseURL}/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `client_id=${clientID}&grant_type=${grantType}`,
    }
  );

  const { access_token } = await authResponse.json();
  return access_token;
};

const refreshAccessToken = async (token) => {
    try {
        
        //set access token in cookie
        //set refresh access token
        return token

    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
        
    }
}

export default getAccessToken;

// const getClient = (url ='', data = {}) => {
//     const token = await getAccessToken()
//     const instance = fetch()
//     return authResponse
// }

//      const client = await getClient(storage, locale, 'USD')
//      const config = {
//              params: {
//              filter: `eq(${propName},${identifier})`,
//                      }
//      const res = await client.get('catalog/products', config)
