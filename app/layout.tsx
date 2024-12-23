import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./redux/Providers";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "./NewComponents/Head";
import { ThemeScript } from './theme-script'

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Find College Students Near You",
  description: "Easily find college students near you by using our convenient search tool to connect with individuals in your area based on location, pincode, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <Head />
      </head>
      <body
        className={cn(
          "antialiased",
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <Providers>
          <GoogleOAuthProvider clientId={`${process.env.CLIENT_ID}`}>
            {children}
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
