import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProvider } from "@/providers/app-provider";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500"
});

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Buy anything yout want",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
