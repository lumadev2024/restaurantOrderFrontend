import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTables, createOrder, addItem, closeOrder } from '../services/api';
import TableSelector from '../components/TableSelector';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import SuccessScreen from '../components/SuccessScreen';

function OrderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('tables');
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getTables();
        setTables(res.data);
      } catch {
        setError('Impossibile caricare i tavoli. Controlla che il server sia online.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTableSelect = async (table) => {
    try {
      setLoading(true);
      setError(null);
      const res = await createOrder(table.id);
      setSelectedTable(table);
      setOrder(res.data);
      setStep('order');
    } catch {
      setError("Errore nella creazione dell'ordine.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item) => {
    try {
      setLoading(true);
      setError(null);
      const res = await addItem(order.id, item);
      setItems((prev) => [...prev, res.data]);
    } catch {
      setError("Errore nell'aggiunta del piatto.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOrder = async () => {
    if (items.length === 0) {
      setError('Aggiungi almeno un piatto prima di chiudere.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await closeOrder(order.id);
      setOrder(res.data);
      setStep('success');
    } catch {
      setError('Errore nella chiusura ordine.');
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  if (step === 'success') {
    return (
      <SuccessScreen
        order={order}
        total={total}
        onNewOrder={() => navigate('/')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => (step === 'tables' ? navigate('/') : setStep('tables'))}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          ←
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold">
            {step === 'tables' ? 'Seleziona Tavolo' : `Tavolo ${selectedTable?.number}`}
          </h1>
          {step === 'order' && (
            <p className="text-slate-400 text-xs">
              {selectedTable?.seats} posti · Ordine #{order?.id}
            </p>
          )}
        </div>
        {step === 'order' && (
          <span className="bg-slate-800 text-amber-400 font-bold px-3 py-1 rounded-full text-sm">
            € {total.toFixed(2)}
          </span>
        )}
      </header>

      {/* Error Banner */}
      {error && (
        <div className="mx-4 mt-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm flex items-start gap-2">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {step === 'tables' ? (
          <TableSelector
            tables={tables}
            loading={loading}
            onSelect={handleTableSelect}
          />
        ) : (
          <div className="p-4 space-y-4">
            <ItemForm onAdd={handleAddItem} loading={loading} />
            <ItemList items={items} />
          </div>
        )}
      </div>

      {/* Footer */}
      {step === 'order' && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-slate-400 text-sm">Totale ordine</p>
              <p className="text-2xl font-bold text-amber-400">€ {total.toFixed(2)}</p>
            </div>
            <p className="text-slate-500 text-sm">{items.length} {items.length === 1 ? 'piatto' : 'piatti'}</p>
          </div>
          <button
            onClick={handleCloseOrder}
            disabled={loading || items.length === 0}
            className="w-full bg-green-500 hover:bg-green-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-lg transition-all duration-150 shadow-lg shadow-green-500/20"
          >
            {loading ? '⏳ Attendere...' : '✓ Chiudi Ordine'}
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
