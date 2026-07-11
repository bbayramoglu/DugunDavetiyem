const WHATSAPP_PHONE = "905392955153";
const WHATSAPP_MESSAGE = "Merhaba Furkan, e-davetiye için seninle iletişime geçmek istiyorum.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function MadeByCredit() {
  return (
    <footer className="made-by">
      <span>Sende E-Davetiye İstiyorsan:</span>{" "}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        title="WhatsApp üzerinden mesaj gönderin"
      >
        İletişim'e Geç ↗
      </a>
    </footer>
  );
}
