import React, { useState, useEffect, useMemo } from 'react';
import { Check, Lock, UserCheck, X } from 'lucide-react';
import { MissionHeader, SuccessBanner } from '../ui/Common';

export default function PasswordMission({ onComplete, onExit, isCompleted }) {
  const [password, setPassword] = useState('');
  const [missionDone, setMissionDone] = useState(isCompleted);

  // Calcula a força e o feedback diretamente durante a renderização (estado derivado).
  // Isso evita re-renderizações desnecessárias causadas por useEffect.
  const { strength, feedback } = useMemo(() => {
    let score = 0;
    let msgs = [];

    if (password.length === 0) {
      return { strength: 0, feedback: [] };
    }

    if (password.length >= 8) score += 25;
    else msgs.push('Tente usar pelo menos 8 caracteres.');

    if (/[A-Z]/.test(password)) score += 25;
    else msgs.push('Inclua uma letra MAIÚSCULA.');

    if (/[0-9]/.test(password)) score += 25;
    else msgs.push('Adicione alguns números.');

    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    else msgs.push('Use símbolos especiais (!, @, #, $).');

    return { strength: score, feedback: msgs };
  }, [password]);

  // UseEffect apenas para o efeito colateral de completar a missão
  useEffect(() => {
    if (strength === 100 && !missionDone) {
      setMissionDone(true);
      onComplete();
    }
  }, [strength, missionDone, onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <MissionHeader
        title="Missão 01: Senha Imbatível"
        description="Hackers estão tentando invadir o sistema da escola! Sua tarefa é criar uma senha que seja matematicamente impossível de ser quebrada rapidamente."
        onExit={onExit}
      />

      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <label className="block text-slate-400 mb-2 font-medium">
          Digite sua nova senha:
        </label>
        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ex: Senh@Forte2024"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <div className="absolute right-4 top-4">
            {strength === 100 ? (
              <Check className="text-green-500 w-6 h-6" />
            ) : (
              <Lock className="text-slate-600 w-6 h-6" />
            )}
          </div>
        </div>

        <div className="mt-4 h-4 bg-slate-900 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              strength < 50
                ? 'bg-red-500'
                : strength < 100
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${strength}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-2 text-sm font-bold">
          <span className={strength < 50 ? 'text-red-400' : 'text-slate-600'}>
            Fraca
          </span>
          <span
            className={
              strength >= 50 && strength < 100
                ? 'text-yellow-400'
                : 'text-slate-600'
            }
          >
            Média
          </span>
          <span
            className={strength === 100 ? 'text-green-400' : 'text-slate-600'}
          >
            Imbatível
          </span>
        </div>

        <div className="mt-6 bg-slate-900/50 p-4 rounded-lg">
          <h4 className="text-slate-300 font-bold mb-2 flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> Análise de Segurança:
          </h4>
          {feedback.length > 0 ? (
            <ul className="space-y-2">
              {feedback.map((msg, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-red-300 text-sm"
                >
                  <X className="w-4 h-4" /> {msg}
                </li>
              ))}
            </ul>
          ) : strength === 0 ? (
            <p className="text-slate-500 text-sm">Aguardando entrada...</p>
          ) : (
            <p className="text-green-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" /> Excelente! Esta senha levaria
              séculos para ser quebrada.
            </p>
          )}
        </div>
      </div>

      {missionDone && (
        <SuccessBanner onExit={onExit} message="Senha Segura Criada!" />
      )}
    </div>
  );
}
