import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("/payments.json")
      .then((res) => res.json())
      .then((data) => setPayments(data.methods));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Админка</h2>
      <div>
        <h3 className="font-semibold mb-2">Способы оплаты</h3>
        {payments.map((m) => (
          <div key={m.id} className="p-2 bg-purple-700 rounded mb-2">
            <p>{m.name} — {m.active ? "✅ активен" : "❌ выключен"}</p>
            <pre>{JSON.stringify(m.details, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
