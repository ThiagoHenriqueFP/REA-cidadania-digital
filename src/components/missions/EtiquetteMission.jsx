import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { MissionHeader, SuccessBanner } from '../ui/Common';

export default function EtiquetteMission({ onComplete, onExit, isCompleted }) {
  const [step, setStep] = useState(0);
  const [missionDone, setMissionDone] = useState(isCompleted);

  const scenarios = [
    {
      title: 'O Grupo da Turma',
      desc: 'Alguém mandou uma foto constrangedora de um colega no grupo da escola e todos estão rindo.',
      options: [
        {
          text: 'Rir também e mandar figurinha.',
          correct: false,
          feedback:
            'Isso é Cyberbullying. Você está aumentando o sofrimento do colega.',
        },
        {
          text: 'Não falar nada.',
          correct: false,
          feedback: 'A omissão ajuda o agressor, mas é melhor que rir.',
        },
        {
          text: 'Não repassar e alertar que isso não é legal.',
          correct: true,
          feedback:
            'Correto! Cortar a corrente do ódio é atitude de Cidadão Digital.',
        },
      ],
    },
    {
      title: 'O Jogo Online',
      desc: "Um jogador estranho pede seu WhatsApp e nome da sua escola para te dar 'skins' grátis.",
      options: [
        {
          text: 'Passar, mas pedir pra ele não contar pra ninguém.',
          correct: false,
          feedback: 'Perigoso! Nunca compartilhe dados pessoais com estranhos.',
        },
        {
          text: 'Ignorar e bloquear o jogador.',
          correct: true,
          feedback: 'Perfeito. Mantenha sua privacidade protegida.',
        },
        {
          text: 'Passar o número falso.',
          correct: false,
          feedback: 'Melhor apenas bloquear para evitar qualquer interação.',
        },
      ],
    },
  ];

  const handleChoice = (isCorrect) => {
    if (isCorrect) {
      if (step < scenarios.length - 1) {
        setTimeout(() => setStep(step + 1), 1500);
      } else {
        if (!missionDone) {
          setMissionDone(true);
          onComplete();
        }
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <MissionHeader
        title="Missão 03: Bússola Social"
        description="A Internet exige respeito e cuidado. Escolha a melhor atitude para cada situação."
        onExit={onExit}
      />

      <div className="grid gap-6">
        {missionDone && step === scenarios.length - 1 ? (
          <SuccessBanner
            onExit={onExit}
            message="Você é um exemplo de ética!"
          />
        ) : (
          <ScenarioCard
            key={step}
            scenario={scenarios[step]}
            onChoose={handleChoice}
            number={step + 1}
          />
        )}
      </div>
    </div>
  );
}

function ScenarioCard({ scenario, onChoose, number }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (idx, isCorrect) => {
    setSelected(idx);
    if (!isCorrect) {
      setTimeout(() => setSelected(null), 2000); // Reset após erro
    }
    onChoose(isCorrect);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl animate-fade-in">
      <span className="text-cyan-500 font-bold text-sm tracking-wider uppercase mb-2 block">
        Cenário {number}
      </span>
      <h3 className="text-2xl font-bold mb-4">{scenario.title}</h3>
      <div className="bg-slate-900/50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
        <p className="text-lg">{scenario.desc}</p>
      </div>

      <div className="space-y-3">
        {scenario.options.map((opt, idx) => {
          let btnClass =
            'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ';

          if (selected === idx) {
            btnClass += opt.correct
              ? 'bg-green-900/40 border-green-500 text-green-200'
              : 'bg-red-900/40 border-red-500 text-red-200';
          } else {
            btnClass +=
              'bg-slate-700 border-transparent hover:bg-slate-600 hover:border-slate-500';
          }

          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => handleClick(idx, opt.correct)}
              className={btnClass}
            >
              <div className="flex justify-between items-center">
                <span>{opt.text}</span>
                {selected === idx &&
                  (opt.correct ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  ))}
              </div>
              {selected === idx && (
                <p className="text-sm mt-2 opacity-90 font-bold">
                  {opt.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
