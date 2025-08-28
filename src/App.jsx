import React, { useState, useEffect } from "react";
import Shop from "./components/Shop";
import AdminPanel from "./admin/AdminPanel";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Digital Store</h1>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded-xl"
        >
          {isAdmin ? "В магазин" : "В админку"}
        </button>
      </div>
      {isAdmin ? <AdminPanel /> : <Shop />}
    </div>
  );
}
