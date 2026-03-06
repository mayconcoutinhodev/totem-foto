import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        if (path === "/login") {
          return true
        }

        if (!token) return false

        if (path.startsWith("/admin")) {
          return token.role === "ADMIN"
        }

        if (path.startsWith("/ativacao")) {
          return token.role === "PROMOTOR"
        }

        return true
      },
    },
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|img|assets|favicon.ico|login|not-found).*)"
  ],
}