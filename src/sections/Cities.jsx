import { CONFIG } from "../config";
import CityArt from "../components/CityArt";

const CITIES = [
  {
    id: "assuncao",
    art: "capital",
    name: "Assunção",
    intro: "Capital do país e maior centro urbano, às margens do rio Paraguai.",
    traits: ["Sede de órgãos públicos e de grande parte dos serviços", "Mais opções de bairros, moradia e serviços"],
    factors: ["Bairro e proximidade de serviços", "Tipo de moradia e custo de entrada", "Deslocamentos do dia a dia"],
  },
  {
    id: "cde",
    art: "border",
    name: "Ciudad del Este",
    intro: "Cidade na fronteira com o Brasil, ligada a Foz do Iguaçu pela Ponte da Amizade.",
    traits: ["Forte atividade comercial", "Proximidade com a fronteira brasileira"],
    factors: [
      "Tipo de trabalho ou atividade pretendida",
      "Rotina de travessia da fronteira, se houver",
      "Moradia, serviços e estilo de vida",
    ],
  },
  {
    id: "encarnacion",
    art: "river",
    name: "Encarnación",
    intro: "Cidade às margens do rio Paraná, em frente à cidade argentina de Posadas.",
    traits: ["Cidade de porte menor que a capital", "Orla e áreas à beira do rio"],
    factors: [
      "Disponibilidade de serviços de que você precisa",
      "Mercado de moradia e de trabalho local",
      "Distância até outras cidades",
    ],
  },
];

function costText(id) {
  const c = CONFIG.cityCosts[id];
  return c && c.text && c.date && c.source ? `${c.text} (fonte: ${c.source}, ${c.date})` : null;
}

export default function Cities() {
  return (
    <section className="section band-white theme-white" aria-labelledby="h-city">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-city">Qual cidade faz mais sentido para você?</h2>
          <p>
            Uma comparação informativa para começar a pesquisa. A escolha depende do seu orçamento, do trabalho, da
            infraestrutura desejada e das suas necessidades.
          </p>
        </div>
        <div className="city-grid">
          {CITIES.map((c) => (
            <article className="card city" key={c.id}>
              <CityArt kind={c.art} />
              <div className="city-body">
                <h3>{c.name}</h3>
                <p>{c.intro}</p>
                <h4>CARACTERÍSTICAS</h4>
                <ul>
                  {c.traits.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <h4>AVALIE ANTES DE ESCOLHER</h4>
                <ul>
                  {c.factors.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {costText(c.id) && <p className="city-cost">{costText(c.id)}</p>}
              </div>
            </article>
          ))}
        </div>
        <p className="city-note">
          Nenhuma cidade é a melhor para todos. O guia ajuda a comparar os fatores que pesam na sua decisão.
        </p>
      </div>
    </section>
  );
}
