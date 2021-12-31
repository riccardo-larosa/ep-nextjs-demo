import { NextRequest, NextResponse } from "next/server";
import getAccessToken from "../services/authentication";

export async function middleware(req) {

    const isTokenValid = false

    if (isTokenValid) {
        console.log(`Middleware: Token is valid`)
        return NextResponse.next()
    } else {
        console.log('Middleware: Token is invalid')
        const token = getAccessToken()
        // then set it on the cookie of the response
        
        return NextResponse.next()

    }


}