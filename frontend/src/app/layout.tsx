import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/wrappers/LayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/providers/AlertProvider";
import { LoadingProvider } from "@/context/LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrackHire",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-cyan-50 selection:bg-cyan-800 selection:text-white scrollbar-thin scrollbar-thumb-cyan-300`}
      >
        <AlertProvider>
          <LoadingProvider>
            <AuthProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </AuthProvider>
          </LoadingProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
