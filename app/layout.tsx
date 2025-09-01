import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";

export const metadata: Metadata = {
  title: "SFW Barber",
  description: "Make your appointment online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
