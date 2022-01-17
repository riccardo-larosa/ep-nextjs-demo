import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../services/authentication";


export async function middleware(req, res) {
  console.log(`MW started`);
  res = NextResponse.next();
  var isValid = true;

  const cookieToken = req.cookies["token"];
  // if token is invalid
  if (cookieToken === undefined || "") {
    isValid = false;
  }
  // if token is expired
  if (Math.floor(Date.now() / 1000) >= req.cookies["expires"]) {
    console.log('token expired')
    isValid = false;
  }
  if (!isValid) {
    const token = await getAccessToken(req, res);
    console.log(`new token is : ${token}`)
    // then set it on the cookie of the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "strict",
      path: "/",
    });
    res.cookie("expires", Math.floor((Date.now()+30*60000) / 1000)); // add 30 min
    //return res;
  } else {
    // token is valid
    console.log(`Middleware: Token is valid: ${cookieToken}`);
  }

  const cookieCart = req.cookies["ep-cart"];
  // if cartid is invalid
  if (cookieCart === undefined || "") {
      // this is what we do in our JS-SDK
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    )
    console.log(`cartId is: ${cartId}`)
    res.cookie("ep-cart", cartId, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24 * 7, // 1 week
        sameSite: "strict",
        path: "/"
    });
  } else {
      // cart is valid
      console.log(`MW: cart is valid: ${cookieCart}`)
  }
  console.log(`MW ended`);
  return res;
}
