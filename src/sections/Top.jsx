import { priceLabel, checkoutReady } from "../config";
import { useApp } from "../context";
import Icon from "../components/Icon";
import Cover from "../components/Cover";

export function DevBar() {
  if (checkoutReady) return null;
  return (
    <div className="devbar">
      <div className="wrap">
        <b>CONFIGURAÇÃO PENDENTE:</b> defina <code>checkoutUrl</code> em <code>src/config.js</code>. Enquanto
        estiver vazio, os botões de compra não levam a nenhum checkout.
      </div>
    </div>
  );
}

export function Header() {
  const { goto } = useApp();
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="logo" href="#" aria-label="Morar no Paraguai, guia prático">
          <strong>MORAR NO PARAGUAI</strong>
          <span>GUIA PRÁTICO</span>
        </a>
        <a className="btn btn-sm" href="#oferta" onClick={goto("oferta")}>
          Quero o guia
        </a>
      </div>
    </header>
  );
}

const BENEFITS = [
  "Entenda como organizar seu planejamento de mudança.",
  "Conheça as etapas e os documentos que precisam ser verificados.",
  "Compare cidades e avalie custos de moradia.",
  "Organize seu orçamento antes de assumir compromissos.",
  "Consulte fontes oficiais para conferir os requisitos atualizados.",
];

const CHIPS = [
  { icon: "book", text: "Guia digital" },
  { icon: "list", text: "Checklist prático" },
  { icon: "clock", text: "Acesso após confirmação do pagamento" },
];

export function Hero() {
  const { buy } = useApp();
  return (
    <section className="hero theme-red" id="hero" aria-labelledby="h-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="h-hero">Pensando em morar no Paraguai? Descubra o que você precisa saber antes de se mudar.</h1>
          <p className="lead">
            Um guia prático para organizar seus próximos passos, entender os custos, conhecer as etapas da documentação e
            avaliar se a mudança faz sentido para você.
          </p>
          <ul className="benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <Icon name="check" />
                {b}
              </li>
            ))}
          </ul>
          <ul className="chips" aria-label="Características do produto">
            {CHIPS.map((c) => (
              <li key={c.text}>
                <Icon name={c.icon} />
                {c.text}
              </li>
            ))}
          </ul>
          <div className="offer-box" id="oferta-hero">
            <span className="offer-label">ACESSO AO GUIA DIGITAL</span>
            <div className="price-row">
              <span className="price">{priceLabel}</span>
              <span className="price-note">pagamento único</span>
            </div>
            <a className="btn btn-block" {...buy("hero")}>
              QUERO ACESSAR O GUIA
            </a>
            <p className="fine">Produto digital • Entrega após confirmação do pagamento.</p>
          </div>
        </div>

        <div className="hero-art">
          <Cover />
          <p className="caption">Capa ilustrativa do guia digital.</p>
        </div>
      </div>
    </section>
  );
}
