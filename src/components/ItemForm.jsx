import React, { useState } from 'react';

function ItemForm({ onAdd, loading }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;
    onAdd({ name: name.trim(), quantity, price: parseFloat(price) });
    setName('');
    setQuantity(1);
    setPrice('');
  };

  const isValid = name.trim() && price && parseFloat(price) > 0;

  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
      <h2 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>🍴</span> Aggiungi Piatto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nome piatto (es. Carbonara)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
          className="w-full bg-slate-700 text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-sm"
        />

        <div className="flex gap-3">
          {/* Quantity stepper */}
          <div className="flex items-center bg-slate-700 rounded-xl border border-slate-600">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white text-xl transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center text-white font-bold text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white text-xl transition-colors"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              €
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0.01"
              step="0.01"
              required
              className="w-full bg-slate-700 text-white placeholder-slate-500 pl-7 pr-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl transition-all duration-150 text-sm"
        >
          {loading ? '⏳' : '+ Aggiungi'}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
