import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Landora – Zameen ka Har Raaz, Landora Ke Pass",
  description: "Landora: Your trusted real estate platform. Zameen ka Har Raaz, Landora Ke Pass.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

