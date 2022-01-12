export async function getHierarchies(token) {
  var headers = {
    Authorization: `Bearer ${token}`,
    "EP-Channel": "Main UK Store",
  };
  const resp = await fetch(
    `https://api.moltin.com/catalog/hierarchies/ab644d5f-52ec-4442-b0e8-51ef2d643cad/nodes`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const data = await resp.json();
//   console.log({data});
  return data;
}
