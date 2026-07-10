import type { Metadata } from "next";
import "./kinagecesi.css";

export const metadata: Metadata = {
  title: "İrem & Tolgahan | Kına Gecesi",
  description: "İrem ve Tolgahan'ın kına gecesi davetiyesi",
};

export default function KinaGecesiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
