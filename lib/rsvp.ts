export type Attendance = "attending" | "not_attending";
export type EventType = "wedding" | "henna";

export function normalizeGuestName(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function isValidAttendance(value: unknown): value is Attendance {
  return value === "attending" || value === "not_attending";
}

export function isValidEventType(value: unknown): value is EventType {
  return value === "wedding" || value === "henna";
}
