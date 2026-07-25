import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "İrem'in gelin hamamı davetiyesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const hennaImage = await readFile(
    join(process.cwd(), "public", "kinagecesi.png"),
  );
  const backgroundImage = await readFile(
    join(process.cwd(), "public", "og-henna-background.jpg"),
  );
  const hennaImageData = `data:image/png;base64,${hennaImage.toString("base64")}`;
  const backgroundImageData = `data:image/jpeg;base64,${backgroundImage.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#6c1d1d",
          color: "#fff4df",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "54px 74px",
          position: "relative",
          width: "100%",
        }}
      >
        <img
          alt=""
          src={backgroundImageData}
          style={{
            bottom: 0,
            left: 0,
            objectFit: "cover",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />
        <div
          style={{
            background: "linear-gradient(90deg, rgba(64, 12, 12, 0.84) 0%, rgba(64, 12, 12, 0.52) 58%, rgba(64, 12, 12, 0.08) 100%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            border: "2px solid rgba(255, 244, 223, 0.35)",
            borderRadius: 24,
            inset: 24,
            position: "absolute",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "54%", zIndex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 5 }}>GELİN HAMAMI DAVETİYESİ</div>
          <div style={{ fontSize: 68, fontWeight: 700, marginTop: 20 }}>İrem&apos;in Gelin Hamamı</div>
          <div style={{ fontSize: 34, marginTop: 28 }}>15 Ağustos 2026, Cumartesi</div>
          <div style={{ fontSize: 30, marginTop: 12 }}>Kına töreni · 14.00</div>
          <div style={{ fontSize: 22, marginTop: 26 }}>Bulak Ayan Hamamı</div>
        </div>
        <img
          alt=""
          src={hennaImageData}
          style={{
            height: 620,
            objectFit: "contain",
            position: "absolute",
            right: -38,
            top: 26,
            width: 650,
          }}
        />
      </div>
    ),
    size,
  );
}
