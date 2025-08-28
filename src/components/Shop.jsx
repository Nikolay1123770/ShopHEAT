import React, { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [paid, setPaid] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    fetch("/payments.json")
      .then((res) => res.json())
      .then((data) => setPayments(data.methods.filter(m => m.active)));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Товары</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-4 bg-purple-800 rounded-xl shadow">
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="mb-2">{p.price}₽</p>
            <button
              onClick={() => setSelected(p)}
              className="bg-green-600 px-3 py-1 rounded"
            >
              Купить
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-purple-700 rounded-xl">
          <h3 className="font-bold mb-2">Оплата {selected.name}</h3>
          {!paid ? (
            <>
              <p>Выберите способ оплаты:</p>
              {payments.map((m) => (
                <div key={m.id} className="my-2 p-2 border border-purple-500 rounded">
                  <h4 className="font-semibold">{m.name}</h4>
                  <pre>{JSON.stringify(m.details, null, 2)}</pre>
                </div>
              ))}
              <button
                onClick={() => setPaid(true)}
                className="mt-2 bg-blue-600 px-4 py-2 rounded"
              >
                Я оплатил
              </button>
            </>
          ) : !confirmed ? (
            <p>Ожидание подтверждения админом...</p>
          ) : (
            <div>
              <p className="text-green-400">✅ Оплата подтверждена!</p>
              <p>Ваш ключ: {selected.keys[0]}</p>
              <a href={selected.file} className="underline">Скачать файл</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
