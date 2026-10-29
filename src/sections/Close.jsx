import { CONFIG, priceLabel, supportLabel } from "../config";
import { useApp } from "../context";
import Icon from "../components/Icon";

/* ---------- Oferta principal ---------- */
const OFFER_ITEMS = [
  { key: "guide", text: "Guia digital" },
  { key: "checklist", text: "Checklist de preparação" },
  { key: "spreadsheet", text: "Planilha editável" },
  { key: "sources", text: "Lista de fontes oficiais" },
];

export function Offer() {
  const { buy } = useApp();
  return (
    <section className="offer-sec theme-white" id="oferta" aria-labelledby="h-offer">
      <div className="wrap offer-grid">
        <div className="offer-copy">
          <h2 id="h-offer">Comece seu planejamento com mais clareza.</h2>
          <p>Tenha em um só lugar o guia, o checklist, a planilha de custos e as referências para continuar sua pesquisa.</p>
        </div>
        <div className="offer-card">
          <ul>
            {OFFER_ITEMS.filter((i) => CONFIG.deliverables[i.key]).map((i) => (
              <li key={i.key}>
                <Icon name="check" />
                {i.text}
              </li>
            ))}
          </ul>
          <div className="price-row">
            <span className="price">{priceLabel}</span>
            <span className="price-note">pagamento único</span>
          </div>
          <a className="btn btn-block" {...buy("offer")}>
            QUERO MEU GUIA POR {priceLabel}
          </a>
          <p className="fine">Produto digital. Acesso após confirmação do pagamento.</p>
          {CONFIG.paymentMethods.length > 0 && (
            <p className="pay-methods">Formas de pagamento: {CONFIG.paymentMethods.join(", ")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Perguntas frequentes ---------- */
const FAQ = [
  ["O guia é físico ou digital?", "É um produto digital, disponibilizado após a confirmação do pagamento."],
  ["Preciso já ter decidido me mudar?", "Não. O material também pode ajudar quem ainda está avaliando se a mudança faz sentido."],
  [
    "O guia garante que vou conseguir residência?",
    "Não. O guia é um material informativo de planejamento. A concessão depende dos requisitos aplicáveis e da análise das autoridades competentes.",
  ],
  [
    "As informações podem mudar?",
    "Sim. Requisitos, taxas e procedimentos podem mudar. O material deve informar sua data de revisão e indicar as fontes oficiais para conferência.",
  ],
  [
    "Posso trabalhar no Paraguai?",
    "As possibilidades dependem da atividade, da situação migratória, das autorizações aplicáveis e de outros requisitos. O guia ajuda a identificar os pontos que precisam ser verificados.",
  ],
  [
    "O material resolve minha situação tributária no Brasil?",
    "Não substitui orientação individual. A residência fiscal e as obrigações tributárias dependem das circunstâncias de cada pessoa e devem ser verificadas com as fontes competentes ou um profissional qualificado.",
  ],
  ["Como recebo o produto?", "Logo após a confirmação do pagamento, você receberá por e-mail as instruções para acessar o guia e os materiais."],
  [
    "Existe política de reembolso?",
    "Consulte a política de compra e os direitos legais aplicáveis ao consumidor, incluindo o direito de arrependimento previsto na legislação brasileira.",
  ],
];

export function Faq() {
  return (
    <section className="section theme-blue" aria-labelledby="h-faq">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-faq">Perguntas frequentes</h2>
        </div>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <div className="ans">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Rodapé ---------- */
const LEGAL = [
  ["privacy", "Política de privacidade"],
  ["terms", "Termos de uso"],
  ["refund", "Política de reembolso"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <strong>MORAR NO PARAGUAI</strong> · Guia digital (produto digital, sem envio físico)
          <br />
          Responsável pela oferta: <span>{CONFIG.offerOwner}</span>
          <br />
          Suporte: <span>{supportLabel}</span>
        </div>
        <nav className="foot-links" aria-label="Documentos legais">
          {LEGAL.map(([k, label]) =>
            CONFIG.legal[k] ? (
              <a key={k} href={CONFIG.legal[k]} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <span key={k} className="off" title="Link a configurar">
                {label} (a configurar)
              </span>
            )
          )}
        </nav>
        <p className="disclaimer">
          Este material tem finalidade informativa e educacional. Não constitui garantia de residência, emprego, renda ou
          economia tributária. Confirme requisitos e obrigações diretamente nas fontes competentes.
        </p>
      </div>
    </footer>
  );
}
