import { NextRequest, NextResponse } from "next/server";
import getAccessToken from "../services/authentication";

export async function isTokenValid(req) {}

export async function middleware(req, res) {
  res = NextResponse.next();

  const cookie = req.cookies["token"];

  // if token is valid
  if (cookie === undefined) {
    // token is invalid
    console.log("Middleware: Token is invalid");
    const token = await getAccessToken();
    console.log(`Middleware: setting the token cookie to ${token}`);
    console.log(JSON.stringify(token));
    // then set it on the cookie of the response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      sameSite: "strict",
      path: "/",
    });
  } else {
    console.log(`Middleware: Token is valid: ${cookie}`);
  }
  return res;
}
