/* Landing page "Morar no Paraguai" — 100% JavaScript.
   Este arquivo cria o <head>, o CSS e todo o HTML da página, e depois executa a lógica.
   Para trocar preço, checkout, suporte, Pixel etc., edite o objeto CONFIG mais abaixo. */
(function () {
  "use strict";

  /* ---------- <head>: título, meta tags, favicon e fonte ---------- */
  document.documentElement.lang = "pt-BR";
  document.title = "Morar no Paraguai";
  var addMeta = function (attrs) {
    var m = document.createElement("meta");
    Object.keys(attrs).forEach(function (k) { m.setAttribute(k, attrs[k]); });
    document.head.appendChild(m);
  };
  addMeta({ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" });
  addMeta({ name: "description", content: "Guia digital prático para brasileiros que avaliam se mudar para o Paraguai: planejamento, documentação, cidades e custos. Pagamento único." });
  addMeta({ property: "og:type", content: "website" });
  addMeta({ property: "og:title", content: "Morar no Paraguai — Guia prático de planejamento, documentação e custos" });
  addMeta({ property: "og:description", content: "Organize seus próximos passos, entenda os custos e saiba onde conferir os requisitos oficiais antes de se mudar para o Paraguai." });
  addMeta({ property: "og:locale", content: "pt_BR" });
  var addLink = function (attrs) {
    var l = document.createElement("link");
    Object.keys(attrs).forEach(function (k) { l.setAttribute(k, attrs[k]); });
    document.head.appendChild(l);
  };
  addLink({ rel: "icon", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23D92D36'/%3E%3Cpath d='M10 24V9h6a4.5 4.5 0 0 1 0 9h-6' fill='none' stroke='white' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E" });
  addLink({ rel: "preconnect", href: "https://fonts.googleapis.com" });
  addLink({ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" });
  addLink({ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" });

  /* ---------- CSS ---------- */
  var style = document.createElement("style");
  style.textContent = `
/* Layout: página única de venda, coluna estreita no mobile, 2 colunas no hero em desktop (texto | capa do guia).
   Identidade fixada pela especificação do cliente (paleta e Inter), ela substitui qualquer escolha própria. */
:root{
  --bg:#F8F9FB; --fg:#151923; --red:#D92D36; --red-dark:#B8222B; --green:#16845B;
  --white:#FFFFFF; --muted:#697386; --line:#E5E7EB; --green-soft:#E8F5EF; --red-soft:#FCEBEC;
  --navy-2:#1F2635;
  --font:Inter,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  --radius:12px; --radius-lg:16px;
  --shadow:0 1px 2px rgba(21,25,35,.05),0 4px 14px rgba(21,25,35,.05);
  color-scheme:light;
}
*{box-sizing:border-box}
[hidden]{display:none!important}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--font);font-size:16px;line-height:1.55;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
body.has-sticky{padding-bottom:84px}
h1,h2,h3{margin:0;font-weight:800;letter-spacing:-.02em;line-height:1.12;text-wrap:balance}
h1{font-size:clamp(28px,6.4vw,48px)}
h2{font-size:clamp(24px,4.6vw,36px)}
h3{font-size:18px;letter-spacing:-.01em;line-height:1.25;font-weight:700}
p{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
a{color:inherit}
svg.i{width:22px;height:22px;flex:none;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
:focus-visible{outline:3px solid var(--fg);outline-offset:3px;border-radius:6px}

.wrap{width:100%;max-width:1120px;margin-inline:auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.section{padding-block:48px}
.section-head{display:grid;gap:12px;margin-bottom:28px;max-width:720px}
.section-head p{color:var(--muted);font-size:17px}
.band-white{background:var(--white);border-block:1px solid var(--line)}

/* botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:54px;padding:14px 22px;border:0;border-radius:var(--radius);background:var(--red);color:#fff;font:800 16px/1.2 var(--font);letter-spacing:.01em;text-decoration:none;text-align:center;cursor:pointer;box-shadow:0 6px 16px rgba(217,45,54,.22);transition:background .15s}
.btn:hover{background:var(--red-dark)}
.btn:focus-visible{outline-color:var(--fg)}
.btn-block{width:100%}
.btn-sm{min-height:40px;padding:8px 14px;font-size:14px;box-shadow:none}
.btn-ghost{background:var(--white);color:var(--fg);border:1.5px solid var(--fg);box-shadow:none}
.btn-ghost:hover{background:var(--fg);color:#fff}

/* aviso de configuração (some quando o checkout é definido) */
.devbar{background:var(--fg);color:#fff;font-size:13px;line-height:1.4;padding-block:8px}
.devbar b{color:#FFB3B8}

/* cabeçalho */
.site-header{background:var(--white);border-bottom:1px solid var(--line)}
.site-header .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px}
.logo{display:flex;align-items:baseline;gap:10px;text-decoration:none;min-width:0}
.logo strong{font-weight:800;font-size:15px;letter-spacing:.06em;white-space:nowrap}
.logo span{font-size:11px;font-weight:600;letter-spacing:.14em;color:var(--muted);white-space:nowrap}
@media (max-width:379px){.logo span{display:none}}

/* hero */
.hero{padding-block:28px 40px}
.hero-grid{display:grid;gap:28px;align-items:center}
.hero-copy{display:grid;gap:18px;min-width:0}
.lead{font-size:18px;color:#3A4152}
.benefits{display:grid;gap:10px}
.benefits li{display:flex;gap:10px;align-items:flex-start;font-weight:500}
.benefits svg{color:var(--green);margin-top:1px;width:20px;height:20px;stroke-width:2.4}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips li{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--line);background:var(--white);border-radius:999px;font-size:13px;font-weight:600;color:#3A4152}
.chips svg{width:16px;height:16px;color:var(--green);stroke-width:2.4}
.offer-box{background:var(--white);border:1px solid var(--line);border-radius:var(--radius-lg);padding:20px;box-shadow:var(--shadow);display:grid;gap:14px}
.offer-label{font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--muted)}
.price-row{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.price{font-size:44px;font-weight:800;letter-spacing:-.03em;line-height:1;font-variant-numeric:tabular-nums}
.price-note{font-size:14px;font-weight:600;color:var(--green)}
.fine{font-size:13px;color:var(--muted);text-align:center}
.hero-art{display:grid;justify-items:center;gap:10px}
.cover{width:min(100%,340px);height:auto;filter:drop-shadow(0 18px 24px rgba(21,25,35,.22))}
.caption{font-size:12px;color:var(--muted);text-align:center}
@media (min-width:900px){
  .hero{padding-block:56px 72px}
  .hero-grid{grid-template-columns:1.1fr .9fr;gap:56px}
  .hero-art{position:relative}
  .section{padding-block:72px}
}

/* identificação */
.cards-5{display:grid;gap:14px}
.card{background:var(--white);border:1px solid var(--line);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);display:grid;gap:10px;align-content:start;min-width:0}
.card p{color:var(--muted);font-size:15px}
.ico{width:42px;height:42px;border-radius:10px;background:var(--red-soft);color:var(--red);display:grid;place-items:center}
.ico.g{background:var(--green-soft);color:var(--green)}
@media (min-width:640px){.cards-5{grid-template-columns:repeat(2,1fr)}.cards-5 .card:last-child{grid-column:1/-1}}
@media (min-width:960px){
  .cards-5{grid-template-columns:repeat(6,1fr)}
  .cards-5 .card{grid-column:span 2}
  .cards-5 .card:nth-child(n+4){grid-column:span 3}
  .cards-5 .card:last-child{grid-column:span 3}
}

/* responsável */
.expert-grid{display:grid;gap:28px;align-items:start}
.expert-copy{display:grid;gap:16px;min-width:0}
.expert-copy p{color:#3A4152;font-size:17px}
.expert-who{display:flex;gap:14px;align-items:center}
.avatar{width:72px;height:72px;border-radius:50%;border:1.5px dashed #B6BCC8;background:var(--bg);display:grid;place-items:center;color:#98A0AE;flex:none}
.avatar svg{width:32px;height:32px}
.expert-who b{display:block;font-size:17px}
.expert-who small{color:var(--muted);font-size:13px}
.todo{border:1.5px dashed #B6BCC8;border-radius:var(--radius);padding:12px 14px;color:var(--muted);font-size:14px;background:var(--bg)}
.video-box{position:relative;aspect-ratio:16/9;width:100%;border-radius:var(--radius-lg);overflow:hidden;background:var(--fg);display:grid;place-items:center;color:#fff}
.video-box video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.video-ph{display:grid;gap:10px;justify-items:center;text-align:center;padding:16px}
.video-ph .play{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.5);display:grid;place-items:center}
.video-ph .play svg{width:24px;height:24px;fill:#fff;stroke:none;margin-left:3px}
.video-ph b{font-size:17px}
.video-ph small{color:#AAB1C0;font-size:12px}
@media (min-width:900px){.expert-grid{grid-template-columns:1fr 1fr;gap:56px}}

/* entregáveis */
.recv-grid{display:grid;gap:14px}
@media (min-width:760px){.recv-grid{grid-template-columns:repeat(2,1fr)}}
.recv-grid .card{padding:22px}
.recv-grid ul{display:grid;gap:6px;margin-top:4px;font-size:14px;font-weight:500}
.recv-grid li{display:flex;gap:8px;align-items:flex-start}
.recv-grid li svg{width:16px;height:16px;color:var(--green);stroke-width:2.6;margin-top:3px}
.tag-pending{display:none;justify-self:start;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;background:var(--bg);border:1px solid var(--line);color:var(--muted)}
.is-pending .tag-pending{display:inline-block}
.is-pending{opacity:.72}

/* prévias */
.prev-grid{display:grid;gap:14px}
@media (min-width:760px){.prev-grid{grid-template-columns:repeat(3,1fr)}}
.prev-btn{display:grid;gap:10px;text-align:left;padding:0;border:0;background:none;color:inherit;font:inherit;cursor:zoom-in;min-width:0}
.prev-frame{aspect-ratio:3/4;width:100%;background:var(--white);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;display:grid;place-items:center;position:relative}
.prev-frame img{width:100%;height:100%;object-fit:cover}
.prev-ph{display:grid;gap:8px;justify-items:center;text-align:center;padding:16px;color:var(--muted);font-size:13px}
.prev-ph svg{width:30px;height:30px;color:#B6BCC8}
.prev-ph b{font-size:11px;letter-spacing:.12em;color:var(--red);border:1px solid var(--red);padding:2px 8px;border-radius:4px}
.prev-btn span.t{font-weight:700;font-size:15px}
.prev-btn span.z{font-size:13px;color:var(--muted)}
.modal{position:fixed;inset:0;z-index:50;background:rgba(21,25,35,.78);display:grid;place-items:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.modal-box{background:var(--white);border-radius:var(--radius-lg);width:min(100%,560px);max-height:100%;overflow:auto;padding:16px;display:grid;gap:12px}
.modal-top{display:flex;justify-content:space-between;align-items:center;gap:12px}
.modal-top b{font-size:16px}
.x-btn{width:40px;height:40px;border-radius:10px;border:1px solid var(--line);background:var(--white);display:grid;place-items:center;cursor:pointer;color:var(--fg)}
.modal-body img{width:100%;height:auto;border-radius:8px}
.modal-body .prev-frame{aspect-ratio:3/4;max-height:70vh;margin-inline:auto}

/* cidades */
.city-grid{display:grid;gap:14px}
@media (min-width:900px){.city-grid{grid-template-columns:repeat(3,1fr)}}
.city{padding:0;overflow:hidden;gap:0}
.city-art{position:relative;background:#EEF0F4;border-bottom:1px solid var(--line)}
.city-art svg{display:block;width:100%;height:auto}
.badge-ill{position:absolute;top:10px;left:10px;font-size:11px;font-weight:700;letter-spacing:.08em;background:var(--white);border:1px solid var(--line);color:var(--muted);padding:2px 8px;border-radius:999px}
.city-body{padding:20px;display:grid;gap:12px}
.city-body h4{margin:0;font-size:12px;letter-spacing:.12em;color:var(--muted);font-weight:700}
.city-body ul{display:grid;gap:6px;font-size:14px}
.city-body li{display:flex;gap:8px}
.city-body li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--red);margin-top:8px;flex:none}
.city-cost{font-size:13px;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:8px 10px}
.city-note{margin-top:20px;font-size:15px;color:var(--muted);max-width:720px}

/* documentação */
.docs-grid{display:grid;gap:28px}
@media (min-width:900px){.docs-grid{grid-template-columns:1fr 1fr;gap:56px}}
.steps{display:grid;gap:12px;counter-reset:s}
.steps li{display:grid;grid-template-columns:36px 1fr;gap:14px;align-items:start;background:var(--white);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;font-weight:500;counter-increment:s}
.steps li::before{content:counter(s);width:32px;height:32px;border-radius:50%;background:var(--fg);color:#fff;display:grid;place-items:center;font-weight:800;font-size:14px}
.notice{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#3A4152;background:var(--white);border:1px solid var(--line);border-left:4px solid var(--muted);border-radius:8px;padding:12px 14px;margin-top:14px}
.notice svg{width:18px;height:18px;margin-top:2px;color:var(--muted)}
.links{display:grid;gap:8px;margin-top:14px}
.links a{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:var(--radius);background:var(--white);text-decoration:none;font-weight:600;font-size:15px}
.links a:hover{border-color:var(--fg)}
.links a small{display:block;font-weight:400;color:var(--muted);font-size:12px}
.links svg{color:var(--green)}

/* planilha */
.fin-grid{display:grid;gap:28px;align-items:start}
@media (min-width:900px){.fin-grid{grid-template-columns:.9fr 1.1fr;gap:56px}}
.fin-copy{display:grid;gap:16px;align-content:start}
.fin-copy p{color:#3A4152;font-size:17px}
.sheet{background:var(--white);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow);overflow:hidden}
.sheet-top{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 16px;background:var(--fg);color:#fff;font-size:13px;font-weight:700}
.sheet-top small{font-weight:500;color:#AAB1C0}
.sheet-row{display:grid;grid-template-columns:minmax(0,1fr) 112px;gap:12px;padding:11px 16px;border-top:1px solid var(--line);font-size:14px;align-items:center}
.sheet-row:first-of-type{border-top:0}
.sheet-row.h{background:var(--bg);font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--muted);border-top:0}
.sheet-row .blank{height:26px;border-bottom:1.5px dotted #B6BCC8;color:#B6BCC8;font-size:12px;display:flex;align-items:flex-end;font-variant-numeric:tabular-nums}
.sheet-row.tot{background:var(--bg);font-weight:800}
.sheet-foot{padding:10px 16px;font-size:12px;color:var(--muted);border-top:1px solid var(--line)}

/* comparação */
.cmp{display:grid;gap:14px}
@media (min-width:760px){.cmp{grid-template-columns:1fr 1fr}}
.cmp-col{border-radius:var(--radius-lg);padding:22px;display:grid;gap:14px;align-content:start}
.cmp-col h3{font-size:13px;letter-spacing:.14em;font-weight:800}
.cmp-col li{display:flex;gap:10px;align-items:flex-start;font-weight:500}
.cmp-col ul{display:grid;gap:10px}
.cmp-a{background:var(--white);border:1px dashed #B6BCC8;color:#3A4152}
.cmp-a h3{color:var(--muted)}
.cmp-a svg{color:#98A0AE;width:20px;height:20px;stroke-width:2.4}
.cmp-b{background:var(--white);border:2px solid var(--green);box-shadow:var(--shadow)}
.cmp-b h3{color:var(--green)}
.cmp-b svg{color:var(--green);width:20px;height:20px;stroke-width:2.6}
.cmp-foot{margin-top:18px;color:var(--muted);max-width:720px}

/* oferta */
.offer-sec{background:var(--fg);color:#fff;padding-block:56px}
.offer-grid{display:grid;gap:28px;align-items:center}
@media (min-width:900px){.offer-grid{grid-template-columns:1fr 440px;gap:56px}.offer-sec{padding-block:80px}}
.offer-copy{display:grid;gap:14px}
.offer-copy p{color:#C9CEDA;font-size:17px}
.offer-card{background:var(--white);color:var(--fg);border-radius:var(--radius-lg);padding:24px;display:grid;gap:16px;box-shadow:0 20px 40px rgba(0,0,0,.25)}
.offer-card ul{display:grid;gap:10px}
.offer-card li{display:flex;gap:10px;font-weight:600}
.offer-card li svg{color:var(--green);width:20px;height:20px;stroke-width:2.6}
.offer-card .fine{margin-top:-4px}
.pay-methods{font-size:13px;color:var(--muted);text-align:center}

/* faq */
.faq{display:grid;gap:10px;max-width:820px}
.faq details{background:var(--white);border:1px solid var(--line);border-radius:var(--radius)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:14px;align-items:center;padding:16px 18px;font-weight:700;font-size:16px;min-height:56px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"";width:12px;height:12px;flex:none;border-right:2.5px solid var(--fg);border-bottom:2.5px solid var(--fg);transform:rotate(45deg) translate(-2px,-2px);transition:transform .15s}
.faq details[open] summary::after{transform:rotate(-135deg) translate(-2px,-2px)}
.faq details[open]{border-color:var(--fg)}
.faq .ans{padding:0 18px 18px;color:#3A4152}

/* rodapé */
.site-footer{border-top:1px solid var(--line);background:var(--white);padding-block:36px}
.foot-grid{display:grid;gap:20px;font-size:14px;color:var(--muted)}
.foot-grid strong{color:var(--fg)}
.foot-links{display:flex;flex-wrap:wrap;gap:8px 18px}
.foot-links a,.foot-links span{font-weight:600}
.foot-links .off{color:#98A0AE;font-weight:500}
.disclaimer{font-size:13px;line-height:1.55;border-top:1px solid var(--line);padding-top:16px}

/* barra fixa mobile */
.sticky{position:fixed;left:0;right:0;bottom:0;z-index:40;background:var(--white);border-top:1px solid var(--line);box-shadow:0 -6px 18px rgba(21,25,35,.08);padding-top:10px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:flex;align-items:center;justify-content:space-between;gap:12px}
.sticky b{font-size:15px;font-weight:800;line-height:1.2}
.sticky span{display:block;font-size:12px;color:var(--muted);font-weight:500}
@media (min-width:768px){.sticky{display:none!important}body.has-sticky{padding-bottom:0}}

.toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:60;max-width:min(92vw,420px);background:var(--fg);color:#fff;font-size:14px;line-height:1.4;padding:12px 16px;border-radius:10px;box-shadow:0 10px 24px rgba(0,0,0,.25)}

/* obrigado */
.thanks{padding-block:40px 64px}
.thanks-card{max-width:640px;margin-inline:auto;background:var(--white);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--shadow);padding:28px 22px;display:grid;gap:18px}
.status{display:inline-flex;align-items:center;gap:8px;justify-self:start;padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700;border:1px solid var(--line);background:var(--bg);color:var(--muted)}
.status.ok{background:var(--green-soft);border-color:#BFE3D2;color:var(--green)}
.thanks-card ol{display:grid;gap:10px;counter-reset:t}
.thanks-card ol li{display:grid;grid-template-columns:28px 1fr;gap:10px;counter-increment:t}
.thanks-card ol li::before{content:counter(t);width:26px;height:26px;border-radius:50%;background:var(--fg);color:#fff;display:grid;place-items:center;font-size:13px;font-weight:800}
.support{background:var(--bg);border:1px solid var(--line);border-radius:var(--radius);padding:12px 14px;font-size:14px}
.support b{display:block}
`;
  document.head.appendChild(style);

  /* ---------- HTML ---------- */
  document.body.insertAdjacentHTML("beforeend", `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
    <symbol id="i-doc" viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"/></symbol>
    <symbol id="i-wallet" viewBox="0 0 24 24"><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l11-3.5V7M16 14h2"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><circle cx="12" cy="11" r="2.4"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4"/></symbol>
    <symbol id="i-list" viewBox="0 0 24 24"><path d="M10 6h10M10 12h10M10 18h10M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h10"/></symbol>
    <symbol id="i-sheet" viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v14"/></symbol>
    <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></symbol>
    <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4 4 3 3-2 4 3"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  </defs>
</svg>

<div id="devbar" class="devbar" hidden>
  <div class="wrap"><b>CONFIGURAÇÃO PENDENTE:</b> defina <code>checkoutUrl</code> no objeto <code>CONFIG</code> (início do script). Enquanto estiver vazio, os botões de compra não levam a nenhum checkout.</div>
</div>

<header class="site-header">
  <div class="wrap">
    <a class="logo" href="#" aria-label="Morar no Paraguai, guia prático"><strong>MORAR NO PARAGUAI</strong><span>GUIA PRÁTICO</span></a>
    <a class="btn btn-sm" href="#oferta" data-goto="oferta">Quero o guia</a>
  </div>
</header>

<main id="view-landing">

  <!-- 5. PRIMEIRA DOBRA -->
  <section class="hero" id="hero" aria-labelledby="h-hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <h1 id="h-hero">Pensando em morar no Paraguai? Descubra o que você precisa saber antes de se mudar.</h1>
        <p class="lead">Um guia prático para organizar seus próximos passos, entender os custos, conhecer as etapas da documentação e avaliar se a mudança faz sentido para você.</p>
        <ul class="benefits">
          <li><svg class="i"><use href="#i-check"/></svg>Entenda como organizar seu planejamento de mudança.</li>
          <li><svg class="i"><use href="#i-check"/></svg>Conheça as etapas e os documentos que precisam ser verificados.</li>
          <li><svg class="i"><use href="#i-check"/></svg>Compare cidades e avalie custos de moradia.</li>
          <li><svg class="i"><use href="#i-check"/></svg>Organize seu orçamento antes de assumir compromissos.</li>
          <li><svg class="i"><use href="#i-check"/></svg>Consulte fontes oficiais para conferir os requisitos atualizados.</li>
        </ul>
        <ul class="chips" aria-label="Características do produto">
          <li><svg class="i"><use href="#i-book"/></svg>Guia digital</li>
          <li><svg class="i"><use href="#i-list"/></svg>Checklist prático</li>
          <li><svg class="i"><use href="#i-clock"/></svg>Acesso após confirmação do pagamento</li>
        </ul>
        <div class="offer-box" id="oferta-hero">
          <span class="offer-label">ACESSO AO GUIA DIGITAL</span>
          <div class="price-row"><span class="price" data-price></span><span class="price-note">pagamento único</span></div>
          <a class="btn btn-block" href="#" data-checkout data-where="hero">QUERO ACESSAR O GUIA</a>
          <p class="fine">Produto digital • Entrega após confirmação do pagamento.</p>
        </div>
      </div>

      <div class="hero-art">
        <svg class="cover" viewBox="0 0 340 440" role="img" aria-label="Capa ilustrativa do guia Morar no Paraguai: guia prático de planejamento, documentação e custos">
          <defs>
            <clipPath id="cv"><rect x="14" y="10" width="268" height="404" rx="12"/></clipPath>
            <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#3A4358"/></pattern>
          </defs>
          <!-- páginas -->
          <rect x="22" y="16" width="268" height="404" rx="12" fill="#D9DDE5"/>
          <rect x="18" y="13" width="268" height="404" rx="12" fill="#fff" stroke="#E5E7EB"/>
          <!-- capa -->
          <rect x="14" y="10" width="268" height="404" rx="12" fill="#151923"/>
          <g clip-path="url(#cv)">
            <rect x="14" y="10" width="12" height="404" fill="#0E121A"/>
            <rect x="14" y="10" width="268" height="6" fill="#D92D36"/>
            <!-- mapa estilizado -->
            <rect x="40" y="226" width="130" height="118" fill="url(#dots)" opacity=".8"/>
            <polygon points="52,262 86,246 122,252 150,274 140,304 158,326 120,344 92,334 70,346 48,320 58,290" fill="#232A3B" stroke="#4A5570" stroke-width="1.5"/>
            <circle cx="104" cy="282" r="4" fill="#fff"/><circle cx="132" cy="296" r="4" fill="#D92D36"/><circle cx="92" cy="316" r="4" fill="#16845B"/>
            <path d="M104 282L132 296L92 316" fill="none" stroke="#6B7690" stroke-width="1" stroke-dasharray="3 3"/>
            <!-- skyline -->
            <g fill="#1F2635">
              <rect x="26" y="372" width="22" height="42"/><rect x="50" y="356" width="18" height="58"/><rect x="70" y="378" width="26" height="36"/>
              <rect x="98" y="362" width="20" height="52"/><rect x="120" y="380" width="24" height="34"/><rect x="146" y="352" width="22" height="62"/>
              <rect x="170" y="374" width="28" height="40"/><rect x="200" y="364" width="20" height="50"/><rect x="222" y="382" width="30" height="32"/><rect x="254" y="368" width="26" height="46"/>
            </g>
            <g fill="#3A4358">
              <rect x="54" y="362" width="3" height="3"/><rect x="60" y="362" width="3" height="3"/><rect x="54" y="372" width="3" height="3"/><rect x="60" y="382" width="3" height="3"/>
              <rect x="150" y="358" width="3" height="3"/><rect x="157" y="358" width="3" height="3"/><rect x="150" y="368" width="3" height="3"/><rect x="157" y="378" width="3" height="3"/>
              <rect x="102" y="368" width="3" height="3"/><rect x="109" y="378" width="3" height="3"/><rect x="204" y="370" width="3" height="3"/><rect x="211" y="380" width="3" height="3"/>
            </g>
            <!-- textos -->
            <text x="40" y="52" font-size="11" font-weight="700" letter-spacing="2.4" fill="#AAB1C0" font-family="Inter,system-ui,sans-serif">GUIA PRÁTICO</text>
            <text x="40" y="96" font-size="31" font-weight="800" fill="#fff" font-family="Inter,system-ui,sans-serif" letter-spacing="-.5">MORAR NO</text>
            <text x="40" y="132" font-size="31" font-weight="800" fill="#fff" font-family="Inter,system-ui,sans-serif" letter-spacing="-.5">PARAGUAI</text>
            <rect x="40" y="144" width="44" height="4" fill="#D92D36"/>
            <text x="40" y="172" font-size="12.5" fill="#C9CEDA" font-family="Inter,system-ui,sans-serif">Guia prático de planejamento,</text>
            <text x="40" y="190" font-size="12.5" fill="#C9CEDA" font-family="Inter,system-ui,sans-serif">documentação e custos</text>
          </g>
          <!-- documentos -->
          <g transform="rotate(-5 236 330)"><rect x="168" y="262" width="136" height="104" rx="8" fill="#E5E7EB"/></g>
          <g transform="rotate(4 236 330)">
            <rect x="170" y="268" width="136" height="104" rx="8" fill="#fff" stroke="#E5E7EB"/>
            <rect x="184" y="282" width="52" height="6" rx="3" fill="#151923"/>
            <g fill="none" stroke="#16845B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="184" y="300" width="11" height="11" rx="2"/><path d="M186.5 305.5l2.5 2.5 4-5"/>
              <rect x="184" y="320" width="11" height="11" rx="2"/><path d="M186.5 325.5l2.5 2.5 4-5"/>
            </g>
            <rect x="184" y="344" width="11" height="11" rx="2" fill="none" stroke="#B6BCC8" stroke-width="2"/>
            <rect x="203" y="303" width="82" height="5" rx="2.5" fill="#D9DDE5"/>
            <rect x="203" y="323" width="64" height="5" rx="2.5" fill="#D9DDE5"/>
            <rect x="203" y="347" width="74" height="5" rx="2.5" fill="#D9DDE5"/>
          </g>
        </svg>
        <p class="caption">Capa ilustrativa do guia digital.</p>
      </div>
    </div>
  </section>

  <!-- 6. IDENTIFICAÇÃO -->
  <section class="section band-white" aria-labelledby="h-ident">
    <div class="wrap">
      <div class="section-head">
        <h2 id="h-ident">Antes de fazer as malas, você precisa entender o que essa mudança exige.</h2>
        <p>Mudar de país envolve muito mais do que escolher um destino. É preciso organizar documentos, calcular despesas, pesquisar moradia e entender as regras que se aplicam à sua situação.</p>
      </div>
      <div class="cards-5">
        <article class="card"><div class="ico"><svg class="i"><use href="#i-doc"/></svg></div><h3>Documentação</h3><p>Saiba quais documentos e procedimentos precisam ser verificados antes de iniciar seu processo.</p></article>
        <article class="card"><div class="ico"><svg class="i"><use href="#i-wallet"/></svg></div><h3>Planejamento financeiro</h3><p>Organize os gastos iniciais e as despesas mensais que devem entrar na sua conta.</p></article>
        <article class="card"><div class="ico"><svg class="i"><use href="#i-pin"/></svg></div><h3>Escolha da cidade</h3><p>Compare fatores como moradia, infraestrutura, serviços e estilo de vida.</p></article>
        <article class="card"><div class="ico"><svg class="i"><use href="#i-shield"/></svg></div><h3>Residência e obrigações</h3><p>Entenda as etapas gerais e saiba onde consultar os requisitos oficiais.</p></article>
        <article class="card"><div class="ico"><svg class="i"><use href="#i-list"/></svg></div><h3>Organização da mudança</h3><p>Transforme suas dúvidas em uma sequência de tarefas para executar.</p></article>
      </div>
    </div>
  </section>

  <!-- 7. RESPONSÁVEL -->
  <section class="section" aria-labelledby="h-expert">
    <div class="wrap expert-grid">
      <div class="expert-copy">
        <h2 id="h-expert">Informação organizada para você tomar uma decisão melhor.</h2>
        <div class="expert-who">
          <div class="avatar" id="expert-photo" aria-hidden="true"><svg class="i"><use href="#i-user"/></svg></div>
          <div><b data-responsible></b><small>Responsável pelo guia</small></div>
        </div>
        <p>Este guia reúne informações e referências úteis para brasileiros que estão avaliando a possibilidade de morar no Paraguai. A proposta é organizar os principais assuntos em um material prático, para que você saiba o que pesquisar, quais etapas considerar e onde conferir as informações importantes.</p>
        <p class="todo" id="expert-todo">Espaço reservado: foto real do responsável e breve descrição da experiência efetivamente comprovada. Preencher apenas com informações verdadeiras.</p>
      </div>
      <div class="video-box" id="video-box">
        <div class="video-ph" id="video-ph">
          <div class="play"><svg class="i" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg></div>
          <b>Apresentação do guia</b>
          <small>Vídeo a ser inserido</small>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. O QUE VOCÊ VAI RECEBER -->
  <section class="section band-white" aria-labelledby="h-recv">
    <div class="wrap">
      <div class="section-head"><h2 id="h-recv">Tudo organizado para você sair da pesquisa solta e partir para o planejamento.</h2></div>
      <div class="recv-grid">
        <article class="card" data-deliverable="guide">
          <div class="ico"><svg class="i"><use href="#i-book"/></svg></div>
          <span class="tag-pending">Em preparação</span>
          <h3>Guia prático de mudança</h3>
          <p>Conteúdo organizado para entender os principais aspectos envolvidos no planejamento de uma mudança para o Paraguai.</p>
          <ul>
            <li><svg class="i"><use href="#i-check"/></svg>Visão geral do processo</li>
            <li><svg class="i"><use href="#i-check"/></svg>Planejamento inicial</li>
            <li><svg class="i"><use href="#i-check"/></svg>Documentação</li>
            <li><svg class="i"><use href="#i-check"/></svg>Moradia e cidades</li>
            <li><svg class="i"><use href="#i-check"/></svg>Custos e organização financeira</li>
            <li><svg class="i"><use href="#i-check"/></svg>Trabalho e atividades profissionais</li>
            <li><svg class="i"><use href="#i-check"/></svg>Cuidados fiscais</li>
            <li><svg class="i"><use href="#i-check"/></svg>Próximos passos</li>
          </ul>
        </article>
        <article class="card" data-deliverable="checklist">
          <div class="ico g"><svg class="i"><use href="#i-list"/></svg></div>
          <span class="tag-pending">Em preparação</span>
          <h3>Checklist de preparação</h3>
          <p>Uma lista organizada de documentos, pesquisas e providências para acompanhar seu planejamento.</p>
        </article>
        <article class="card" data-deliverable="spreadsheet">
          <div class="ico g"><svg class="i"><use href="#i-sheet"/></svg></div>
          <span class="tag-pending">Em preparação</span>
          <h3>Planilha de custos iniciais</h3>
          <p>Uma ferramenta editável para estimar viagem, moradia, alimentação, transporte, despesas documentais e reserva financeira.</p>
        </article>
        <article class="card" data-deliverable="sources">
          <div class="ico g"><svg class="i"><use href="#i-link"/></svg></div>
          <span class="tag-pending">Em preparação</span>
          <h3>Lista de consultas importantes</h3>
          <p>Referências para consultar requisitos migratórios, informações tributárias e outros dados relevantes diretamente nas fontes responsáveis.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- 9. PRÉVIA -->
  <section class="section" aria-labelledby="h-prev">
    <div class="wrap">
      <div class="section-head"><h2 id="h-prev">Veja como o material está organizado.</h2></div>
      <div class="prev-grid" id="prev-grid"></div>
    </div>
  </section>

  <!-- 10. CIDADES -->
  <section class="section band-white" aria-labelledby="h-city">
    <div class="wrap">
      <div class="section-head">
        <h2 id="h-city">Qual cidade faz mais sentido para você?</h2>
        <p>Uma comparação informativa para começar a pesquisa. A escolha depende do seu orçamento, do trabalho, da infraestrutura desejada e das suas necessidades.</p>
      </div>
      <div class="city-grid">
        <article class="card city">
          <div class="city-art">
            <span class="badge-ill">ILUSTRAÇÃO</span>
            <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade com prédios e um rio"><rect width="320" height="140" fill="#EEF0F4"/><g fill="#C9CEDA"><rect x="20" y="70" width="26" height="60"/><rect x="50" y="48" width="22" height="82"/><rect x="76" y="64" width="30" height="66"/><rect x="110" y="34" width="24" height="96"/><rect x="138" y="58" width="28" height="72"/><rect x="170" y="78" width="26" height="52"/><rect x="200" y="52" width="22" height="78"/><rect x="226" y="70" width="30" height="60"/><rect x="260" y="88" width="30" height="42"/></g><rect y="116" width="320" height="24" fill="#151923"/><path d="M0 128c30-6 50 6 80 0s50-6 80 0 50 6 80 0 50-6 80 0" fill="none" stroke="#697386" stroke-width="2"/></svg>
          </div>
          <div class="city-body">
            <h3>Assunção</h3>
            <p>Capital do país e maior centro urbano, às margens do rio Paraguai.</p>
            <h4>CARACTERÍSTICAS</h4>
            <ul><li>Sede de órgãos públicos e de grande parte dos serviços</li><li>Mais opções de bairros, moradia e serviços</li></ul>
            <h4>AVALIE ANTES DE ESCOLHER</h4>
            <ul><li>Bairro e proximidade de serviços</li><li>Tipo de moradia e custo de entrada</li><li>Deslocamentos do dia a dia</li></ul>
            <p class="city-cost" data-city-cost="assuncao" hidden></p>
          </div>
        </article>
        <article class="card city">
          <div class="city-art">
            <span class="badge-ill">ILUSTRAÇÃO</span>
            <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade de fronteira com uma ponte"><rect width="320" height="140" fill="#EEF0F4"/><g fill="#C9CEDA"><rect x="16" y="82" width="36" height="48"/><rect x="56" y="66" width="30" height="64"/><rect x="90" y="88" width="34" height="42"/><rect x="236" y="74" width="32" height="56"/><rect x="272" y="90" width="32" height="40"/></g><path d="M118 112V70c0-14 10-22 42-22s42 8 42 22v42" fill="none" stroke="#151923" stroke-width="3"/><path d="M118 112h84" stroke="#151923" stroke-width="3"/><g stroke="#697386" stroke-width="1.5"><path d="M134 112V62M148 112V54M162 112V50M176 112V54M190 112V62"/></g><rect y="116" width="320" height="24" fill="#151923"/><path d="M0 128c30-6 50 6 80 0s50-6 80 0 50 6 80 0 50-6 80 0" fill="none" stroke="#697386" stroke-width="2"/></svg>
          </div>
          <div class="city-body">
            <h3>Ciudad del Este</h3>
            <p>Cidade na fronteira com o Brasil, ligada a Foz do Iguaçu pela Ponte da Amizade.</p>
            <h4>CARACTERÍSTICAS</h4>
            <ul><li>Forte atividade comercial</li><li>Proximidade com a fronteira brasileira</li></ul>
            <h4>AVALIE ANTES DE ESCOLHER</h4>
            <ul><li>Tipo de trabalho ou atividade pretendida</li><li>Rotina de travessia da fronteira, se houver</li><li>Moradia, serviços e estilo de vida</li></ul>
            <p class="city-cost" data-city-cost="cde" hidden></p>
          </div>
        </article>
        <article class="card city">
          <div class="city-art">
            <span class="badge-ill">ILUSTRAÇÃO</span>
            <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade de pequeno porte à beira de um rio"><rect width="320" height="140" fill="#EEF0F4"/><g fill="#C9CEDA"><rect x="24" y="86" width="30" height="44"/><rect x="58" y="96" width="26" height="34"/><rect x="88" y="78" width="28" height="52"/><rect x="120" y="92" width="30" height="38"/><rect x="154" y="84" width="24" height="46"/><rect x="182" y="98" width="32" height="32"/><rect x="218" y="80" width="26" height="50"/><rect x="248" y="94" width="34" height="36"/></g><rect y="110" width="320" height="30" fill="#151923"/><g fill="none" stroke="#697386" stroke-width="2"><path d="M0 120c26-6 40 6 66 0s40-6 66 0 40 6 66 0 40-6 66 0 40 6 56 0"/><path d="M0 132c26-6 40 6 66 0s40-6 66 0 40 6 66 0 40-6 66 0 40 6 56 0"/></g></svg>
          </div>
          <div class="city-body">
            <h3>Encarnación</h3>
            <p>Cidade às margens do rio Paraná, em frente à cidade argentina de Posadas.</p>
            <h4>CARACTERÍSTICAS</h4>
            <ul><li>Cidade de porte menor que a capital</li><li>Orla e áreas à beira do rio</li></ul>
            <h4>AVALIE ANTES DE ESCOLHER</h4>
            <ul><li>Disponibilidade de serviços de que você precisa</li><li>Mercado de moradia e de trabalho local</li><li>Distância até outras cidades</li></ul>
            <p class="city-cost" data-city-cost="encarnacion" hidden></p>
          </div>
        </article>
      </div>
      <p class="city-note">Nenhuma cidade é a melhor para todos. O guia ajuda a comparar os fatores que pesam na sua decisão.</p>
    </div>
  </section>

  <!-- 11. DOCUMENTAÇÃO -->
  <section class="section" aria-labelledby="h-docs">
    <div class="wrap docs-grid">
      <div>
        <div class="section-head" style="margin-bottom:20px">
          <h2 id="h-docs">Entenda as etapas antes de começar a reunir seus documentos.</h2>
          <p>A regularização exige consulta aos requisitos aplicáveis ao perfil de cada pessoa e à modalidade de residência pretendida.</p>
        </div>
        <div class="notice"><svg class="i"><use href="#i-info"/></svg><span>Os requisitos podem mudar e variam conforme a situação individual. Consulte sempre as fontes oficiais antes de iniciar o processo.</span></div>
      </div>
      <div>
        <ol class="steps">
          <li>Identificar a modalidade de residência aplicável.</li>
          <li>Consultar a lista oficial e atualizada de documentos.</li>
          <li>Verificar exigências de certidões, apostilamento, tradução e validade, quando aplicáveis.</li>
          <li>Conferir taxas, agendamentos, procedimentos e prazos junto às autoridades responsáveis.</li>
        </ol>
        <div class="links" id="official-links" aria-label="Fontes oficiais para consulta"></div>
      </div>
    </div>
  </section>

  <!-- 12. PLANEJAMENTO FINANCEIRO -->
  <section class="section band-white" aria-labelledby="h-fin">
    <div class="wrap fin-grid">
      <div class="fin-copy">
        <h2 id="h-fin">Quanto dinheiro você precisa reservar para começar?</h2>
        <p>O valor depende da cidade, da moradia, do estilo de vida, dos documentos necessários e da sua fonte de renda. Em vez de confiar em um número genérico, organize sua própria estimativa.</p>
        <div><a class="btn" href="#oferta" data-goto="oferta">Quero organizar meus custos</a></div>
      </div>
      <div class="sheet" role="group" aria-label="Prévia ilustrativa da planilha de custos, sem valores">
        <div class="sheet-top"><span>Planilha de custos iniciais</span><small>Prévia ilustrativa</small></div>
        <div class="sheet-row h"><span>CATEGORIA</span><span>ESTIMATIVA</span></div>
        <div class="sheet-row"><span>Transporte até o destino</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Hospedagem inicial</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Aluguel</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Caução e custos de entrada no imóvel</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Alimentação</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Transporte local</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Documentação</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Comunicação e internet</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Saúde e imprevistos</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row"><span>Reserva financeira</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-row tot"><span>Total estimado</span><span class="blank" aria-hidden="true">R$</span></div>
        <div class="sheet-foot">Campos em branco: você preenche com os seus próprios dados.</div>
      </div>
    </div>
  </section>

  <!-- 13. DIFERENCIAÇÃO -->
  <section class="section" aria-labelledby="h-diff">
    <div class="wrap">
      <div class="section-head"><h2 id="h-diff">Por que usar um guia em vez de começar do zero?</h2></div>
      <div class="cmp">
        <div class="cmp-col cmp-a">
          <h3>PESQUISA DISPERSA</h3>
          <ul>
            <li><svg class="i"><use href="#i-x"/></svg>Informações em diferentes sites.</li>
            <li><svg class="i"><use href="#i-x"/></svg>Dificuldade para organizar as etapas.</li>
            <li><svg class="i"><use href="#i-x"/></svg>Risco de usar referências desatualizadas.</li>
            <li><svg class="i"><use href="#i-x"/></svg>Falta de uma lista centralizada para acompanhar o planejamento.</li>
          </ul>
        </div>
        <div class="cmp-col cmp-b">
          <h3>GUIA ORGANIZADO</h3>
          <ul>
            <li><svg class="i"><use href="#i-check"/></svg>Conteúdo separado por assunto.</li>
            <li><svg class="i"><use href="#i-check"/></svg>Checklist para acompanhar tarefas.</li>
            <li><svg class="i"><use href="#i-check"/></svg>Planilha para organizar custos.</li>
            <li><svg class="i"><use href="#i-check"/></svg>Links para consultar informações oficiais.</li>
          </ul>
        </div>
      </div>
      <p class="cmp-foot">Há muita informação útil disponível de graça. O valor do guia está na organização, na praticidade e na economia de tempo.</p>
    </div>
  </section>

  <!-- 14. OFERTA -->
  <section class="offer-sec" id="oferta" aria-labelledby="h-offer">
    <div class="wrap offer-grid">
      <div class="offer-copy">
        <h2 id="h-offer">Comece seu planejamento com mais clareza.</h2>
        <p>Tenha em um só lugar o guia, o checklist, a planilha de custos e as referências para continuar sua pesquisa.</p>
      </div>
      <div class="offer-card">
        <ul>
          <li data-deliverable="guide"><svg class="i"><use href="#i-check"/></svg>Guia digital</li>
          <li data-deliverable="checklist"><svg class="i"><use href="#i-check"/></svg>Checklist de preparação</li>
          <li data-deliverable="spreadsheet"><svg class="i"><use href="#i-check"/></svg>Planilha editável</li>
          <li data-deliverable="sources"><svg class="i"><use href="#i-check"/></svg>Lista de fontes oficiais</li>
        </ul>
        <div class="price-row"><span class="price" data-price></span><span class="price-note">pagamento único</span></div>
        <a class="btn btn-block" href="#" data-checkout data-where="offer" data-tpl="QUERO MEU GUIA POR {price}"></a>
        <p class="fine">Produto digital. Acesso após confirmação do pagamento.</p>
        <p class="pay-methods" id="pay-methods" hidden></p>
      </div>
    </div>
  </section>

  <!-- 15. FAQ -->
  <section class="section" aria-labelledby="h-faq">
    <div class="wrap">
      <div class="section-head"><h2 id="h-faq">Perguntas frequentes</h2></div>
      <div class="faq">
        <details><summary>O guia é físico ou digital?</summary><div class="ans">É um produto digital, disponibilizado após a confirmação do pagamento.</div></details>
        <details><summary>Preciso já ter decidido me mudar?</summary><div class="ans">Não. O material também pode ajudar quem ainda está avaliando se a mudança faz sentido.</div></details>
        <details><summary>O guia garante que vou conseguir residência?</summary><div class="ans">Não. O guia é um material informativo de planejamento. A concessão depende dos requisitos aplicáveis e da análise das autoridades competentes.</div></details>
        <details><summary>As informações podem mudar?</summary><div class="ans">Sim. Requisitos, taxas e procedimentos podem mudar. O material deve informar sua data de revisão e indicar as fontes oficiais para conferência.</div></details>
        <details><summary>Posso trabalhar no Paraguai?</summary><div class="ans">As possibilidades dependem da atividade, da situação migratória, das autorizações aplicáveis e de outros requisitos. O guia ajuda a identificar os pontos que precisam ser verificados.</div></details>
        <details><summary>O material resolve minha situação tributária no Brasil?</summary><div class="ans">Não substitui orientação individual. A residência fiscal e as obrigações tributárias dependem das circunstâncias de cada pessoa e devem ser verificadas com as fontes competentes ou um profissional qualificado.</div></details>
        <details><summary>Como recebo o produto?</summary><div class="ans">Após a confirmação do pagamento, o acesso é disponibilizado pelo fluxo de entrega configurado na compra.</div></details>
        <details><summary>Existe política de reembolso?</summary><div class="ans">Consulte a política de compra e os direitos legais aplicáveis ao consumidor, incluindo o direito de arrependimento previsto na legislação brasileira.</div></details>
      </div>
    </div>
  </section>

  <!-- 20. RODAPÉ -->
  <footer class="site-footer">
    <div class="wrap foot-grid">
      <div>
        <strong>MORAR NO PARAGUAI</strong> · Guia digital (produto digital, sem envio físico)<br>
        Responsável pela oferta: <span data-offer-owner></span><br>
        Suporte: <span data-support></span>
      </div>
      <nav class="foot-links" id="legal-links" aria-label="Documentos legais"></nav>
      <p class="disclaimer">Este material tem finalidade informativa e educacional. Não constitui garantia de residência, emprego, renda ou economia tributária. Confirme requisitos e obrigações diretamente nas fontes competentes.</p>
    </div>
  </footer>
</main>

<!-- 19. PÁGINA DE CONFIRMAÇÃO (#obrigado) -->
<main id="view-thanks" class="thanks" hidden>
  <div class="wrap">
    <div class="thanks-card">
      <div id="state-pending">
        <span class="status"><svg class="i" style="width:16px;height:16px"><use href="#i-clock"/></svg>Aguardando confirmação do pagamento</span>
        <h1 style="font-size:clamp(24px,5vw,32px);margin-top:14px">Estamos aguardando a confirmação do seu pagamento.</h1>
        <p style="margin-top:10px;color:#3A4152">Esta página não confirma, por si só, que o pagamento foi aprovado. O acesso ao guia é liberado somente depois que a plataforma de pagamento confirmar a compra.</p>
      </div>
      <div id="state-ok" hidden>
        <span class="status ok"><svg class="i" style="width:16px;height:16px"><use href="#i-check"/></svg>Pagamento confirmado</span>
        <h1 style="font-size:clamp(24px,5vw,32px);margin-top:14px">Pagamento confirmado. Seu acesso está liberado.</h1>
      </div>
      <ol>
        <li>Confira a caixa de entrada do e-mail usado na compra, inclusive as pastas de spam e promoções.</li>
        <li>Siga as instruções da mensagem de entrega para acessar o guia e os materiais.</li>
        <li>Se o acesso não chegar, fale com o suporte.</li>
      </ol>
      <div class="support"><b>Suporte</b><span data-support></span></div>
      <a class="btn btn-ghost" href="#" style="justify-self:start">Voltar à página inicial</a>
    </div>
  </div>
</main>

<div class="sticky" id="sticky" hidden>
  <div><b data-tpl="Guia digital — {price}"></b><span>Pagamento único</span></div>
  <a class="btn btn-sm" href="#" data-checkout data-where="sticky">Acessar guia</a>
</div>

<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>

<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
  <div class="modal-box">
    <div class="modal-top"><b id="modal-title"></b><button class="x-btn" id="modal-close" type="button" aria-label="Fechar"><svg class="i"><use href="#i-x"/></svg></button></div>
    <div class="modal-body" id="modal-body"></div>
  </div>
</div>
`);

  /* ---------- Lógica ---------- */
/* ============================================================
   CONFIGURAÇÃO CENTRAL: edite apenas este objeto para trocar
   preço, checkout, textos de suporte, imagens e integrações.
   ============================================================ */
const CONFIG = {
  productName: "Guia Morar no Paraguai",
  price: 19.90,                 // único lugar onde o preço é definido
  currency: "BRL",
  checkoutUrl: "",              // PENDENTE: URL do checkout externo. Todos os botões de compra usam este valor.
  successUrl: "",               // PENDENTE: configure no checkout o retorno para esta página + #obrigado
  paymentMethods: [],           // ex.: ["Pix", "Cartão"]. Exibido somente se preenchido.
  supportContact: "",           // PENDENTE: canal de suporte (e-mail, WhatsApp etc.)
  responsibleName: "[NOME DO RESPONSÁVEL]",
  offerOwner: "[NOME OU IDENTIFICAÇÃO DO RESPONSÁVEL PELA OFERTA]",

  // Entregáveis: só marque true quando o item existir e estiver incluído no produto.
  deliverables: { guide: true, checklist: true, spreadsheet: true, sources: true },

  // Vídeo de apresentação (carregamento sob demanda, sem autoplay). Deixe src vazio para o espaço reservado.
  expertVideo: { src: "", poster: "" },

  // Prévias reais do material. Substitua src por imagens reais das páginas (WebP/AVIF) quando prontas.
  previews: [
    { title: "Página de checklist",                 desc: "Documentos, pesquisas e providências", src: "", alt: "" },
    { title: "Página de planejamento financeiro",   desc: "Custos iniciais e reserva",             src: "", alt: "" },
    { title: "Página de documentação e fontes",     desc: "Etapas e consultas oficiais",           src: "", alt: "" }
  ],

  // Custos por cidade: preencha SOMENTE com dado confiável e datado. Ex.: { text:"...", date:"mm/aaaa", source:"..." }
  cityCosts: { assuncao: null, cde: null, encarnacion: null },

  // Links oficiais (CONFIRMAR cada endereço antes de publicar).
  officialLinks: [
    { label: "Dirección Nacional de Migraciones (Paraguai)", note: "Requisitos migratórios e residência", url: "https://www.migraciones.gov.py" },
    { label: "Subsecretaría de Estado de Tributación (SET)", note: "Informações tributárias do Paraguai",  url: "https://www.set.gov.py" },
    { label: "Receita Federal (Brasil)",                     note: "Obrigações fiscais no Brasil",          url: "https://www.gov.br/receitafederal" }
  ],

  // Páginas legais (PENDENTE: informe as URLs reais).
  legal: { privacy: "", terms: "", refund: "" },

  // Rastreamento. Pixel ID vazio = nenhum script de terceiros é carregado.
  tracking: { pixelId: "", requireConsent: false, consentGranted: true }
};

/* ============================================================
   Utilitários
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: CONFIG.currency }).format(CONFIG.price).replace(/ /g, " ");

function bindText() {
  $$("[data-price]").forEach(el => el.textContent = money);
  $$("[data-tpl]").forEach(el => el.textContent = el.dataset.tpl.replace("{price}", money));
  $$("[data-responsible]").forEach(el => el.textContent = CONFIG.responsibleName);
  $$("[data-offer-owner]").forEach(el => el.textContent = CONFIG.offerOwner);
  $$("[data-support]").forEach(el => el.textContent = CONFIG.supportContact || "[CANAL DE SUPORTE]");
  if (CONFIG.paymentMethods.length) {
    const p = $("#pay-methods"); p.textContent = "Formas de pagamento: " + CONFIG.paymentMethods.join(", "); p.hidden = false;
  }
  $$("[data-deliverable]").forEach(el => {
    if (CONFIG.deliverables[el.dataset.deliverable]) return;
    if (el.tagName === "LI") el.hidden = true; else el.classList.add("is-pending");
  });
}

function buildLinks() {
  const box = $("#official-links");
  CONFIG.officialLinks.forEach(l => {
    const a = document.createElement("a");
    a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.innerHTML = '<svg class="i"><use href="#i-link"/></svg><span></span>';
    const s = $("span", a); s.textContent = l.label;
    const sm = document.createElement("small"); sm.textContent = l.note; s.appendChild(sm);
    box.appendChild(a);
  });
  const nav = $("#legal-links");
  [["privacy", "Política de privacidade"], ["terms", "Termos de uso"], ["refund", "Política de reembolso"]].forEach(([k, label]) => {
    const url = CONFIG.legal[k];
    const el = document.createElement(url ? "a" : "span");
    el.textContent = label;
    if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer"; }
    else { el.className = "off"; el.title = "Link a configurar"; el.textContent = label + " (a configurar)"; }
    nav.appendChild(el);
  });
  const costs = { assuncao: CONFIG.cityCosts.assuncao, cde: CONFIG.cityCosts.cde, encarnacion: CONFIG.cityCosts.encarnacion };
  Object.entries(costs).forEach(([k, v]) => {
    const el = $(`[data-city-cost="${k}"]`);
    if (v && v.text && v.date && v.source) { el.textContent = `${v.text} (fonte: ${v.source}, ${v.date})`; el.hidden = false; }
  });
}

/* Vídeo: sem autoplay, controles nativos, carrega só ao tocar. */
function buildVideo() {
  const { src, poster } = CONFIG.expertVideo;
  if (!src) return;
  const box = $("#video-box"), ph = $("#video-ph");
  if (poster) { ph.style.cssText += `;background:url(${poster}) center/cover`; }
  ph.style.cursor = "pointer"; ph.setAttribute("role", "button"); ph.tabIndex = 0;
  const load = () => {
    const v = document.createElement("video");
    v.controls = true; v.preload = "metadata"; v.playsInline = true; v.src = src; if (poster) v.poster = poster;
    box.replaceChildren(v); v.play().catch(() => {});
  };
  ph.addEventListener("click", load);
  ph.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); load(); } });
}

/* Prévias + modal */
function buildPreviews() {
  const grid = $("#prev-grid");
  CONFIG.previews.forEach((p, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "prev-btn"; b.dataset.i = i;
    b.setAttribute("aria-label", "Ampliar: " + p.title);
    b.innerHTML = '<div class="prev-frame"></div><span class="t"></span><span class="z"></span>';
    $(".t", b).textContent = p.title; $(".z", b).textContent = p.desc;
    $(".prev-frame", b).appendChild(previewNode(p, true));
    grid.appendChild(b);
  });
  grid.addEventListener("click", e => { const b = e.target.closest(".prev-btn"); if (b) openModal(+b.dataset.i, b); });
}
function previewNode(p, lazy) {
  if (p.src) {
    const img = new Image(); img.src = p.src; img.alt = p.alt || p.title; img.width = 600; img.height = 800;
    if (lazy) img.loading = "lazy"; return img;
  }
  const d = document.createElement("div"); d.className = "prev-ph";
  d.innerHTML = '<svg class="i"><use href="#i-image"/></svg><b>SUBSTITUIR IMAGEM</b><span>Prévia real do guia a ser inserida</span>';
  return d;
}
let lastFocus = null;
function openModal(i, opener) {
  const p = CONFIG.previews[i]; lastFocus = opener;
  $("#modal-title").textContent = p.title;
  const body = $("#modal-body"); body.replaceChildren();
  if (p.src) { body.appendChild(previewNode(p, false)); }
  else { const f = document.createElement("div"); f.className = "prev-frame"; f.appendChild(previewNode(p, false)); body.appendChild(f); }
  $("#modal").hidden = false; $("#modal-close").focus();
}
function closeModal() { $("#modal").hidden = true; if (lastFocus) lastFocus.focus(); }
$("#modal-close").addEventListener("click", closeModal);
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

/* ============================================================
   Rastreamento (Meta Pixel). Purchase NUNCA é disparado aqui.
   Purchase deve vir de confirmação real de pagamento (webhook da
   plataforma → Conversions API no servidor), deduplicado por event_id.
   ============================================================ */
const Tracking = {
  ids: {},
  newId() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(16).slice(2); },
  allowed() { const t = CONFIG.tracking; return !!t.pixelId && (!t.requireConsent || t.consentGranted); },
  init() {
    if (!this.allowed()) return;
    if (!window.fbq) {
      // Snippet padrão do Pixel. Em páginas com CSP restritiva o carregamento pode ser bloqueado.
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    }
    fbq("init", CONFIG.tracking.pixelId);
  },
  send(name, params) {
    const id = this.newId(); this.ids[name] = id;   // mesmo event_id deve ir ao servidor (CAPI) para deduplicação
    if (this.allowed() && typeof window.fbq === "function") fbq("track", name, params || {}, { eventID: id });
    return id;
  }
};

/* ============================================================
   Checkout: todos os botões usam o mesmo CONFIG.checkoutUrl
   ============================================================ */
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 5000);
}
function wireCheckout() {
  const ready = !!CONFIG.checkoutUrl;
  $("#devbar").hidden = ready;
  $$("[data-checkout]").forEach(a => {
    if (ready) { a.href = CONFIG.checkoutUrl; a.target = "_blank"; a.rel = "noopener noreferrer"; }
  });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-checkout]"); if (!a) return;
    if (!ready) {
      e.preventDefault();
      toast("Checkout ainda não configurado. Defina checkoutUrl em CONFIG.");
      return;
    }
    // InitiateCheckout só dispara quando o clique de fato leva a um checkout configurado.
    Tracking.send("InitiateCheckout", { content_name: CONFIG.productName, value: CONFIG.price, currency: CONFIG.currency });
  });
}
document.addEventListener("click", e => {
  const g = e.target.closest("[data-goto]"); if (!g) return;
  e.preventDefault(); const t = document.getElementById(g.dataset.goto); if (t) t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
});

