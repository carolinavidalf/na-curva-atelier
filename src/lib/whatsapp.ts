// Update this number with the real Na Curva WhatsApp business line.
export const WHATSAPP_NUMBER = "351900000000";

export function whatsappUrl(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const WHATSAPP_GENERAL = whatsappUrl(
  "Olá Na Curva, gostaria de saber mais sobre uma reserva.",
);

export function whatsappForDress(name: string): string {
  return whatsappUrl(
    `Olá Na Curva, gostaria de reservar "${name}". Podem confirmar a disponibilidade?`,
  );
}
