import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function MissionCard({
  title,
  subtitle,
  icon,
  color,
  isCompleted,
  onClick,
}) {
  const colorClasses = {
    purple: 'border-purple-500/30 hover:border-purple-500',
    yellow: 'border-yellow-500/30 hover:border-yellow-500',
    green: 'border-green-500/30 hover:border-green-500',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${colorClasses[color]}`}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-cyan-500 text-white p-1 rounded-bl-lg z-10">
          <Check className="w-4 h-4" />
        </div>
      )}
      <div className="bg-slate-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{subtitle}</p>
      <div className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-white transition-colors">
        {isCompleted ? 'Revisar Missão' : 'Iniciar Missão'}{' '}
        <ArrowRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  );
}
