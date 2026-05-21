import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        // demo user (replace later with DB)
        const user = {
          id: "1",
          name: "Admin",
          email: "admin@laxmifx.com",
          role: "admin"
        };

        if (
          credentials?.email === "admin@laxmifx.com" &&
          credentials?.password === "admin123"
        ) {
          return user;
        }

        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // FIXED SAFE CAST
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };