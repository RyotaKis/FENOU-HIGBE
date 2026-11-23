// Depuis novembre 2024, les numéros béninois ont 10 chiffres : on ajoute
// « 01 » devant l'ancien numéro à 8 chiffres (61 01 66 73 → 01 61 01 66 73).
// Les liens wa.me doivent utiliser le nouveau format, sinon WhatsApp
// répond « numéro invalide ».
export const WHATSAPP_NUMBER = "2290161016673";
export const SONITA_WHATSAPP_NUMBER = "2290197351639";

export function getWhatsAppLink(message?: string, number = WHATSAPP_NUMBER) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
