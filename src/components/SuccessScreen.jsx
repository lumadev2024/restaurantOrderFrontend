import React from 'react';

function SuccessScreen({ order, total, onNewOrder }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Ordine Chiuso!</h1>
        <p className="text-slate-400">
          Ordine #{order?.id} · Tavolo {order?.tableNumber}
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm mb-8">
        <p className="text-slate-400 text-sm mb-2">Totale da pagare</p>
        <p className="text-5xl font-bold text-amber-400">
          € {total.toFixed(2)}
        </p>
      </div>

      <button
        onClick={onNewOrder}
        className="w-full max-w-sm bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-900 font-bold py-5 rounded-2xl text-xl transition-all duration-150 shadow-xl shadow-amber-500/25"
      >
        + Nuova Ordinazione
      </button>
    </div>
  );
}

export default SuccessScreen;
