import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "İrem & Tolga'nın düğün davetiyesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const coupleImage = await readFile(
    join(process.cwd(), "public", "couple-illustration.png"),
  );
  const backgroundImage = await readFile(
    join(process.cwd(), "public", "og-wedding-background.jpg"),
  );
  const coupleImageData = `data:image/png;base64,${coupleImage.toString("base64")}`;
  const backgroundImageData = `data:image/jpeg;base64,${backgroundImage.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#244664",
          color: "#fffaf3",
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
            height: "100%",
            inset: 0,
            objectFit: "cover",
            position: "absolute",
            width: "100%",
          }}
        />
        <div
          style={{
            background: "linear-gradient(90deg, rgba(17, 32, 43, 0.84) 0%, rgba(17, 32, 43, 0.54) 58%, rgba(17, 32, 43, 0.1) 100%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            border: "2px solid rgba(255, 250, 243, 0.45)",
            borderRadius: 24,
            inset: 24,
            position: "absolute",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "54%", zIndex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 5 }}>DÜĞÜN DAVETİYESİ</div>
          <div style={{ fontSize: 74, fontWeight: 700, marginTop: 20 }}>İrem &amp; Tolga</div>
          <div style={{ fontSize: 34, marginTop: 28 }}>16 Ağustos 2026, Pazar</div>
          <div style={{ fontSize: 30, marginTop: 12 }}>Kokteyl · 20.00</div>
          <div style={{ fontSize: 22, marginTop: 26 }}>Gelin alma · 18.30</div>
        </div>
        <img
          alt=""
          src={coupleImageData}
          style={{
            height: 610,
            objectFit: "contain",
            position: "absolute",
            right: -36,
            top: 34,
            width: 650,
          }}
        />
      </div>
    ),
    size,
  );
}
