import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MotionProvider } from '@/components/motion-provider';
import { Spotlight } from '@/components/spotlight';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/Global.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ikorchev.com'),
  title: 'Ivaylo Korchev | Portfolio',
  description: 'Portfolio showcasing my work.',
  keywords: [
    'Ivaylo',
    'Korchev',
    'Software Engineer',
    'Web',
    'Mobile',
    'React',
    'React Native',
    'Expo',
    'Next.js',
    'AI',
  ],
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Ivaylo Korchev | Portfolio',
    description: 'Portfolio showcasing my skills and projects that I have done throughout my coding journey.',
    url: 'https://ikorchev.com/',
    images: ['https://i.ibb.co/SBmGbrd/ikorchev-com.png'],
  },
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
