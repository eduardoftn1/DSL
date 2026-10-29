/* Ilustrações simples das cidades (identificadas como ilustração na interface). */
const WAVES = "M0 128c30-6 50 6 80 0s50-6 80 0 50 6 80 0 50-6 80 0";

function Capital() {
  return (
    <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade com prédios e um rio">
      <rect width="320" height="140" fill="#1B2638" />
      <g fill="#35445C">
        <rect x="20" y="70" width="26" height="60" />
        <rect x="50" y="48" width="22" height="82" />
        <rect x="76" y="64" width="30" height="66" />
        <rect x="110" y="34" width="24" height="96" />
        <rect x="138" y="58" width="28" height="72" />
        <rect x="170" y="78" width="26" height="52" />
        <rect x="200" y="52" width="22" height="78" />
        <rect x="226" y="70" width="30" height="60" />
        <rect x="260" y="88" width="30" height="42" />
      </g>
      <rect y="116" width="320" height="24" fill="#151923" />
      <path d={WAVES} fill="none" stroke="#697386" strokeWidth="2" />
    </svg>
  );
}

function Border() {
  return (
    <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade de fronteira com uma ponte">
      <rect width="320" height="140" fill="#1B2638" />
      <g fill="#35445C">
        <rect x="16" y="82" width="36" height="48" />
        <rect x="56" y="66" width="30" height="64" />
        <rect x="90" y="88" width="34" height="42" />
        <rect x="236" y="74" width="32" height="56" />
        <rect x="272" y="90" width="32" height="40" />
      </g>
      <path d="M118 112V70c0-14 10-22 42-22s42 8 42 22v42" fill="none" stroke="#151923" strokeWidth="3" />
      <path d="M118 112h84" stroke="#151923" strokeWidth="3" />
      <g stroke="#697386" strokeWidth="1.5">
        <path d="M134 112V62M148 112V54M162 112V50M176 112V54M190 112V62" />
      </g>
      <rect y="116" width="320" height="24" fill="#151923" />
      <path d={WAVES} fill="none" stroke="#697386" strokeWidth="2" />
    </svg>
  );
}

function Riverside() {
  return (
    <svg viewBox="0 0 320 140" role="img" aria-label="Ilustração de uma cidade de pequeno porte à beira de um rio">
      <rect width="320" height="140" fill="#1B2638" />
      <g fill="#35445C">
        <rect x="24" y="86" width="30" height="44" />
        <rect x="58" y="96" width="26" height="34" />
        <rect x="88" y="78" width="28" height="52" />
        <rect x="120" y="92" width="30" height="38" />
        <rect x="154" y="84" width="24" height="46" />
        <rect x="182" y="98" width="32" height="32" />
        <rect x="218" y="80" width="26" height="50" />
        <rect x="248" y="94" width="34" height="36" />
      </g>
      <rect y="110" width="320" height="30" fill="#151923" />
      <g fill="none" stroke="#697386" strokeWidth="2">
        <path d="M0 120c26-6 40 6 66 0s40-6 66 0 40 6 66 0 40-6 66 0 40 6 56 0" />
        <path d="M0 132c26-6 40 6 66 0s40-6 66 0 40 6 66 0 40-6 66 0 40 6 56 0" />
      </g>
    </svg>
  );
}

export default function CityArt({ kind }) {
  const photo =
    kind === "capital"
      ? {
          src: "https://www.civitatis.com/blog/wp-content/uploads/2025/07/shutterstock_465637628-1280x853.jpg",
          alt: "Vista urbana de Assunção, Paraguai",
        }
      : kind === "border"
        ? {
            src: "https://www.viagensecaminhos.com/wp-content/uploads/2024/03/ponte-da-amizade-brasil-paraguai.jpg",
            alt: "Ponte da Amizade entre Ciudad del Este e o Brasil",
          }
        : kind === "river"
          ? {
              src: "https://blog.livareviagens.com.br/wp-content/uploads/2025/08/Encarnacion-4-1024x683.webp",
              alt: "Vista de Encarnación, Paraguai",
            }
          : null;

  return (
    <div className="city-art">
      {photo ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" />
      ) : (
        <>
          <span className="badge-ill">ILUSTRAÇÃO</span>
          <Riverside />
        </>
      )}
    </div>
  );
}
