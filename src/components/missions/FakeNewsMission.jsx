import React, { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { MissionHeader, SuccessBanner } from '../ui/Common';

export default function FakeNewsMission({ onComplete, onExit, isCompleted }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [missionDone, setMissionDone] = useState(isCompleted);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      headline:
        'URGENTE: Cientistas descobrem que comer chocolate 24h por dia faz você voar!',
      source: 'blog-verdade-total.xyz',
      imageColor: 'bg-red-900',
      isFake: true,
      explanation:
        'Exagerada, biologicamente impossível e fonte suspeita (.xyz é comum em spam).',
    },
    {
      headline:
        'Estudo da NASA indica aumento de temperatura nos oceanos em 2023.',
      source: 'nasa.gov',
      imageColor: 'bg-blue-900',
      isFake: false,
      explanation:
        'Fonte confiável (.gov), linguagem sóbria e dado científico verificável.',
    },
    {
      headline:
        'CLIQUE AQUI AGORA! Você ganhou um iPhone 15 grátis, só pague o frete!!!',
      source: 'ganhe-premios-rapido.net',
      imageColor: 'bg-yellow-900',
      isFake: true,
      explanation:
        'Senso de urgência excessivo (AGORA!), promessa boa demais pra ser verdade e pede dinheiro.',
    },
  ];

  const handleAnswer = (isFakeGuess) => {
    const isCorrect = isFakeGuess === questions[currentQ].isFake;
    const newAnswers = [...userAnswers, isCorrect];
    setUserAnswers(newAnswers);
    setShowExplanation(true);

    if (newAnswers.length === questions.length) {
      if (!missionDone) {
        setMissionDone(true);
        onComplete();
      }
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setShowExplanation(false);
    }
  };

  const activeQ = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto">
      <MissionHeader
        title="Missão 02: Detetive de Notícias"
        description="Analise as manchetes abaixo. Use seu senso crítico para identificar o que é real e o que é Fake News."
        onExit={onExit}
      />

      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-600"></div>
            <div>
              <p className="font-bold text-sm">Compartilhado por um amigo</p>
              <p className="text-xs text-slate-400">{activeQ.source}</p>
            </div>
          </div>

          <div
            className={`h-40 rounded-lg mb-4 flex items-center justify-center ${activeQ.imageColor} text-white/50`}
          >
            [Imagem da Notícia]
          </div>

          <h3 className="text-xl font-bold mb-6 leading-tight">
            "{activeQ.headline}"
          </h3>

          {!showExplanation ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(false)}
                className="bg-green-600 hover:bg-green-500 py-4 rounded-xl font-bold transition-colors flex flex-col items-center gap-2"
              >
                <Check className="w-6 h-6" />É Verdade
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="bg-red-600 hover:bg-red-500 py-4 rounded-xl font-bold transition-colors flex flex-col items-center gap-2"
              >
                <AlertTriangle className="w-6 h-6" />É Fake News
              </button>
            </div>
          ) : (
            <div className="animate-fade-in bg-slate-900 p-6 rounded-xl border-l-4 border-cyan-500">
              <h4 className="font-bold text-lg mb-2 text-cyan-400">
                Análise do Detetive:
              </h4>
              <p className="text-slate-300 mb-4">{activeQ.explanation}</p>

              {currentQ < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold"
                >
                  Próxima Manchete
                </button>
              ) : (
                <div className="text-center text-green-400 font-bold">
                  Análise concluída!
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-900 p-4 flex justify-center gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentQ
                  ? 'bg-cyan-500'
                  : idx < currentQ
                  ? 'bg-slate-500'
                  : 'bg-slate-700'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {missionDone && currentQ === questions.length - 1 && showExplanation && (
        <SuccessBanner onExit={onExit} message="Fake News Identificadas!" />
      )}
    </div>
  );
}
