import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG, priceLabel, checkoutReady } from "./config";
import { AppContext } from "./context";
import { initTracking, track } from "./tracking";
import { DevBar, Header, Hero } from "./sections/Top";
import { Identification, Expert, Receive } from "./sections/Info";
import Previews from "./sections/Previews";
import Cities from "./sections/Cities";
import { Docs, Finance, Compare } from "./sections/Plan";
import { Offer, Faq, Footer } from "./sections/Close";
import Thanks from "./sections/Thanks";
import Checkout from "./sections/Checkout";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Rota simples por hash: "#obrigado" mostra a página de confirmação. */
function useThanksRoute() {
  const [thanks, setThanks] = useState(() => window.location.hash === "#obrigado");
  const first = useRef(true);

  useEffect(() => {
    const onHash = () => setThanks(window.location.hash === "#obrigado");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [thanks]);

  return thanks;
}

function useCheckoutRoute() {
  useEffect(() => {
    const redirectToExternalCheckout = () => {
      if (window.location.hash === "#checkout" && CONFIG.checkoutUrl) {
        window.location.replace(CONFIG.checkoutUrl);
      }
    };

    redirectToExternalCheckout();
    window.addEventListener("hashchange", redirectToExternalCheckout);
    return () => window.removeEventListener("hashchange", redirectToExternalCheckout);
  }, []);

  return false;
}

export default function App() {
  const thanks = useThanksRoute();
  const checkoutPage = useCheckoutRoute();
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [offerVisible, setOfferVisible] = useState(false);
  const pageViewSent = useRef(false);
  const contentViewed = useRef(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  }, []);

  /** CTAs de compra direcionam ao checkout externo configurado. */
  const buy = useCallback(
    (where) => ({
      href: CONFIG.checkoutUrl,
      "data-where": where,
    }),
    []
  );

  const goto = useCallback(
    (id) => (e) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    },
    []
  );

  // Revela as seções conforme entram na área visível durante a rolagem.
  useEffect(() => {
    if (thanks || checkoutPage || prefersReducedMotion() || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("main > section, footer.site-footer").forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [thanks, checkoutPage]);

  // PageView uma única vez.
  useEffect(() => {
    if (pageViewSent.current) return;
    pageViewSent.current = true;
    initTracking();
    track("PageView");
  }, []);

  // Inicia o evento de checkout ao abrir a página, sem registrar compra.
  useEffect(() => {
    if (checkoutPage) {
      track("InitiateCheckout", { content_name: CONFIG.productName, value: CONFIG.price, currency: CONFIG.currency });
    }
  }, [checkoutPage]);

  // Observa o hero (barra fixa) e a oferta (barra fixa e ViewContent).
  useEffect(() => {
    if (thanks || checkoutPage) return undefined;
    const hero = document.getElementById("hero");
    const offer = document.getElementById("oferta");
    if (!hero || !offer || !("IntersectionObserver" in window)) {
      setHeroVisible(false);
      return undefined;
    }
    const heroObs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
    const offerObs = new IntersectionObserver(
      ([e]) => {
        setOfferVisible(e.isIntersecting);
        if (e.isIntersecting && !contentViewed.current) {
          contentViewed.current = true;
          track("ViewContent", { content_name: CONFIG.productName, value: CONFIG.price, currency: CONFIG.currency });
        }
      },
      { threshold: 0.25 }
    );
    heroObs.observe(hero);
    offerObs.observe(offer);
    return () => {
      heroObs.disconnect();
      offerObs.disconnect();
    };
  }, [thanks, checkoutPage]);

  const showSticky = !thanks && !checkoutPage && !heroVisible && !offerVisible;

  useEffect(() => {
    document.body.classList.toggle("has-sticky", showSticky);
    return () => document.body.classList.remove("has-sticky");
  }, [showSticky]);

  return (
    <AppContext.Provider value={{ buy, goto }}>
      <DevBar />
      {thanks ? (
        <Thanks />
      ) : checkoutPage ? (
        <Checkout />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <Identification />
            <Expert />
            <Receive />
            <Previews />
            <Cities />
            <Docs />
            <Finance />
            <Compare />
            <Offer />
            <Faq />
          </main>
          <Footer />
        </>
      )}

      {showSticky && (
        <div className="sticky">
          <div>
            <b>Guia digital — {priceLabel}</b>
            <span>Pagamento único</span>
          </div>
          <a className="btn btn-sm" {...buy("sticky")}>
            Acessar guia
          </a>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </AppContext.Provider>
  );
}
