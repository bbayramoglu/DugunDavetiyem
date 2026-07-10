import Link from "next/link";
import type { EventType } from "@/lib/rsvp";

type EventSwitchProps = {
  active: EventType;
};

export function EventSwitch({ active }: EventSwitchProps) {
  return (
    <nav className="event-switch" aria-label="Davetiye seçimi">
      <Link
        href="/"
        className={active === "wedding" ? "active" : ""}
        aria-current={active === "wedding" ? "page" : undefined}
      >
        Düğün
      </Link>
      <Link
        href="/kinagecesi"
        className={active === "henna" ? "active" : ""}
        aria-current={active === "henna" ? "page" : undefined}
      >
        Kına
      </Link>
    </nav>
  );
}