/* ============================================================
   Barra fixa (mobile) e eventos de visualização
   ============================================================ */
const state = { heroVisible: true, offerVisible: false, thanks: false };
function updateSticky() {
  const on = !state.thanks && !state.heroVisible && !state.offerVisible;
  const bar = $("#sticky"); bar.hidden = !on;
  document.body.classList.toggle("has-sticky", on);
}
function observe() {
  if (!("IntersectionObserver" in window)) { state.heroVisible = false; updateSticky(); return; }
  new IntersectionObserver(es => { state.heroVisible = es[0].isIntersecting; updateSticky(); }).observe($("#hero"));
  let viewed = false;
  new IntersectionObserver(es => {
    state.offerVisible = es[0].isIntersecting; updateSticky();
    if (es[0].isIntersecting && !viewed && !state.thanks) { viewed = true; Tracking.send("ViewContent", { content_name: CONFIG.productName, value: CONFIG.price, currency: CONFIG.currency }); }
  }, { threshold: 0.25 }).observe($("#oferta"));
}

/* ============================================================
   Rota: página inicial e #obrigado
   ============================================================ */
/* Confirmação de pagamento: este estado só pode ser 'ok' com verificação real vinda do servidor/plataforma.
   Sem integração, a página permanece em 'pendente'. Nada é inferido da URL. */
function paymentState() { return "pending"; }
function route() {
  const t = location.hash === "#obrigado";
  const changed = state.thanks !== t; state.thanks = t;
  $("#view-landing").hidden = t; $("#view-thanks").hidden = !t;
  const ok = paymentState() === "ok"; $("#state-ok").hidden = !ok; $("#state-pending").hidden = ok;
  updateSticky();
  if (changed) window.scrollTo(0, 0);
}
addEventListener("hashchange", route);

/* Início */
bindText(); buildLinks(); buildVideo(); buildPreviews(); wireCheckout();
Tracking.init(); Tracking.send("PageView");
route(); observe();

})();
