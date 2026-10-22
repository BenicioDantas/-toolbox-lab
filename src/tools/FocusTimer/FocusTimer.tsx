import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, BellOff } from 'lucide-react';

const PRESETS = [
  { label: 'Curto', minutes: 5 },
  { label: 'Foco Médio', minutes: 15 },
  { label: 'Pomodoro', minutes: 25 },
  { label: 'Foco Profundo', minutes: 50 },
];

export const FocusTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(PRESETS[2].minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      endTimeRef.current = Date.now() + timeLeft * 1000;

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.round((endTimeRef.current! - now) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsActive(false);
          if (!isMuted) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Tempo Esgotado!', {
                body: 'Hora de fazer uma pausa ou mudar de tarefa.',
                icon: '/vite.svg'
              });
            } else if ('Notification' in window && Notification.permission !== 'denied') {
              Notification.requestPermission();
            }
          }
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isMuted]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (minutes: number = PRESETS[2].minutes) => {
    setIsActive(false);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Temporizador de Foco</h1>
        <p className="text-gray-400">Elimine distrações e foque no que realmente importa.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12">
        {/* Timer Display */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="50%" cy="50%" r="48%"
              className="stroke-graphite-700 fill-none"
              strokeWidth="8"
            />
            <circle
              cx="50%" cy="50%" r="48%"
              className="stroke-electric-cyan fill-none transition-all duration-1000"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 0.48 * 100}%`}
              strokeDashoffset={`${(1 - (timeLeft / (PRESETS[2].minutes * 60))) * 2 * Math.PI * 0.48 * 100}%`}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-7xl md:text-9xl font-mono font-bold text-white z-10">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`px-10 py-4 rounded-2xl font-bold text-xl transition-all active:scale-95 flex items-center gap-3 ${
              isActive
              ? 'bg-graphite-700 text-white hover:bg-graphite-600'
              : 'bg-electric-purple text-white hover:bg-electric-purple/90 shadow-lg shadow-electric-purple/20'
            }`}
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>

          <button
            onClick={() => resetTimer()}
            className="px-6 py-4 bg-graphite-800 text-gray-400 rounded-2xl font-bold hover:bg-graphite-700 transition-all active:scale-95 flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" /> Reiniciar
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all active:scale-95 ${
              isMuted ? 'bg-red-500/20 text-red-400' : 'bg-graphite-800 text-gray-400 hover:bg-graphite-700'
            }`}
          >
            {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap justify-center gap-3">
          {PRESETS.map(preset => (
            <button
              key={preset.label}
              onClick={() => resetTimer(preset.minutes)}
              className="px-4 py-2 bg-graphite-800 border border-graphite-700 rounded-xl text-sm font-medium hover:border-electric-cyan transition-all active:scale-95"
            >
              {preset.label} ({preset.minutes}m)
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
