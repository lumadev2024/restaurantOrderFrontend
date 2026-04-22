import React from 'react';

function TableSelector({ tables, loading, onSelect }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Caricamento tavoli...</p>
      </div>
    );
  }

  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center px-6">
        <div className="text-4xl mb-3">🪑</div>
        <p className="text-slate-300 font-medium mb-1">Nessun tavolo disponibile</p>
        <p className="text-slate-500 text-sm">
          Aggiungine uno dal pannello Swagger
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-slate-400 text-sm mb-4 px-1">
        {tables.length} {tables.length === 1 ? 'tavolo disponibile' : 'tavoli disponibili'}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => onSelect(table)}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 hover:border-amber-500/50 p-5 rounded-2xl text-left transition-all duration-150"
          >
            <div className="text-3xl mb-3">🪑</div>
            <p className="text-white font-bold text-xl leading-none mb-1">
              Tavolo {table.number}
            </p>
            <p className="text-slate-400 text-sm">{table.seats} posti</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TableSelector;
