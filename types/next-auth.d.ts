import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
