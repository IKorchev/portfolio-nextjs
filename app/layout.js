import '../styles/Global.css';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <title>Ivaylo Korchev | Portfolio </title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='title' content='Ivaylo Korchev | Portfolio' />
        <meta name='description' content='Portfolio showcasing my work.' />
        <meta name='keywords' content='Ivaylo, Korchev, Web, Developer, Frontend, Front-end, Backend, React, Next, Nextjs' />
        <meta name='robots' content='index, follow' />
        <meta name='language' content='English' />
        <meta property='og:title' content='Ivaylo Korchev | Portfolio' />
        <meta property='og:description' content='Portfolio showcasing my skills and projects that I have done throughout my coding journey.' />
        <meta property='og:image' content='https://i.ibb.co/SBmGbrd/ikorchev-com.png' />
        <meta property='og:image:secure_url' content='https://i.ibb.co/SBmGbrd/ikorchev-com.png' />
        <meta property='og:url' content='https://ikorchev.com/' />
      </head>
      <body>{children}</body>
    </html>
  );
}
