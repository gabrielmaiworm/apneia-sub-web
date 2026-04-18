import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Syne } from 'next/font/google';
import { ServiceWorkerRegister } from '@/components/sw-register';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400'],
});

export const metadata: Metadata = {
  title: 'APNEIA SUB — A Plataforma do Mergulhador',
  description: 'Plataforma social, técnica e georreferenciada para apneia e pesca sub.',
  applicationName: 'APNEIA SUB',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="night" lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
