import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center mb-16">
        <div className="text-7xl mb-6">🍽️</div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          Waiter App
        </h1>
        <p className="text-slate-400 text-lg">Sistema ordinazioni</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate('/order')}
          className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-900 font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-150 shadow-xl shadow-amber-500/25"
        >
          + Nuova Ordinazione
        </button>
      </div>

      <p className="mt-8 text-slate-600 text-sm">
        Seleziona un tavolo per iniziare
      </p>
    </div>
  );
}

export default Home;
