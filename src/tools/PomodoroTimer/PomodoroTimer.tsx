import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, BellOff, Coffee, Brain } from 'lucide-react';

type SessionType = 'focus' | 'shortBreak' | 'longBreak';

export const PomodoroTimer: React.FC = () => {
  const [session, setSession] = useState<SessionType>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const SESSION_TIMES = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    if (isActive) {
      endTimeRef.current = Date.now() + timeLeft * 1000;
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.round((endTimeRef.current! - now) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsActive(false);
          handleSessionEnd();
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
  }, [isActive]);

  const handleSessionEnd = () => {
    if (!isMuted) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Sessão Finalizada!', {
          body: session === 'focus' ? 'Hora de descansar!' : 'Hora de voltar ao foco!',
        });
      }
    }

    if (session === 'focus') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % 4 === 0) {
        setSession('longBreak');
        setTimeLeft(SESSION_TIMES.longBreak);
      } else {
        setSession('shortBreak');
        setTimeLeft(SESSION_TIMES.shortBreak);
      }
    } else {
      setSession('focus');
      setTimeLeft(SESSION_TIMES.focus);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(SESSION_TIMES[session]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionColor = () => {
    switch (session) {
      case 'focus': return 'text-electric-purple border-electric-purple shadow-electric-purple/20';
      case 'shortBreak': return 'text-electric-cyan border-electric-cyan shadow-electric-cyan/20';
      case 'longBreak': return 'text-blue-400 border-blue-400 shadow-blue-400/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Pomodoro Timer</h1>
        <p className="text-gray-400">Maximize sua produtividade com ciclos de foco e descanso.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12">
        <div className={`relative w-72 h-72 md:w-96 md:h-96 flex flex-col items-center justify-center rounded-full border-8 transition-all duration-500 ${getSessionColor()} bg-graphite-800 shadow-2xl`}>
          <div className="flex items-center gap-2 mb-2 uppercase tracking-widest text-xs font-bold opacity-70">
            {session === 'focus' ? <Brain className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
            {session === 'focus' ? 'Foco' : session === 'shortBreak' ? 'Pausa Curta' : 'Pausa Longa'}
          </div>
          <div className="text-7xl md:text-9xl font-mono font-black text-white z-10">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`px-10 py-4 rounded-2xl font-bold text-xl transition-all active:scale-95 flex items-center gap-3 ${
              isActive ? 'bg-graphite-700 text-white' : 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
            }`}
          >
            {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>

          <button
            onClick={resetTimer}
            className="px-6 py-4 bg-graphite-800 text-gray-400 rounded-2xl font-bold hover:bg-graphite-700 transition-all active:scale-95 flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" /> Reiniciar
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all active:scale-95 ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-graphite-800 text-gray-400 hover:bg-graphite-700'}`}
          >
            {isMuted ? <BellOff className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
          </button>
        </div>

        <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 flex items-center gap-6 shadow-xl">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-bold uppercase mb-1">Ciclos Completos</p>
            <p className="text-3xl font-black text-electric-cyan">{cycles}</p>
          </div>
          <div className="w-px h-10 bg-graphite-700" />
          <div className="text-left">
            <p className="text-gray-400 text-sm italic">
              {cycles === 0 ? "Comece sua primeira sessão de foco!" :
               cycles % 4 === 0 && cycles !== 0 ? "Você merece a pausa longa agora!" :
               "Mantenha o ritmo. Próxima pausa em breve."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
