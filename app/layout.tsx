import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İrem & Tolgahan | Düğün Davetiyesi",
  description: "İrem ve Tolgahan'ın düğün davetiyesi",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
