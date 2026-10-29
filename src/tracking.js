import { CONFIG } from "./config";

/* Meta Pixel. Purchase NUNCA é disparado por esta página.
   Purchase deve vir de confirmação real de pagamento (webhook da plataforma
   → Conversions API no servidor), deduplicado pelo mesmo event_id. */

const ids = {};
let started = false;

const newId = () =>
  window.crypto && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const allowed = () => {
  const t = CONFIG.tracking;
  return Boolean(t.pixelId) && (!t.requireConsent || t.consentGranted);
};

export function initTracking() {
  if (started) return;
  started = true;
  if (!allowed()) return;
  if (!window.fbq) {
    // Snippet padrão do Pixel.
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }
  window.fbq("init", CONFIG.tracking.pixelId);
}

/** Envia um evento do navegador e devolve o event_id (use o mesmo id no servidor). */
export function track(name, params = {}) {
  const id = newId();
  ids[name] = id;
  if (allowed() && typeof window.fbq === "function") {
    window.fbq("track", name, params, { eventID: id });
  }
  return id;
}

export const lastEventId = (name) => ids[name];
