import { supportLabel } from "../config";
import Icon from "../components/Icon";

/* Confirmação de pagamento: só pode ser "ok" com verificação real vinda do servidor ou da
   plataforma de pagamento. Sem integração, a página permanece em "pendente".
   Nada é inferido da URL e nenhum dado de transação é exibido. */
function paymentState() {
  return "pending";
}

export default function Thanks() {
  const ok = paymentState() === "ok";
  return (
    <main className="thanks">
      <div className="wrap">
        <div className="thanks-card">
          {ok ? (
            <div>
              <span className="status ok">
                <Icon name="check" size={16} />
                Pagamento confirmado
              </span>
              <h1 style={{ fontSize: "clamp(24px,5vw,32px)", marginTop: 14 }}>Pagamento confirmado. Seu acesso está liberado.</h1>
            </div>
          ) : (
            <div>
              <span className="status">
                <Icon name="clock" size={16} />
                Aguardando confirmação do pagamento
              </span>
              <h1 style={{ fontSize: "clamp(24px,5vw,32px)", marginTop: 14 }}>
                Estamos aguardando a confirmação do seu pagamento.
              </h1>
              <p style={{ marginTop: 10, color: "#3A4152" }}>
                Esta página não confirma, por si só, que o pagamento foi aprovado. O acesso ao guia é liberado somente depois
                que a plataforma de pagamento confirmar a compra.
              </p>
            </div>
          )}
          <ol>
            <li>Confira a caixa de entrada do e-mail usado na compra, inclusive as pastas de spam e promoções.</li>
            <li>Siga as instruções da mensagem de entrega para acessar o guia e os materiais.</li>
            <li>Se o acesso não chegar, fale com o suporte.</li>
          </ol>
          <div className="support">
            <b>Suporte</b>
            <span>{supportLabel}</span>
          </div>
          <a className="btn btn-ghost" href="#" style={{ justifySelf: "start" }}>
            Voltar à página inicial
          </a>
        </div>
      </div>
    </main>
  );
}
