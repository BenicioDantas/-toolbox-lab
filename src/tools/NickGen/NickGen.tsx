import React, { useState } from 'react';
import { Copy, RefreshCw, Sparkles, Check } from 'lucide-react';

type Category = 'Futurista' | 'Engraçado' | 'Competitivo' | 'Misterioso';

const NICK_BASES: Record<Category, string[]> = {
  Futurista: ['Nova', 'Cypher', 'Zenith', 'Quantum', 'Astra', 'Void', 'Neon', 'Hyper', 'Kalyps', 'Xeno'],
  Engraçado: ['Batata', 'Tostada', 'Capivara', 'Pão', 'Salsicha', 'Meme', ' laura', 'Kebab', 'Tofu', 'Nuvem'],
  Competitivo: ['Slayer', 'Apex', 'Prime', 'Ghost', 'Wraith', 'Nova', 'Titan', 'Fury', 'Vortex', 'Savage'],
  Misterioso: ['Umbra', 'Silent', 'Eclipse', 'Phantom', 'Shadow', 'Mystic', 'Arcane', 'Luna', 'Nox', 'Veil'],
};

const NICK_SUFFIXES: string[] = ['X', 'Pro', 'God', 'YT', 'zZ', 'Lord', 'King', 'Master', 'Sama', 'Zero'];

export const NickGen: React.FC = () => {
  const [category, setCategory] = useState<Category>('Competitivo');
  const [customWord, setCustomWord] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    const results: string[] = [];
    const bases = NICK_BASES[category];

    for (let i = 0; i < 6; i++) {
      const base = bases[Math.floor(Math.random() * bases.length)];
      const suffix = NICK_SUFFIXES[Math.floor(Math.random() * NICK_SUFFIXES.length)];
      const word = customWord.trim();

      let nick = '';
      if (word) {
        nick = `${base}_${word}_${suffix}`;
      } else {
        const coinFlip = Math.random() > 0.5;
        nick = coinFlip ? `${base}${suffix}` : `${base}_${suffix}`;
      }

      // Random capitalization variations
      if (Math.random() > 0.7) nick = nick.toUpperCase();
      else if (Math.random() > 0.7) nick = nick.toLowerCase();

      results.push(nick);
    }
    setSuggestions(results);
  };

  const copyNick = async (nick: string, idx: number) => {
    await navigator.clipboard.writeText(nick);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Gerador de Nicks Gamer</h1>
        <p className="text-gray-400">Crie identidades únicas para dominar o servidor!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration */}
        <div className="lg:col-span-1 bg-graphite-800 p-8 rounded-3xl border border-graphite-700 h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-electric-purple" /> Configurações
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Estilo do Nick</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(NICK_BASES) as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      category === cat
                      ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
                      : 'bg-graphite-900 text-gray-500 hover:text-gray-300 border border-graphite-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Palavra Opcional</label>
              <input
                type="text"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="Ex: Dragon, Fire..."
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl focus:ring-2 focus:ring-electric-purple outline-none transition-all"
              />
            </div>

            <button
              onClick={generate}
              className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Gerar Nicks
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {suggestions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-graphite-800/50 rounded-3xl border-2 border-dashed border-graphite-700 text-center">
              <div className="w-16 h-16 bg-graphite-800 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aguardando Comando</h3>
              <p className="text-gray-500">Configure seu estilo e clique em gerar para ver as sugestões.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((nick, i) => (
                <div
                  key={i}
                  className="p-4 bg-graphite-800 border border-graphite-700 rounded-2xl flex items-center justify-between group hover:border-electric-purple transition-all"
                >
                  <span className="font-mono text-lg font-bold text-gray-200">{nick}</span>
                  <button
                    onClick={() => copyNick(nick, i)}
                    className="p-2 bg-graphite-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedIdx === i ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
