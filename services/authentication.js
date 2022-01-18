


export async function getAccessToken (req, res){

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
  console.log(access_token)
  return access_token;
};

// const refreshAccessToken = async (token) => {
//     try {
        
//         //set access token in cookie
//         //set refresh access token
//         return token

//     } catch (error) {
//         console.error(error)
//         return {
//             ...token,
//             error: 'RefreshAccessTokenError'
//         }
        
//     }
// }

//export default getAccessToken;

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
