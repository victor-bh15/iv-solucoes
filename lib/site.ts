// Dados centrais da IV Soluções — edite aqui para atualizar em todo o site.

export const site = {
  name: "IV Soluções",
  // WhatsApp em formato internacional, só dígitos (Brasil = 55 + DDD + número)
  whatsapp: "5531996715639",
  whatsappDisplay: "(31) 99671-5639",
  emails: ["victor-bh15@hotmail.com"],
  founders: ["Victor Guilherme", "Inamar Miranda"],
  hours: "07:00 – 22:00",
  // URL pública (domínio próprio)
  url: "https://ivsolucoes.com.br",
} as const;

// Mensagem pré-preenchida ao abrir o WhatsApp
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
