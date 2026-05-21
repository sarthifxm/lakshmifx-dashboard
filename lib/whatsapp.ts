export async function sendWhatsAppTemplate(to: string, templateName: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error("Missing WhatsApp credentials");
  }

  const response = await fetch(
    `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "en_US"
          }
        }
      })
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`WhatsApp send failed: ${detail}`);
  }

  return response.json();
}