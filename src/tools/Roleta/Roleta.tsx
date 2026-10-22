import React, { useState } from 'react';
import { RotateCw, Copy, Plus, Trash2, Check } from 'lucide-react';

export const Roleta: React.FC = () => {
  const [options, setOptions] = useState<string[]>(['Pizza', 'Hambúrguer', 'Sushi', 'Salada']);
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [copied, setCopied] = useState(false);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentOption(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setCurrentOption(options[randomIndex]);
      setIsSpinning(false);
    }, 2000);
  };

  const addOption = () => {
    if (newOption.trim() && options.length < 20) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const copyResult = async () => {
    if (currentOption) {
      await navigator.clipboard.writeText(`O resultado da roleta foi: ${currentOption}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Roleta de Decisões</h1>
        <p className="text-gray-400">Adicione suas opções e deixe a sorte decidir!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Roulette Visualization */}
        <div className="flex flex-col items-center justify-center p-8 bg-graphite-800 rounded-3xl border border-graphite-700">
          <div className={`relative w-64 h-64 rounded-full border-8 border-graphite-700 flex items-center justify-center transition-transform duration-[2000ms] ease-out ${isSpinning ? 'rotate-[1800deg]' : 'rotate-0'}`}
               style={{ transitionTimingFunction: 'cubic-bezier(0.15, 0, 0.15, 1)' }}>
            <div className="absolute w-full h-full rounded-full overflow-hidden">
              {options.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 w-1 h-full bg-electric-purple origin-bottom"
                  style={{ transform: `translateX(-50%) rotate(${ (360/options.length) * i }deg)` }}
                />
              ))}
            </div>
            <div className="z-10 w-16 h-16 bg-graphite-900 rounded-full border-4 border-electric-cyan flex items-center justify-center shadow-xl">
              <RotateCw className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={spin}
              disabled={isSpinning}
              className="px-8 py-4 bg-electric-purple text-white font-bold rounded-2xl hover:bg-electric-purple/90 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-electric-purple/20"
            >
              {isSpinning ? 'Girando...' : 'Girar Roleta!'}
            </button>

            {currentOption && !isSpinning && (
              <div className="mt-8 animate-bounce">
                <p className="text-gray-400 text-sm mb-1">Resultado:</p>
                <h2 className="text-3xl font-bold text-electric-cyan mb-4">{currentOption}</h2>
                <button
                  onClick={copyResult}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-graphite-700 rounded-lg text-xs font-medium hover:bg-graphite-600 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar Resultado'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Options Management */}
        <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-electric-purple" /> Opções
          </h3>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
              placeholder="Nova opção..."
              className="flex-grow px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl focus:ring-2 focus:ring-electric-purple outline-none transition-all"
            />
            <button
              onClick={addOption}
              className="p-3 bg-electric-purple text-white rounded-xl hover:bg-electric-purple/90 transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-graphite-900 rounded-xl border border-graphite-700 group">
                <span className="text-gray-300">{opt}</span>
                <button
                  onClick={() => removeOption(i)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
