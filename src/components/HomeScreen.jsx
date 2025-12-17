import React from 'react';
import { Lock, Search, MessageCircle, Trophy } from 'lucide-react';
import MissionCard from './ui/MissionCard';

export default function HomeScreen({ completedMissions, navigateTo }) {
  const allCompleted = completedMissions.length === 3;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Bem-vindo, Recruta!
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          A internet é um universo vasto, mas cheio de perigos. Sua missão é
          completar o treinamento para se tornar um{' '}
          <span className="text-cyan-400 font-bold">
            Cidadão Digital Certificado
          </span>
          .
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <MissionCard
          id="mission1"
          title="Escudo Digital"
          subtitle="Crie uma senha imbatível"
          icon={<Lock className="w-8 h-8 text-purple-400" />}
          color="purple"
          isCompleted={completedMissions.includes('mission1')}
          onClick={() => navigateTo('mission1')}
        />

        <MissionCard
          id="mission2"
          title="Lente da Verdade"
          subtitle="Detetive de Notícias Falsas"
          icon={<Search className="w-8 h-8 text-yellow-400" />}
          color="yellow"
          isCompleted={completedMissions.includes('mission2')}
          onClick={() => navigateTo('mission2')}
        />

        <MissionCard
          id="mission3"
          title="Bússola Social"
          subtitle="Etiqueta e Privacidade"
          icon={<MessageCircle className="w-8 h-8 text-green-400" />}
          color="green"
          isCompleted={completedMissions.includes('mission3')}
          onClick={() => navigateTo('mission3')}
        />
      </div>

      {allCompleted && (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-center shadow-lg shadow-cyan-900/20 transform hover:scale-105 transition-transform duration-300">
          <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Parabéns, Cyber Guardian!
          </h3>
          <p className="text-cyan-100 mb-6">
            Você completou todas as missões de treinamento. Você agora está
            preparado para navegar com segurança, identificar mentiras e
            respeitar a privacidade alheia.
          </p>
          <button className="bg-white text-cyan-700 px-6 py-2 rounded-full font-bold hover:bg-cyan-50 transition-colors">
            Baixar Certificado (Simulado)
          </button>
        </div>
      )}
    </div>
  );
}
