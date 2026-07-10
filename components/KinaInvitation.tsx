"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RsvpForm } from "./RsvpForm";

const hennaDate = new Date("2026-08-15T19:00:00+03:00");
const HENNA_DATE_LABEL = "15 Ağustos 2026, Cumartesi";
const HENNA_TIME_LABEL = "19.00";
const HENNA_PROGRAM_LABEL = "Kına Yakma";
const HENNA_VENUE_NAME = "Mekan bilgisi yakında paylaşılacak";
const HENNA_VENUE_ADDRESS = "Adres bilgisi yakında paylaşılacak";
const HENNA_MAP_EMBED = "https://www.google.com/maps?q=Safranbolu&output=embed";
const HENNA_MAP_LINK = "https://maps.app.goo.gl/";

function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const update = () => {
      const milliseconds = Math.max(0, hennaDate.getTime() - Date.now());
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
    <div className="countdown" aria-label="Kına gecesine kalan süre">
      <span><strong>{remaining.days}</strong> gün</span>
      <span><strong>{remaining.hours}</strong> saat</span>
      <span><strong>{remaining.minutes}</strong> dk</span>
    </div>
  );
}

export function KinaInvitation() {
  const [opened, setOpened] = useState(false);

  return (
    <main className={opened ? "kina-site site opened" : "kina-site site"}>
      <video className="kina-bg-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <section className="intro" aria-hidden={opened}>
        <Image src="/kinagecesi.png" alt="" fill priority sizes="100vw" className="intro-image" />
        <div className="intro-shade" />
        <div className="intro-content">
          <p className="eyebrow light">DAVETLİSİNİZ</p>
          <h1>İrem&apos;in <i>Kına</i> Gecesi</h1>
          <p className="intro-date">15 Ağustos 2026</p>
          <button className="open-button" onClick={() => setOpened(true)}>Davetiyeyi Aç <span>✦</span></button>
        </div>
      </section>

      <section className="invitation kina-invitation" aria-hidden={!opened}>
        <div className="paper-noise" />
        <div className="ornament ornament-top">❦ <span>♡</span> ❦</div>
        <div className="content-shell">
          <p className="eyebrow">GELENEKSEL BİR GECE</p>
          <h2>İrem&apos;in <i>Kına</i> Gecesi</h2>
          <p className="invitation-copy">
            Kına gecesinde sizleri de aramızda görmekten<br />
            büyük mutluluk duyarız.
          </p>

          <div className="couple-art-wrap">
            <Image
              src="/kinagecesi.png"
              alt="İrem ve Tolgahan'ın kına gecesi illüstrasyonu"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 680px) 92vw, 530px"
              className="couple-art"
            />
          </div>

          <div className="event-card">
            <p className="card-label">KINA GECESİ</p>
            <p className="event-date">{HENNA_DATE_LABEL}</p>
            <div className="rule" />
            <p><b>{HENNA_TIME_LABEL}</b> · {HENNA_PROGRAM_LABEL}</p>
            <Countdown />
          </div>

          <section className="venue-section">
            <p className="eyebrow">KONUM</p>
            <h3>{HENNA_VENUE_NAME}</h3>
            <p>{HENNA_VENUE_ADDRESS}</p>
            <div className="map-preview">
              <iframe
                title="Kına gecesi konumu"
                src={HENNA_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="map-open" href={HENNA_MAP_LINK} target="_blank" rel="noreferrer">⌖ Haritalar&apos;da aç <span>↗</span></a>
            </div>
          </section>

          <RsvpForm eventType="henna" />
          <p className="closing">Sevgiyle bekliyoruz <span>♡</span></p>
        </div>
        <div className="ornament ornament-bottom">❦ <span>✦</span> ❦</div>
      </section>
    </main>
  );
}
