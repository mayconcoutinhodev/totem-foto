import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false

      const path = req.nextUrl.pathname

      if (path.startsWith("/admin")) {
        return token.role === "ADMIN"
      }

      if (path.startsWith("/ativacao")) {
        return token.role === "PROMOTOR"
      }

      return true
    },
  },
})


export const config = {

  matcher: ["/((?!api/upload|api/auth|img|_next/static|_next/img|favicon.ico).*)"],
}