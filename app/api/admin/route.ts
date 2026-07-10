import { NextResponse } from "next/server";
import { createServiceClient, isAdminEmail } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ message: "Oturum gerekli." }, { status: 401 });

    const supabase = createServiceClient();
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !isAdminEmail(authData.user?.email)) {
      return NextResponse.json({ message: "Bu sayfaya erişim yetkiniz yok." }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("rsvps")
      .select("id, full_name, attendance, guest_count, note, event_type, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ rsvps: data });
  } catch (error) {
    console.error("Admin fetch failed", error);
    return NextResponse.json({ message: "Yanıtlar alınamadı." }, { status: 500 });
  }
}
