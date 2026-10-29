import { CONFIG } from "../config";
import { useApp } from "../context";
import Icon from "../components/Icon";

/* ---------- Benefícios e objetivos ---------- */
const BENEFITS = [
  "Ir ao mercado com mais tranquilidade e menos preocupação com os preços.",
  "Conquistar o carro que você deseja.",
  "Ter um smartphone de última geração.",
  "Montar uma casa mobiliada do seu jeito.",
  "Construir uma vida feliz ao lado da sua família.",
];

export function Docs() {
  return (
    <section className="section theme-blue" aria-labelledby="h-docs">
      <div className="wrap docs-grid">
        <div className="dream-heading">
          <div className="section-head">
            <h2 id="h-docs">Realize o sonho de todo brasileiro.</h2>
          </div>
        </div>
        <ul className="dream-benefits">
          {BENEFITS.map((benefit) => (
            <li key={benefit}>
              <span className="benefit-check">
                <Icon name="check" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Planejamento financeiro ---------- */
const CATEGORIES = [
  "Transporte até o destino",
  "Hospedagem inicial",
  "Aluguel",
  "Caução e custos de entrada no imóvel",
  "Alimentação",
  "Transporte local",
  "Documentação",
  "Comunicação e internet",
  "Saúde e imprevistos",
  "Reserva financeira",
];

export function Finance() {
  const { goto } = useApp();
  return (
    <section className="section band-white theme-white" aria-labelledby="h-fin">
      <div className="wrap fin-copy">
        <h2 id="h-fin">Quanto dinheiro você precisa reservar para começar?</h2>
        <div>
          <a className="btn" href="#hero" onClick={goto("hero")}>
            Quero organizar meus custos
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Diferenciação ---------- */
const SCATTERED = [
  "Informações em diferentes sites.",
  "Dificuldade para organizar as etapas.",
  "Risco de usar referências desatualizadas.",
  "Falta de uma lista centralizada para acompanhar o planejamento.",
];
const ORGANIZED = [
  "Salários de +R$7k",
  "Emprego rápido",
  "Encontre aluguel barato",
  "Ferramentas, mentoria e grupo VIP",
];

export function Compare() {
  return (
    <section className="section theme-red" aria-labelledby="h-diff">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-diff">Por que usar um guia em vez de começar do zero?</h2>
        </div>
        <div className="cmp">
          <div className="cmp-col cmp-a">
            <h3>PESQUISA DISPERSA</h3>
            <ul>
              {SCATTERED.map((t) => (
                <li key={t}>
                  <Icon name="x" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="cmp-col cmp-b">
            <h3>GUIA ORGANIZADO</h3>
            <ul>
              {ORGANIZED.map((t) => (
                <li key={t}>
                  <Icon name="check" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="cmp-foot">
          Há muita informação útil disponível de graça. O valor do guia está na organização, na praticidade e na economia de
          tempo.
        </p>
      </div>
    </section>
  );
}
