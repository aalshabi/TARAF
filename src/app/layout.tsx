import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ChatWidget from "@/components/chat/ChatWidget";
import RegisterSW from "@/components/pwa/RegisterSW";
import InstallPrompt from "@/components/pwa/InstallPrompt";

export const metadata: Metadata = {
  title: "شركة الترف للاستقدام | Al Taraf Recruitment",
  description:
    "استقدام بثقة، خدمة بتميز. حلول استقدام متكاملة للأسر والمنشآت السعودية.",
  applicationName: "الترف",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "الترف",
  },
  // Favicon is served from src/app/icon.png via Next's file-based metadata convention.
};

export const viewport: Viewport = {
  themeColor: "#0A1F3F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-charcoal">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
        <RegisterSW />
        <InstallPrompt />
      </body>
    </html>
  );
}
