
"use client";

import { useState } from "react";

export default function PurchaseButton({ courseSlug }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const initData = window.Telegram?.WebApp?.initData;

      if (!initData) {
        throw new Error("ОТКРОЙТЕ ПРИЛОЖЕНИЕ ЧЕРЕЗ TELEGRAM");
      }

      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          initData,
          courseSlug
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "НЕ УДАЛОСЬ СОЗДАТЬ ЗАЯВКУ");
      }

      setMessage("ЗАЯВКА СОЗДАНА. ОЖИДАЕТ ОПЛАТЫ.");
    } catch (error) {
      setMessage(error.message || "ОШИБКА СЕТИ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <button
        onClick={handlePurchase}
        disabled={loading}
        style={{
          padding: "18px 28px",
          background: "#c7ff4d",
          color: "#10110d",
          border: "none",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "1px",
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? "ОБРАБОТКА..." : "ПРИОБРЕСТИ КУРС"}
      </button>

      {message && (
        <p style={{
          color: "#c7ff4d",
          fontSize: "12px",
          marginTop: "15px",
          lineHeight: "1.5"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
