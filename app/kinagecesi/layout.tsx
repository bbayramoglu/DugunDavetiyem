import type { Metadata } from "next";
import "./kinagecesi.css";

export const metadata: Metadata = {
  title: "İrem'in Gelin Hamamı",
  description: "İrem'in gelin hamamı davetiyesi",
};

export default function KinaGecesiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
