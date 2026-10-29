import { useState } from "react";
import { CONFIG } from "../config";
import Icon from "../components/Icon";

/* ---------- Identificação ---------- */
const PROBLEMS = [
  { icon: "doc", title: "Documentação", text: "Saiba quais documentos e procedimentos precisam ser verificados para não ser barrado." },
  { icon: "wallet", title: "Meu número pessoal", text: "Tenha acesso ao meu número para tirar dúvidas (Vitalício)" },
  { icon: "pin", title: "Escolha da cidade", text: "Compare fatores como moradia, infraestrutura, serviços e estilo de vida." },
  { icon: "shield", title: "Lista de empresas contratando com salário de +R$5k", text: "Listas enormes de empresas atualizadas." },
  { icon: "list", title: "Grupo VIP", text: "Acesso ao Grupo VIP com atualizações para o resto da vida!" },
];

export function Identification() {
  return (
    <section className="section band-white theme-white" aria-labelledby="h-ident">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-ident">Antes de meter o pé do Brasil, você precisa saber DISSO!</h2>

        </div>
        <div className="cards-5">
          {PROBLEMS.map((p) => (
            <article className="card" key={p.title}>
              <div className="ico">
                <Icon name={p.icon} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Responsável ---------- */
function Video() {
  const { src, poster } = CONFIG.expertVideo;
  const [playing, setPlaying] = useState(false);

  if (src && playing) {
    return (
      <div className="video-box">
        <video controls autoPlay playsInline preload="metadata" src={src} poster={poster || undefined} />
      </div>
    );
  }

  const style = poster ? { background: `url(${poster}) center/cover` } : undefined;
  const clickable = Boolean(src);

  return (
    <div className="video-box">
      <div
        className="video-ph"
        style={{ ...style, cursor: clickable ? "pointer" : undefined }}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? () => setPlaying(true) : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPlaying(true);
                }
              }
            : undefined
        }
      >
        <div className="play">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 4l13 8-13 8z" />
          </svg>
        </div>
        <b>Apresentação do guia</b>
        {!src && <small>Vídeo a ser inserido</small>}
      </div>
    </div>
  );
}

export function Expert() {
  return (
    <section className="section theme-blue" aria-labelledby="h-expert">
      <div className="wrap expert-grid">
        <div className="expert-copy">
          <h2 id="h-expert">Como larguei tudo no Brasil e vivo no Paraguai há 5 anos.</h2>
          <div className="expert-who">
            <div className="avatar" aria-hidden="true">
              <Icon name="user" />
            </div>
            <div>
              <b>{CONFIG.responsibleName}</b>
              <small>Responsável pelo guia</small>
            </div>
          </div>
          <p>
            Há cinco anos, deixei tudo no Brasil e comecei uma nova vida no Paraguai. Cheguei sem nada e, com o tempo,
            conquistei meu espaço. No caminho, vivi erros e acertos que mudaram minha forma de planejar.
          </p>
          <p>
            Agora quero compartilhar essas experiências para ajudar outras pessoas a se prepararem melhor para essa mudança.
          </p>
        </div>
        <Video />
      </div>
    </section>
  );
}

/* ---------- O que você vai receber ---------- */
const GUIDE_TOPICS = [
  "Visão geral do processo",
  "Planejamento inicial",
  "Documentação",
  "Moradia e cidades",
  "Custos e organização financeira",
  "Trabalho e atividades profissionais",
  "Cuidados fiscais",
  "Próximos passos",
];

const ITEMS = [
  {
    key: "guide",
    icon: "book",
    green: false,
    title: "Guia prático de mudança",
    text: "Conteúdo organizado para entender os principais aspectos envolvidos no planejamento de uma mudança para o Paraguai.",
    topics: GUIDE_TOPICS,
  },
  {
    key: "checklist",
    icon: "list",
    green: true,
    title: "Checklist de preparação",
    text: "Uma lista organizada de documentos, pesquisas e providências para acompanhar seu planejamento.",
  },
  {
    key: "spreadsheet",
    icon: "sheet",
    green: true,
    title: "Planilha de custos iniciais",
    text: "Uma ferramenta editável para estimar viagem, moradia, alimentação, transporte, despesas documentais e reserva financeira.",
  },
  {
    key: "sources",
    icon: "link",
    green: true,
    title: "Lista de consultas importantes",
    text: "Referências para consultar requisitos migratórios, informações tributárias e outros dados relevantes diretamente nas fontes responsáveis.",
  },
];

export function Receive() {
  return (
    <section className="section band-white theme-white" aria-labelledby="h-recv">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-recv">Tudo organizado para você sair da pesquisa solta e partir para o planejamento.</h2>
        </div>
        <div className="recv-grid">
          {ITEMS.map((it) => (
            <article className={"card" + (CONFIG.deliverables[it.key] ? "" : " is-pending")} key={it.key}>
              <div className={"ico" + (it.green ? " g" : "")}>
                <Icon name={it.icon} />
              </div>
              <span className="tag-pending">Em preparação</span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              {it.topics && (
                <ul>
                  {it.topics.map((t) => (
                    <li key={t}>
                      <Icon name="check" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
