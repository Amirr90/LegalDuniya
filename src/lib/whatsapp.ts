/** Build a WhatsApp deep link. `e164Digits` should be country code + number, digits only (no + or spaces). */
export function whatsappUrl(e164Digits: string, message: string): string {
  const digits = e164Digits.replace(/\D/g, "");
  if (!digits) return "#";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
