"use client";

import { FormEvent, useState } from "react";
import type { Attendance, EventType } from "@/lib/rsvp";

const successMessages: Record<EventType, string> = {
  wedding: "Yanıtınız bize ulaştı. Bu güzel günü sizinle paylaşmak için sabırsızlanıyoruz.",
  henna: "Yanıtınız bize ulaştı. Gelin hamamında sizleri görmek için sabırsızlanıyoruz.",
};

type RsvpFormProps = {
  eventType?: EventType;
};

export function RsvpForm({ eventType = "wedding" }: RsvpFormProps) {
  const [attendance, setAttendance] = useState<Attendance>("attending");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        attendance,
        guestCount: attendance === "attending" ? form.get("guestCount") : 0,
        note: form.get("note"),
        eventType,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setStatus("success");
      setMessage(successMessages[eventType]);
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setMessage(data.message ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  return (
    <section className="rsvp" id="katilim">
      <p className="eyebrow">BİZİM İÇİN ÖNEMLİ</p>
      <h3>Katılım Durumunuz</h3>
      {status === "success" ? <div className="form-result success" role="status"><span>✦</span>{message}</div> : (
        <form onSubmit={submit}>
          <div className="attendance-buttons" role="group" aria-label="Katılım durumu">
            <button type="button" className={attendance === "attending" ? "selected" : ""} onClick={() => setAttendance("attending")}>✦ Katılacağım<small>Sizlerle olmaktan mutluluk duyarım</small></button>
            <button type="button" className={attendance === "not_attending" ? "selected" : ""} onClick={() => setAttendance("not_attending")}>♥ Katılamayacağım<small>Maalesef katılamayacağım</small></button>
          </div>
          <label>Adınız Soyadınız<input required name="fullName" autoComplete="name" placeholder="Adınız Soyadınız" /></label>
          <label>Kaç kişi geleceksiniz?<input required={attendance === "attending"} disabled={attendance === "not_attending"} name="guestCount" type="number" min="1" max="20" defaultValue="1" /></label>
          <label>Mesajınız <em>(isteğe bağlı)</em><textarea name="note" maxLength={500} placeholder="Katılacak diğer kişilerin isimlerini veya dileklerinizi bizimle paylaşın." /></label>
          {status === "error" && <p className="form-error" role="alert">{message}</p>}
          <button className="submit-button" disabled={status === "loading"}>{status === "loading" ? "Gönderiliyor…" : "Yanıtımı Gönder"}</button>
        </form>
      )}
    </section>
  );
}
