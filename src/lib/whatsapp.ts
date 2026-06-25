// Na Curva WhatsApp: +351 910 893 011
export const WHATSAPP_NUMBER = "351910893011";

export function whatsappUrl(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
