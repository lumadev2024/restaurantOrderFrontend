import React, { useState } from 'react';
import { createTable } from '../services/api';

function TableSelector({ tables, loading, onSelect, onTableCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState('');
  const [seats, setSeats] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const res = await createTable(parseInt(number), parseInt(seats));
      onTableCreated(res.data);
      setNumber('');
      setSeats('');
      setShowForm(false);
    } catch {
      setError('Errore nella creazione del tavolo. Il numero potrebbe già esistere.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Caricamento tavoli...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Add table form */}
      {showForm ? (
        <div className="bg-slate-800 border border-amber-500/30 rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span>🪑</span> Nuovo Tavolo
          </h3>
          {error && (
            <p className="text-red-400 text-sm mb-3 bg-red-500/10 border border-red-500/20 p-2 rounded-xl">
              {error}
            </p>
          )}
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-slate-400 text-xs mb-1 block">N° Tavolo</label>
                <input
                  type="number"
                  placeholder="es. 5"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  min="1"
                  required
                  className="w-full bg-slate-700 text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-slate-400 text-xs mb-1 block">Posti</label>
                <input
                  type="number"
                  placeholder="es. 4"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  min="1"
                  required
                  className="w-full bg-slate-700 text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-600 focus:border-amber-500 focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setShowForm(false); setError(null); }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={saving || !number || !seats}
                className="flex-1 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 text-slate-900 font-bold py-3 rounded-xl transition-all duration-150 text-sm"
              >
                {saving ? '⏳' : 'Crea Tavolo'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full border border-dashed border-slate-600 hover:border-amber-500/50 hover:bg-slate-800/50 text-slate-400 hover:text-amber-400 py-4 rounded-2xl transition-all duration-150 text-sm font-medium flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Aggiungi Tavolo
        </button>
      )}

      {/* Tables grid */}
      {tables.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="text-4xl mb-3">🪑</div>
          <p className="text-slate-300 font-medium mb-1">Nessun tavolo</p>
          <p className="text-slate-500 text-sm">Crea il primo tavolo qui sopra</p>
        </div>
      ) : (
        <>
          <p className="text-slate-400 text-sm px-1">
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
        </>
      )}
    </div>
  );
}

export default TableSelector;
