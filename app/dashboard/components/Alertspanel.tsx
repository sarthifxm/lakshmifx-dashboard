"use client";

import { useState } from "react";

export default function AlertsPanel() {
  const [telegram, setTelegram] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);

  const save = async () => {
    await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegram, whatsapp }),
    });

    alert("Saved");
  };

  return (
    <div>
      <h3>Alerts</h3>

      <label>
        <input
          type="checkbox"
          checked={telegram}
          onChange={(e) => setTelegram(e.target.checked)}
        />
        Telegram Alerts
      </label>

      <label>
        <input
          type="checkbox"
          checked={whatsapp}
          onChange={(e) => setWhatsapp(e.target.checked)}
        />
        WhatsApp Alerts
      </label>

      <button onClick={save}>Save</button>
    </div>
  );
}