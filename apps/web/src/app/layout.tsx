import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Novatra",
  description: "Borderless payments for emerging markets.",
  icons: {
    icon: [
      { url: "/brand/novatra-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/novatra-icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      {
        url: "/brand/novatra-icon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
