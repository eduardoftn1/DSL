/* ============================================================
   CONFIGURAÇÃO CENTRAL
   Edite apenas este arquivo para trocar preço, checkout, suporte,
   entregáveis, imagens e integrações. Nada aqui é dado fictício:
   o que está vazio é pendência real de configuração.
   ============================================================ */
export const CONFIG = {
  productName: "Guia Morar no Paraguai",
  price: 19.9, // único lugar onde o preço é definido
  currency: "BRL",

  checkoutUrl: "", // PENDENTE: URL do checkout externo. Todos os botões de compra usam este valor.
  successUrl: "", // PENDENTE: configure no checkout o retorno para <seu-domínio>/#obrigado
  paymentMethods: [], // ex.: ["Pix", "Cartão"]. Só aparece se preenchido.
  supportContact: "", // PENDENTE: canal de suporte (e-mail, WhatsApp etc.)

  responsibleName: "Henrique",
  offerOwner: "[NOME OU IDENTIFICAÇÃO DO RESPONSÁVEL PELA OFERTA]",

  // Só marque true quando o item existir e estiver incluído no produto.
  deliverables: { guide: true, checklist: true, spreadsheet: true, sources: true },

  // Vídeo de apresentação (sem autoplay, carrega ao tocar). src vazio = espaço reservado.
  expertVideo: { src: "", poster: "" },

  // Prévias reais do material. Troque src por imagens reais (WebP/AVIF) quando estiverem prontas.
  previews: [
    { title: "Página de checklist", desc: "Documentos, pesquisas e providências", src: "", alt: "" },
    { title: "Página de planejamento financeiro", desc: "Custos iniciais e reserva", src: "", alt: "" },
    { title: "Página de documentação e fontes", desc: "Etapas e consultas oficiais", src: "", alt: "" },
  ],

  // Custos por cidade: preencha SOMENTE com dado confiável e datado.
  // Exemplo: { text: "...", date: "mm/aaaa", source: "..." }
  cityCosts: { assuncao: null, cde: null, encarnacion: null },

  // Links oficiais (CONFIRME cada endereço antes de publicar).
  officialLinks: [
    { label: "Dirección Nacional de Migraciones (Paraguai)", note: "Requisitos migratórios e residência", url: "https://www.migraciones.gov.py" },
    { label: "Subsecretaría de Estado de Tributación (SET)", note: "Informações tributárias do Paraguai", url: "https://www.set.gov.py" },
    { label: "Receita Federal (Brasil)", note: "Obrigações fiscais no Brasil", url: "https://www.gov.br/receitafederal" },
  ],

  // Páginas legais (PENDENTE: informe as URLs reais).
  legal: { privacy: "", terms: "", refund: "" },

  // Meta Pixel. Pixel ID vazio = nenhum script de terceiros é carregado.
  tracking: { pixelId: "", requireConsent: false, consentGranted: true },
};

export const priceLabel = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: CONFIG.currency,
})
  .format(CONFIG.price)
  .replace(/ /g, " ");

export const supportLabel = CONFIG.supportContact || "[CANAL DE SUPORTE]";
export const checkoutReady = Boolean(CONFIG.checkoutUrl);
