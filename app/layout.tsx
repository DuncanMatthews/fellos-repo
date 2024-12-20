import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-screen">
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1 flex-grow">
              <div className="container relative mx-auto h-full flex-1">
                <Toaster />
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
