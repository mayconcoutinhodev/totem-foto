import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
        
      if (!token) return false

      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token.role === "ADMIN"
      }
      if (req.nextUrl.pathname.startsWith("/ativacao")) {
        return token.role === "PROMOTOR"
      }
      return true 
    },
  },
})

export const config = {
  matcher: ["/admin/:path*", "/ativacao/:path*"],
}