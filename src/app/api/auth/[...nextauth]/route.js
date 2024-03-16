import NextAuth from "next-auth";
// import { Account, User as AuthUser } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "../../../../backend/models/User";
import { dbConnect } from "../../../../backend/libs/db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.username });
          console.log({ user });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      // if (account?.provider == "github") {
      //   await dbConnect();
      //   try {
      //     const existingUser = await User.findOne({ email: user.email });
      //     if (!existingUser) {
      //       const newUser = new User({
      //         email: user.email,
      //       });

      //       await newUser.save();
      //       return true;
      //     }
      //     return true;
      //   } catch (err) {
      //     console.log("Error saving user", err);
      //     return false;
      //   }
      // }
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15,
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) token.user = user;
      if (account) token.accessToken = account.access_token;
      if (trigger === "update") {
        if (session.user) {
          token.user = { ...user, ...session.user };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  events: {
    async signOut({ token, session }) {
      token = {};
      session = {};
    },
    async signIn({ user }) {
      const userId = user?._id;
      if (userId) {
        await dbConnect();
        const user = await User.findById(userId);
        if (user) {
          return user;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
