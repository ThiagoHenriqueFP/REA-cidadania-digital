import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';

export function MissionHeader({ title, description, onExit }) {
  return (
    <div className="mb-8">
      <button
        onClick={onExit}
        className="text-slate-400 hover:text-white flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-wider"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Voltar para a Base
      </button>
      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

export function SuccessBanner({ onExit, message }) {
  return (
    <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-center animate-bounce-in shadow-lg shadow-green-900/20">
      <Trophy className="w-12 h-12 text-white mx-auto mb-2" />
      <h3 className="text-2xl font-bold text-white mb-4">{message}</h3>
      <button
        onClick={onExit}
        className="bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-green-50 shadow-lg transition-transform hover:scale-105"
      >
        Resgatar Recompensa & Voltar
      </button>
    </div>
  );
}
