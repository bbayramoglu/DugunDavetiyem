import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dugun-davetiyem-zeta.vercel.app"),
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
