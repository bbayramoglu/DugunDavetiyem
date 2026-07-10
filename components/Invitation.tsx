"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RsvpForm } from "./RsvpForm";

const weddingDate = new Date("2026-08-16T20:00:00+03:00");

function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const update = () => {
      const milliseconds = Math.max(0, weddingDate.getTime() - Date.now());
      setRemaining({
        days: Math.floor(milliseconds / 86_400_000),
        hours: Math.floor((milliseconds / 3_600_000) % 24),
        minutes: Math.floor((milliseconds / 60_000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Düğüne kalan süre">
      <span><strong>{remaining.days}</strong> gün</span>
      <span><strong>{remaining.hours}</strong> saat</span>
      <span><strong>{remaining.minutes}</strong> dk</span>
    </div>
  );
}

export function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <main className={opened ? "site opened" : "site"}>
      <section className="intro" aria-hidden={opened}>
        <Image src="/couple-illustration.png" alt="" fill priority sizes="100vw" className="intro-image" />
        <div className="intro-shade" />
        <div className="intro-content">
          <p className="eyebrow light">DAVETLİSİNİZ</p>
          <h1>İrem <i>&amp;</i> Tolgahan</h1>
          <p className="intro-date">16 Ağustos 2026</p>
          <button className="open-button" onClick={() => setOpened(true)}>Davetiyeyi Aç <span>✦</span></button>
        </div>
      </section>

      <section className="invitation" aria-hidden={!opened}>
        <div className="paper-noise" />
        <div className="ornament ornament-top">❦ <span>♡</span> ❦</div>
        <div className="content-shell">
          <p className="eyebrow">BİRLİKTE BİR ÖMÜR BOYU</p>
          <h2>İrem <i>&amp;</i> Tolgahan</h2>
          <p className="invitation-copy">Hayatlarımızı birleştireceğimiz bu özel günde<br />sizleri de aramızda görmekten mutluluk duyarız.</p>

          <div className="couple-art-wrap">
            <Image src="/couple-illustration.png" alt="İrem ve Tolgahan'ın düğün illüstrasyonu" width={1536} height={1024} priority sizes="(max-width: 680px) 92vw, 530px" className="couple-art" />
          </div>

          <div className="event-card">
            <p className="card-label">DÜĞÜN GÜNÜ</p>
            <p className="event-date">16 Ağustos 2026, Pazar</p>
            <div className="rule" />
            <p><b>20.00</b> · Kokteyl</p>
            <Countdown />
          </div>

          <div className="families">
            <div><span>GELİNİN AİLESİ</span><b>Fatma &amp; İsa Ceylan</b></div>
            <div><span>DAMADIN AİLESİ</span><b>Kerime &amp; Mesut Koçer</b></div>
          </div>

          <section className="pickup-section">
            <p className="eyebrow">GÜNÜN İLK BULUŞMASI</p>
            <h3>Gelin Çıkartma Yeri</h3>
            <p className="pickup-time"><b>18.00</b> · Gelin çıkartma</p>
            <p className="pickup-address">Dağcıoğlu Apartmanı (Belke Yapı) No:18</p>
            <div className="map-preview pickup-map-preview">
              <iframe
                title="Gelin çıkartma yeri konumu"
                src="https://www.google.com/maps?q=41.2362777%2C32.6582391&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="map-open" href="https://maps.app.goo.gl/ZfQ5SfwYvprELfMZ7" target="_blank" rel="noreferrer">⌖ Haritalar&apos;da aç <span>↗</span></a>
            </div>
          </section>

          <section className="venue-section">
            <p className="eyebrow">KONUM</p>
            <h3>Doruk Havuzlu Konak</h3>
            <p>Aşağı Mahallesi, Yazıköy<br />Safranbolu / Karabük</p>
            <div className="map-preview">
              <iframe
                title="Doruk Havuzlu Konak konumu"
                src="https://www.google.com/maps?q=Doruk%20Havuzlu%20Konak%2C%20Yaz%C4%B1k%C3%B6y%2C%20Safranbolu&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="map-open" href="https://maps.app.goo.gl/5kbwTzSradyNNVtU7" target="_blank" rel="noreferrer">⌖ Haritalar&apos;da aç <span>↗</span></a>
            </div>
          </section>

          <RsvpForm />
          <p className="closing">Sevgiyle bekliyoruz <span>♡</span></p>
        </div>
        <div className="ornament ornament-bottom">❦ <span>✦</span> ❦</div>
      </section>
    </main>
  );
}
