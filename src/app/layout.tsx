import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import GlobalLoading from "@/components/GlobalLoading";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PHANOMPHRAI | ออกแบบ ก่อสร้าง ต่อเติม",
  description:
    "PHANOMPHRAI รับเหมาก่อสร้างและออกแบบสถาปัตยกรรม ก่อสร้างบ้านใหม่ ต่อเติม รีโนเวท ด้วยมาตรฐานสูงสุด",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "PHANOMPHRAI",
    description: "ออกแบบ ก่อสร้าง ต่อเติม ด้วยมาตรฐานสูงสุด",
    type: "website",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHANOMPHRAI",
    description: "ออกแบบ ก่อสร้าง ต่อเติม ด้วยมาตรฐานสูงสุด",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=Space+Mono:wght@400;700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <GlobalLoading />
          {children}
        </Providers>
      </body>
    </html>
  );
}

