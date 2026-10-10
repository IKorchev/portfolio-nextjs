import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';
import { Spotlight } from '@/components/spotlight';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/Global.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

// Title, description and social tags come from the Contentful site profile (app/page.tsx)
export const metadata: Metadata = {
  metadataBase: new URL('https://ikorchev.com'),
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Defaults to the visitor's OS setting until they pick a theme explicitly */}
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
          <Spotlight />
        </ThemeProvider>
      </body>
    </html>
  );
}
