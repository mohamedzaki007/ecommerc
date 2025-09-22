import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (res.ok && data.token) {
                    const userObject = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        token: data.token,
                    };
                    return userObject;
                }
                return null;
            }
        })
    ],

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
