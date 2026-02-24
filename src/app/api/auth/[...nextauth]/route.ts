import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email === "michel.vvs@gmail.com") {
        return true
      }
      return false // Bloquear qualquer outra pessoa
    },
  },
})

export { handler as GET, handler as POST }
