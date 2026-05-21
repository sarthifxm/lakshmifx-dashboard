import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakshmifx Investor Dashboard",
  description: "Investor dashboard starter for forex reporting, trade updates, and client login."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}