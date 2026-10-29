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
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setPayment(null);

    const cleanPhone = phone.replace(/\D/g, "");

    if (name.trim().length < 2) {
      setMessage("Informe seu nome completo.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage("Confira o endereço de e-mail informado.");
      return;
    }
    if (![10, 11].includes(cleanPhone.length)) {
      setMessage("Informe um telefone com DDD.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: cleanPhone,
        }),
      });
      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Não foi possível gerar o Pix. Tente novamente.");
      }

      setPayment({
        qrCode: data.qr_code,
        qrImage: data.qr_code_base64,
        expiresAt: data.expires_at,
      });
    } catch (error) {
      setMessage(error.message || "Não foi possível gerar o Pix. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="checkout-page">
      <div className="checkout-wrap">
        <header className="checkout-header">
          <img
            className="checkout-brand-image"
            src="https://i.imgur.com/rkmx1Qb.jpg"
            alt="Morar no Paraguai"
          />
          <a className="checkout-back" href="#" aria-label="Voltar à página do produto">
            Morar no Paraguai
          </a>

        </header>

        <section className="checkout-card order-card" aria-labelledby="checkout-order">
          <h1 id="checkout-order">Resumo do pedido</h1>
          <div className="order-product">
            <div>
              <strong>Morar no Paraguai</strong>
              <span>Produto digital · Quantidade: 1</span>
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
            <label>
              Telefone com DDD
              <input
                autoComplete="tel"
                inputMode="tel"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(11) 99999-9999"
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
              {payment ? (
                <>
                  <strong>Pix gerado — aguardando pagamento</strong>
                  {payment.qrImage && (
                    <img
                      src={payment.qrImage}
                      alt="QR Code Pix para pagamento"
                      style={{ display: "block", width: "min(220px, 100%)", margin: "16px auto" }}
                    />
                  )}
                  {payment.qrCode && (
                    <>
                      <span>Ou copie o código Pix:</span>
                      <code style={{ display: "block", overflowWrap: "anywhere", userSelect: "all" }}>
                        {payment.qrCode}
                      </code>
                    </>
                  )}
                  {payment.expiresAt && <span>Válido até: {payment.expiresAt}</span>}
                  <span className="payment-status">Status: aguardando confirmação</span>
                </>
              ) : (
                <>
                  <strong>Seu QR Code Pix será exibido aqui</strong>
                  <span>Preencha seus dados e gere o Pix para concluir o pedido.</span>
                  <span className="payment-status">Status: aguardando geração</span>
                </>
              )}
            </div>

            <p className="checkout-microcopy">Falta pouco para concluir seu pedido.</p>
            <button className="btn btn-block checkout-submit" type="submit" disabled={loading}>
              {loading ? "GERANDO PIX..." : "GERAR PIX E FINALIZAR PEDIDO"}
            </button>
            <p className="checkout-total-note">Total: {priceLabel} — pagamento único.</p>
            {message && <p className="checkout-message" role="alert">{message}</p>}
          </section>
        </form>

        <section className="checkout-guarantee" id="checkout-guarantee" aria-labelledby="checkout-guarantee-title">
          <span className="guarantee-icon" aria-hidden="true"><Icon name="shield" size={22} /></span>
          <div>
            <h2 id="checkout-guarantee-title">SUA COMPRA TEM GARANTIA</h2>
            <p>
              Você tem 30 dias após a compra para avaliar o guia. Se decidir que ele não é para você, poderá solicitar o reembolso dentro desse prazo, conforme as condições informadas na política de reembolso.
            </p>
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