import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { GitHubUserSchema, type GitHubUser } from "./app/lib/github/schemas";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: GitHubUser & DefaultSession["user"];
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        accessToken?: string;
        githubUser?: GitHubUser;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.accessToken = account.access_token;
                token.githubUser = GitHubUserSchema.parse(profile);
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            if (token.githubUser) {
                session.user = { ...session.user, ...token.githubUser };
            }
            return session;
        },
    },
});
