
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/app/components/CartProvider";
import { Header } from "@/app/components/Header";
import { CartSheet } from "@/app/components/CartSheet";
import { CartFab } from "@/app/components/CartFab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cryspo.Food — Crisp · Fresh · Fast",
  description:
    "Order crisp, fresh and fast meals from Cryspo.Food. Burgers, pizza, sushi, salads and more — delivered hot to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
     <Script
  id="google-adsense"
  async
  strategy="beforeInteractive"
  crossOrigin="anonymous"
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3472931488667801"
/>
      </head>

      <body className="min-h-full flex flex-col text-stone-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <CartFab />
          <CartSheet />
        </CartProvider>
      </body>
    </html>
  );
}
