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
  { label: "DOCUMENTAÇÃO:", text: "entenda as etapas e saiba quais requisitos precisa conferir." },
  { label: "DINHEIRO:", text: "organize os custos iniciais, a moradia e seu orçamento mensal." },
  { label: "CIDADES:", text: "compare Assunção, Ciudad del Este e Encarnación." },
  { label: "PLANEJAMENTO:", text: "saiba o que pesquisar e resolver antes de viajar." },
  { label: "CHECKLIST:", text: "acompanhe as principais etapas sem depender de dezenas de pesquisas separadas." },
];

const CHIPS = [
  { icon: "book", text: "Guia digital prático" },
  { icon: "list", text: "Checklist de planejamento" },
  { icon: "sheet", text: "Planilha de custos" },
  { icon: "link", text: "Links para fontes oficiais" },
];

export function Hero() {
  const { buy } = useApp();
  return (
    <section className="hero theme-red" id="hero" aria-labelledby="h-hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="h-hero">MORAR NO PARAGUAI: O SEGREDO QUE NINGUÉM TE CONTA!</h1>
          <h2>O QUE VOCÊ VAI DESCOBRIR:</h2>
          <p className="lead">
            <strong>ANTES DE SAIR DO BRASIL, DESCUBRA COMO CHEGAR NO PARAGUAI GANHANDO MAIS DO QUE 90% DOS BRASILEIROS.</strong>
          </p>
          <ul className="benefits">
            {BENEFITS.map((b) => (
              <li key={b.label}>
                <Icon name="check" />
                <span><strong>{b.label}</strong> {b.text}</span>
              </li>
            ))}
          </ul>
          <h2>VOCÊ RECEBE:</h2>
          <ul className="chips" aria-label="Materiais incluídos no guia">
            {CHIPS.map((c) => (
              <li key={c.text}>
                <Icon name={c.icon} />
                {c.text}
              </li>
            ))}
          </ul>
          <div className="offer-box" id="oferta-hero">
            <span className="offer-label">NÃO PRECISA GASTAR UMA FORTUNA PARA COMEÇAR A SE ORGANIZAR.</span>
            <div className="price-row">
              <span className="price">{priceLabel}</span>
              <span className="price-note">pagamento único, sem mensalidade</span>
            </div>
            <a className="btn btn-block" {...buy("hero")}>
              QUERO ME PREPARAR PARA MORAR NO PARAGUAI
            </a>
            <p className="fine">Produto digital. Acesso após a confirmação do pagamento.</p>
          </div>
          <p><strong>Sua mudança começa com planejamento. Descubra o que precisa resolver antes de dar o próximo passo.</strong></p>
        </div>

        <div className="hero-art">
          <Cover />
          <p className="caption">Capa ilustrativa do guia digital.</p>
        </div>
      </div>
    </section>
  );
}
