import React, { useState } from 'react';
import { Copy, Trash2, Check, Sparkles } from 'lucide-react';

const GLITCH_MAPS: Record<string, Record<string, string>> = {
  cyberpunk: {
    'a': 'Δ', 'e': 'Σ', 'i': '∫', 'o': 'Φ', 'u': 'μ',
    's': '§', 't': '†', 'r': 'Я', 'n': 'Π', 'm': 'ʍ',
    'A': 'Δ', 'E': 'Σ', 'I': '∫', 'O': 'Φ', 'U': 'μ',
    'S': '§', 'T': '†', 'R': 'Я', 'N': 'Π', 'M': 'ʍ',
  },
  glitch: {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 'u': '|_|',
    's': '5', 't': '7', 'r': '2', 'n': 'и', 'm': 'rn',
    'A': '4', 'E': '3', 'I': '1', 'O': '0', 'U': '|_|',
    'S': '5', 'T': '7', 'R': '2', 'N': 'И', 'M': 'RN',
  },
  decor: {
    ' ': ' ✧ ', 'a': ' a ', 'e': ' e ', 'i': ' i ', 'o': ' o ', 'u': ' u ',
  },
};

const EXAMPLES = [
  'SISTEMA COMPROMETIDO',
  'CYBERPUNK 2077',
  'ERROR 404 NOT FOUND',
  'TOOLBOX LAB 2.0',
];

export const GlitchText: React.FC = () => {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('cyberpunk');
  const [copied, setCopied] = useState(false);

  const applyGlitch = (input: string, styleKey: string) => {
    if (styleKey === 'original') return input;

    const map = GLITCH_MAPS[styleKey] || {};
    return input.split('').map(char => map[char] || char).join('');
  };

  const handleExample = (ex: string) => setText(ex);

  const copyText = async () => {
    const glitched = applyGlitch(text, style);
    await navigator.clipboard.writeText(glitched);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Glitch Text</h1>
        <p className="text-gray-400">Transforme textos comuns em arte cyberpunk distorcida.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Estilos de Distorção</h3>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(GLITCH_MAPS).concat('original')).map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`text-left px-4 py-2 rounded-xl text-sm transition-all capitalize ${style === s ? 'bg-electric-purple text-white' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
                >
                  {s === 'original' ? 'Original' : s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Exemplos Rápidos</h3>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => handleExample(ex)}
                  className="px-3 py-1 bg-graphite-900 border border-graphite-700 rounded-lg text-xs text-gray-400 hover:text-electric-cyan transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite seu texto aqui..."
              className="w-full h-32 bg-transparent text-xl font-medium text-gray-200 outline-none resize-none placeholder-gray-600"
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono">
              {text.length} caracteres
            </div>
            <button
              onClick={() => setText('')}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-400 transition-colors"
              title="Limpar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-graphite-900 p-8 rounded-3xl border-2 border-dashed border-graphite-700 min-h-[150px] relative group">
            <div className="absolute top-4 left-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Prévia do Resultado</div>
            <div className="text-3xl font-mono text-electric-cyan break-all mt-4 animate-pulse">
              {applyGlitch(text, style)}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={copyText}
                disabled={!text}
                className="flex items-center gap-2 px-6 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all active:scale-95 disabled:opacity-50"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Texto Glitch'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300/80 leading-relaxed">
              Nota: A visualização de caracteres especiais pode variar dependendo do sistema operacional e da fonte utilizada no dispositivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
