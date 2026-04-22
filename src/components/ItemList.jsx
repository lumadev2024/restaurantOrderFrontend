import React from 'react';

function ItemList({ items }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-slate-600">
        <p className="text-3xl mb-2">🍽️</p>
        <p className="text-sm">Nessun piatto aggiunto</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
      <div className="px-4 py-3 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-white font-bold text-sm">
          Ordine in corso
        </h2>
        <span className="text-slate-400 text-xs">
          {items.length} {items.length === 1 ? 'piatto' : 'piatti'}
        </span>
      </div>

      <ul className="divide-y divide-slate-700">
        {items.map((item, i) => (
          <li key={item.id || i} className="flex items-center justify-between px-4 py-3">
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-white font-medium text-sm truncate">{item.name}</p>
              <p className="text-slate-400 text-xs mt-0.5">
                x{item.quantity} × € {parseFloat(item.price).toFixed(2)}
              </p>
            </div>
            <span className="text-amber-400 font-bold text-sm whitespace-nowrap">
              € {parseFloat(item.subtotal).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
