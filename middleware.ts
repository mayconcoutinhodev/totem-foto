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
        const role = token?.role

        if (path === "/login") return true
        
        if (!token) return false

        if (path.startsWith("/admin") && role !== "ADMIN") {
          return false 
        }

        const rotasOperacionais = ["/ativacao", "/capture", "/review", "/download", "/final", "/home"]
        
        if (rotasOperacionais.some(rota => path.startsWith(rota)) && role === "ADMIN") {
          return false 
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
  matcher: ["/((?!api|_next/static|_next/image|img|assets|favicon.ico|login).*)"],
}