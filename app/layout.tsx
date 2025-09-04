import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/footer";

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
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
