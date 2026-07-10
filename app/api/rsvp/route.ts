import { NextResponse } from "next/server";
import { isValidAttendance, normalizeGuestName } from "@/lib/rsvp";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : "";
    const attendance = body.attendance;
    const count = Number(body.guestCount);

    if (fullName.length < 3 || fullName.length > 100 || !isValidAttendance(attendance)) {
      return NextResponse.json({ message: "Lütfen tüm zorunlu alanları kontrol edin." }, { status: 400 });
    }
    if (attendance === "attending" && (!Number.isInteger(count) || count < 1 || count > 20)) {
      return NextResponse.json({ message: "Katılacak kişi sayısını 1 ile 20 arasında girin." }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("rsvps").insert({
      full_name: fullName,
      normalized_name: normalizeGuestName(fullName),
      attendance,
      guest_count: attendance === "attending" ? count : 0,
      note: note || null,
    });

    if (error?.code === "23505") {
      return NextResponse.json({ message: "Bu isim soyisim daha önce form gönderdi." }, { status: 409 });
    }
    if (error) throw error;
    return NextResponse.json({ message: "Yanıtınız kaydedildi." }, { status: 201 });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return NextResponse.json({ message: "Şu anda yanıtınız kaydedilemedi. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
