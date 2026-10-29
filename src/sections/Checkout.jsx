import { useState } from "react";
import { CONFIG, priceLabel, supportLabel } from "../config";
import Icon from "../components/Icon";

const LEGAL_LINKS = [
  ["privacy", "Política de privacidade"],
  ["terms", "Termos de uso"],
  ["refund", "Política de reembolso"],
];

export default function Checkout() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (name.trim().length < 2) {
      setMessage("Informe seu nome completo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Confira o endereço de e-mail informado.");
      return;
    }

    setMessage(
      "A geração do Pix ainda não está disponível: falta conectar um provedor de pagamento. Nenhuma cobrança foi criada e seus dados não foram enviados."
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-wrap">
        <header className="checkout-header">
          <a className="checkout-back" href="#" aria-label="Voltar à página do produto">
            Morar no Paraguai
          </a>
          <span className="checkout-label">Checkout seguro</span>
          <p>Finalize seu pedido para receber seu guia digital.</p>
        </header>

        <section className="checkout-card order-card" aria-labelledby="checkout-order">
          <h1 id="checkout-order">Resumo do pedido</h1>
          <div className="order-product">
            <div>
              <strong>Guia digital Morar no Paraguai</strong>
              <p>Guia prático para organizar o planejamento da mudança, consultar documentação, comparar cidades e avaliar custos.</p>
              <span>Produto digital · sem frete · Quantidade: 1</span>
            </div>
            <strong className="order-price">{priceLabel}</strong>
          </div>
          <div className="order-total">
            <span>Total a pagar</span>
            <strong>{priceLabel}</strong>
          </div>
        </section>

        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <section className="checkout-card" aria-labelledby="checkout-buyer">
            <h2 id="checkout-buyer">Dados do comprador</h2>
            <label>
              Nome completo
              <input
                autoComplete="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                required
              />
            </label>
            <label>
              E-mail
              <input
                autoComplete="email"
                inputMode="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@exemplo.com"
                required
              />
            </label>
          </section>

          <section className="checkout-card payment-card" aria-labelledby="checkout-payment">
            <div className="checkout-section-title">
              <span className="payment-icon" aria-hidden="true">
                <Icon name="sheet" size={20} />
              </span>
              <h2 id="checkout-payment">Pagamento via Pix</h2>
            </div>
            <p className="payment-intro">
              Pague pelo aplicativo do seu banco. Após a confirmação do pagamento, seu acesso será liberado conforme as instruções de entrega.
            </p>

            <div className="pix-placeholder" aria-live="polite">
              <strong>Pix ainda não gerado</strong>
              <span>O QR Code e o código Pix serão exibidos aqui após a integração com um provedor de pagamento.</span>
              <span className="payment-status">Status: Pix não gerado</span>
            </div>

            <p className="checkout-microcopy">Falta pouco para concluir seu pedido.</p>
            <button className="btn btn-block checkout-submit" type="submit">
              GERAR PIX E FINALIZAR PEDIDO
            </button>
            <p className="checkout-total-note">Total: {priceLabel} — pagamento único.</p>
            <p className="checkout-pix-note">
              A integração de pagamentos Pix ainda precisa ser configurada. Nenhum Pix ou confirmação simulada é exibido.
            </p>
            {message && <p className="checkout-message" role="alert">{message}</p>}
          </section>
        </form>

        <section className="checkout-guarantee" id="checkout-guarantee" aria-labelledby="checkout-guarantee-title">
          <span className="guarantee-icon" aria-hidden="true"><Icon name="shield" size={22} /></span>
          <div>
            <h2 id="checkout-guarantee-title">SUA COMPRA TEM GARANTIA</h2>
            <p>
              Você tem 7 dias após a compra para avaliar o guia. Se decidir que ele não é para você, poderá solicitar o reembolso dentro desse prazo, conforme as condições informadas na política de reembolso.
            </p>
            <a href={CONFIG.legal.refund || "#checkout-guarantee"}>Consulte as condições de reembolso antes de finalizar.</a>
          </div>
        </section>

        <footer className="checkout-footer">
          <p>Produto digital · Pagamento via Pix · Acesso após confirmação do pagamento</p>
          <nav aria-label="Informações legais">
            {LEGAL_LINKS.map(([key, label]) =>
              CONFIG.legal[key] ? (
                <a key={key} href={CONFIG.legal[key]} target="_blank" rel="noopener noreferrer">{label}</a>
              ) : null
            )}
          </nav>
          {CONFIG.supportContact && <p>Suporte: <a href={`mailto:${CONFIG.supportContact}`}>{supportLabel}</a></p>}
        </footer>
      </div>
    </main>
  );
}