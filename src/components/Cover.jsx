/* Capa ilustrativa do guia (mockup digital, não é foto de produto físico). */
const FONT = "Inter,system-ui,sans-serif";

export default function Cover() {
  return (
    <svg
      className="cover"
      viewBox="0 0 340 440"
      role="img"
      aria-label="Capa ilustrativa do guia Morar no Paraguai: guia prático de planejamento, documentação e custos"
    >
      <defs>
        <clipPath id="cv">
          <rect x="14" y="10" width="268" height="404" rx="12" />
        </clipPath>
        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#3A4358" />
        </pattern>
      </defs>

      <rect x="22" y="16" width="268" height="404" rx="12" fill="#D9DDE5" />
      <rect x="18" y="13" width="268" height="404" rx="12" fill="#fff" stroke="#E5E7EB" />
      <rect x="14" y="10" width="268" height="404" rx="12" fill="#151923" />

      <g clipPath="url(#cv)">
        <rect x="14" y="10" width="12" height="404" fill="#0E121A" />
        <rect x="14" y="10" width="268" height="6" fill="#D92D36" />

        <rect x="40" y="226" width="130" height="118" fill="url(#dots)" opacity=".8" />
        <polygon
          points="52,262 86,246 122,252 150,274 140,304 158,326 120,344 92,334 70,346 48,320 58,290"
          fill="#232A3B"
          stroke="#4A5570"
          strokeWidth="1.5"
        />
        <circle cx="104" cy="282" r="4" fill="#fff" />
        <circle cx="132" cy="296" r="4" fill="#D92D36" />
        <circle cx="92" cy="316" r="4" fill="#16845B" />
        <path d="M104 282L132 296L92 316" fill="none" stroke="#6B7690" strokeWidth="1" strokeDasharray="3 3" />

        <g fill="#1F2635">
          <rect x="26" y="372" width="22" height="42" />
          <rect x="50" y="356" width="18" height="58" />
          <rect x="70" y="378" width="26" height="36" />
          <rect x="98" y="362" width="20" height="52" />
          <rect x="120" y="380" width="24" height="34" />
          <rect x="146" y="352" width="22" height="62" />
          <rect x="170" y="374" width="28" height="40" />
          <rect x="200" y="364" width="20" height="50" />
          <rect x="222" y="382" width="30" height="32" />
          <rect x="254" y="368" width="26" height="46" />
        </g>
        <g fill="#3A4358">
          <rect x="54" y="362" width="3" height="3" />
          <rect x="60" y="362" width="3" height="3" />
          <rect x="54" y="372" width="3" height="3" />
          <rect x="60" y="382" width="3" height="3" />
          <rect x="150" y="358" width="3" height="3" />
          <rect x="157" y="358" width="3" height="3" />
          <rect x="150" y="368" width="3" height="3" />
          <rect x="157" y="378" width="3" height="3" />
          <rect x="102" y="368" width="3" height="3" />
          <rect x="109" y="378" width="3" height="3" />
          <rect x="204" y="370" width="3" height="3" />
          <rect x="211" y="380" width="3" height="3" />
        </g>

        <text x="40" y="52" fontSize="11" fontWeight="700" letterSpacing="2.4" fill="#AAB1C0" fontFamily={FONT}>GUIA PRÁTICO</text>
        <text x="40" y="96" fontSize="31" fontWeight="800" fill="#fff" fontFamily={FONT} letterSpacing="-.5">MORAR NO</text>
        <text x="40" y="132" fontSize="31" fontWeight="800" fill="#fff" fontFamily={FONT} letterSpacing="-.5">PARAGUAI</text>
        <rect x="40" y="144" width="44" height="4" fill="#D92D36" />
        <text x="40" y="172" fontSize="12.5" fill="#C9CEDA" fontFamily={FONT}>Guia prático de planejamento,</text>
        <text x="40" y="190" fontSize="12.5" fill="#C9CEDA" fontFamily={FONT}>documentação e custos</text>
      </g>

      <g transform="rotate(-5 236 330)">
        <rect x="168" y="262" width="136" height="104" rx="8" fill="#E5E7EB" />
      </g>
      <g transform="rotate(4 236 330)">
        <rect x="170" y="268" width="136" height="104" rx="8" fill="#fff" stroke="#E5E7EB" />
        <rect x="184" y="282" width="52" height="6" rx="3" fill="#151923" />
        <g fill="none" stroke="#16845B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="184" y="300" width="11" height="11" rx="2" />
          <path d="M186.5 305.5l2.5 2.5 4-5" />
          <rect x="184" y="320" width="11" height="11" rx="2" />
          <path d="M186.5 325.5l2.5 2.5 4-5" />
        </g>
        <rect x="184" y="344" width="11" height="11" rx="2" fill="none" stroke="#B6BCC8" strokeWidth="2" />
        <rect x="203" y="303" width="82" height="5" rx="2.5" fill="#D9DDE5" />
        <rect x="203" y="323" width="64" height="5" rx="2.5" fill="#D9DDE5" />
        <rect x="203" y="347" width="74" height="5" rx="2.5" fill="#D9DDE5" />
      </g>
    </svg>
  );
}
