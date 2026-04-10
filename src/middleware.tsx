import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (request: NextRequest) => {
  console.log("Middleware intercettato:", request.nextUrl.pathname);

  // Esempio: blocco l'accesso a /secret se non ho un token
  if (request.nextUrl.pathname.startsWith("/secret")) {
    const token = request.cookies.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
};

export default middleware;
