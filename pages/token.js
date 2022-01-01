export default function Token({ token }) {
  return (
    <div>
      <h1>Cookies</h1>
      <h2> Token: {token}</h2>
      <button
        type="button"
        onClick={() => {
          fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: "abbccc" }),
          });
        }}
      >
        Login
      </button>{" "}
      {"  "}
      <button
        type="button"
        onClick={() => {
          fetch("/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
        }}
      >
        Logout
      </button>{" "}
      {"  "}
    </div>
  );
}

export function getServerSideProps({ req, res }) {
    console.log(`cookie is ${req.cookies.token}`)  
    console.log(req.cookies)

    return {
        props: { token: req.cookies.token || "" } 
    }
}

