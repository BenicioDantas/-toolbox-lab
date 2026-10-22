import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Check } from 'lucide-react';

export const StopwatchTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Cronômetro e Timer</h1>
        <p className="text-gray-400">Meça seu tempo com precisão de centésimos de segundo.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center bg-graphite-800 rounded-full border-8 border-graphite-700 shadow-2xl">
          <div className="text-6xl md:text-8xl font-mono font-black text-white">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-10 py-4 rounded-2xl font-bold text-xl transition-all active:scale-95 flex items-center gap-3 ${
              isActive ? 'bg-graphite-700 text-white' : 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
            }`}
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>

          <button
            onClick={handleLap}
            disabled={!isActive}
            className="px-6 py-4 bg-graphite-800 text-gray-300 rounded-2xl font-bold hover:bg-graphite-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
          >
            <Check className="w-6 h-6" /> Volta
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-4 bg-graphite-800 text-gray-400 rounded-2xl font-bold hover:bg-graphite-700 transition-all active:scale-95 flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" /> Reiniciar
          </button>
        </div>

        {laps.length > 0 && (
          <div className="w-full max-w-md bg-graphite-800 rounded-3xl border border-graphite-700 overflow-hidden">
            <div className="p-4 bg-graphite-700 text-sm font-bold uppercase text-gray-400">Voltas</div>
            <div className="max-h-60 overflow-y-auto">
              {laps.map((lap, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-graphite-700 hover:bg-graphite-900 transition-colors">
                  <span className="text-gray-500 font-medium">Volta {laps.length - i}</span>
                  <span className="font-mono font-bold text-electric-cyan">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
