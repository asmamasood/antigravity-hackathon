import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResQ AI — Autonomous Disaster Command System",
  description: "AI-powered emergency response platform for Pakistan smart-city crisis management. Real-time flood, heatwave, and disaster response.",
  keywords: "emergency response, AI, Pakistan, disaster management, crisis response, smart city",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ResQ AI",
  },
  openGraph: {
    title: "ResQ AI — Autonomous Disaster Command System",
    description: "AI that saves lives before humans react.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050d18",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

import { EntryProvider } from "@/components/providers/entry-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&libraries=places" async defer></script>
      </head>
      <body className="min-h-full antialiased">
        <EntryProvider>
          {children}
        </EntryProvider>
      </body>
    </html>
  );
}
