import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../services/authentication";

//export async function isTokenValid(req) {}

export async function middleware(req, res) {
  
  const cookie = req.cookies["token"];
  //console.log(`cookie in MW is`, cookie);
  // if token is invalid
  if (cookie === undefined || "") {
    res = NextResponse.next();
    //console.log("Middleware: Token is invalid");
    const token = await getAccessToken(req, res);
    // then set it on the cookie of the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "strict",
      path: "/",
    });
    return res;
  } else {
    // token is valid
    console.log(`Middleware: Token is valid: ${cookie}`);
  }
  //   return res;
}
