import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, Trophy, Timer } from 'lucide-react';

export const ReflexTest: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'click'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    // Random delay between 2 and 5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;

    timerRef.current = setTimeout(() => {
      setGameState('click');
      setStartTime(Date.now());
    }, delay);
  };

  const handleScreenClick = () => {
    if (gameState === 'idle') return;

    if (gameState === 'waiting') {
      // Clicked too early!
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('idle');
      alert('Muito cedo! Aguarde o sinal verde.');
    } else if (gameState === 'click') {
      const endTime = Date.now();
      const diff = endTime - startTime;
      setReactionTime(diff);
      setGameState('idle');

      if (bestTime === null || diff < bestTime) {
        setBestTime(diff);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Teste de Reflexo</h1>
        <p className="text-gray-400">Meça a velocidade de reação do seu cérebro em milissegundos.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8">
        <div
          onClick={handleScreenClick}
          className={`relative w-full max-w-2xl h-80 rounded-3xl border-4 cursor-pointer transition-all duration-100 flex flex-col items-center justify-center text-center p-8 shadow-2xl ${
            gameState === 'idle' ? 'bg-graphite-800 border-graphite-700' :
            gameState === 'waiting' ? 'bg-red-500/20 border-red-500' :
            'bg-green-500 border-green-400 scale-[1.02]'
          }`}
        >
          {gameState === 'idle' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <Zap className="w-16 h-16 text-electric-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Pronto para o desafio?</h2>
              <p className="text-gray-400 mb-6">Clique no quadro para começar.</p>
              <button className="px-8 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all active:scale-95">
                Iniciar Teste
              </button>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-4 animate-ping" />
              <h2 className="text-3xl font-black text-white uppercase tracking-widest">Aguarde...</h2>
              <p className="text-red-200 mt-2 font-medium">Clique assim que ficar VERDE!</p>
            </div>
          )}

          {gameState === 'click' && (
            <div className="animate-in zoom-in duration-75">
              <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">CLIQUE AGORA!</h2>
              <div className="mt-4 text-green-100 font-bold text-xl">Rápido!</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6 text-electric-cyan" />
              <span className="text-gray-400 font-medium">Última Reação</span>
            </div>
            <span className="text-2xl font-mono font-bold text-white">
              {reactionTime ? `${reactionTime}ms` : '--'}
            </span>
          </div>

          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-gray-400 font-medium">Melhor Tempo</span>
            </div>
            <span className="text-2xl font-mono font-bold text-white">
              {bestTime ? `${bestTime}ms` : '--'}
            </span>
          </div>
        </div>

        <button
          onClick={() => { setReactionTime(null); setBestTime(null); setGameState('idle'); }}
          className="flex items-center gap-2 px-6 py-3 bg-graphite-700 text-gray-300 rounded-xl hover:bg-graphite-600 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Resetar Recordes
        </button>
      </div>
    </div>
  );
};
