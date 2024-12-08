import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

interface ExtendedJWT extends JWT {
  accessToken?: string;
  refreshToken?: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
  refreshToken?: string;
}

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email'
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password'
        }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/sign-in`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-user-timezone': 'America/New_York'
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
              })
            }
          );
          if (!response.ok) {
            return null;
          }
          const data = await response.json();

          console.log(data);
          return {
            id: 'admin',
            email: credentials.email as string,
            accessToken: data.tokens.access_token,
            refreshToken: data.tokens.refresh_token
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: ExtendedJWT; user: User | null }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({
      session,
      token
    }: {
      session: ExtendedSession;
      token: ExtendedJWT;
    }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/'
  }
} satisfies NextAuthConfig;

export default authConfig;
