import "./App.css";
import React, { useState } from "react";

import { Shield, Trophy } from "lucide-react";
import HomeScreen from "./components/HomeScreen";
import PasswordMission from "./components/missions/PasswordMission";
import FakeNewsMission from "./components/missions/FakeNewsMission";
import EtiquetteMission from "./components/missions/EtiquetteMission";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [completedMissions, setCompletedMissions] = useState([]);
  const [score, setScore] = useState(0);

  const completeMission = (missionId, points) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
      setScore(score + points);
    }
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header Global */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo("home")}
          >
            <div className="bg-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Cyber Guardian
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-slate-400">Progresso</span>
              <div className="w-32 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${(completedMissions.length / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-slate-700 px-4 py-1 rounded-full flex items-center gap-2 border border-slate-600">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="font-bold">{score} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Dinâmico */}
      <main className="max-w-4xl mx-auto p-6 md:py-10">
        {currentScreen === "home" && (
          <HomeScreen
            completedMissions={completedMissions}
            navigateTo={navigateTo}
          />
        )}
        {currentScreen === "mission1" && (
          <PasswordMission
            onComplete={() => completeMission("mission1", 100)}
            onExit={() => navigateTo("home")}
            isCompleted={completedMissions.includes("mission1")}
          />
        )}
        {currentScreen === "mission2" && (
          <FakeNewsMission
            onComplete={() => completeMission("mission2", 150)}
            onExit={() => navigateTo("home")}
            isCompleted={completedMissions.includes("mission2")}
          />
        )}
        {currentScreen === "mission3" && (
          <EtiquetteMission
            onComplete={() => completeMission("mission3", 120)}
            onExit={() => navigateTo("home")}
            isCompleted={completedMissions.includes("mission3")}
          />
        )}
      </main>

      <footer className="text-center p-6 text-slate-500 text-sm mt-10 border-t border-slate-800">
        <p>Desenvolvido como Recurso Educacional Aberto (REA)</p>
      </footer>
    </div>
  );
}
