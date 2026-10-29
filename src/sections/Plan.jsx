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
        <div>
          <div className="section-head" style={{ marginBottom: 20 }}>
            <h2 id="h-docs">Realize o sonho de todo brasileiro.</h2>
          </div>
        </div>
        <div>
          <ol className="steps">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ol>
        </div>
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
      <div className="wrap fin-grid">
        <div className="fin-copy">
          <h2 id="h-fin">Quanto dinheiro você precisa reservar para começar?</h2>
          <p>
            O valor depende da cidade, da moradia, do estilo de vida, dos documentos necessários e da sua fonte de renda. Em
            vez de confiar em um número genérico, organize sua própria estimativa.
          </p>
          <div>
            <a className="btn" href="#oferta" onClick={goto("oferta")}>
              Quero organizar meus custos
            </a>
          </div>
        </div>
        <div className="sheet" role="group" aria-label="Prévia ilustrativa da planilha de custos, sem valores">
          <div className="sheet-top">
            <span>Planilha de custos iniciais</span>
            <small>Prévia ilustrativa</small>
          </div>
          <div className="sheet-row h">
            <span>CATEGORIA</span>
            <span>ESTIMATIVA</span>
          </div>
          {CATEGORIES.map((c) => (
            <div className="sheet-row" key={c}>
              <span>{c}</span>
              <span className="blank" aria-hidden="true">
                R$
              </span>
            </div>
          ))}
          <div className="sheet-row tot">
            <span>Total estimado</span>
            <span className="blank" aria-hidden="true">
              R$
            </span>
          </div>
          <div className="sheet-foot">Campos em branco: você preenche com os seus próprios dados.</div>
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
  "Conteúdo separado por assunto.",
  "Checklist para acompanhar tarefas.",
  "Planilha para organizar custos.",
  "Links para consultar informações oficiais.",
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
