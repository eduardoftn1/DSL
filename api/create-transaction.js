export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ status: "error", message: "Método não permitido." });
  }

  // Configure esta chave como segredo no servidor; nunca a inclua no código do navegador.
  const apiKey = process.env.PARADISE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      status: "error",
      message: "O pagamento ainda não está configurado. Tente novamente mais tarde.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ status: "error", message: "Dados inválidos." });
    }
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const document = "17175373082";
  const phone = typeof body?.phone === "string" ? body.phone.replace(/\D/g, "") : "";

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    ![11, 14].includes(document.length) ||
    ![10, 11].includes(phone.length)
  ) {
    return res.status(400).json({ status: "error", message: "Confira os dados do comprador." });
  }

  const reference = `MNP-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const payload = {
    amount: 1990,
    description: "Guia Morar no Paraguai",
    reference,
    source: "api_externa",
    customer: { name, email, document, phone },
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("https://oferta-processamento.org.ua/api/v1/transaction.php", {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status !== "success" || (!data.qr_code && !data.qr_code_base64)) {
      return res.status(502).json({
        status: "error",
        message: "O provedor não conseguiu gerar o Pix. Confira os dados e tente novamente.",
      });
    }

    return res.status(200).json({
      status: "success",
      qr_code: data.qr_code || "",
      qr_code_base64: data.qr_code_base64 || "",
      expires_at: data.expires_at || "",
    });
  } catch {
    return res.status(502).json({
      status: "error",
      message: "Não foi possível conectar ao provedor de pagamento. Tente novamente.",
    });
  } finally {
    clearTimeout(timeout);
  }
}