import React, { useState } from 'react';
import { Copy, RefreshCw, Check, User } from 'lucide-react';

export const RandomPicker: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const pickRandom = () => {
    const items = input
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    if (items.length === 0) {
      setResult('Por favor, insira ao menos um nome ou número.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    setResult(items[randomIndex]);
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Sorteador Aleatório</h1>
        <p className="text-gray-400">Sorteie números ou nomes de forma justa e instantânea.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Instruções</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Insira um item por linha. Pode ser uma lista de nomes, números ou qualquer texto.
          </p>
          <button
            onClick={() => setInput('')}
            className="w-full py-3 bg-graphite-700 text-gray-300 font-bold rounded-xl hover:bg-graphite-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Limpar Lista
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <label className="block text-sm font-medium text-gray-400 mb-3">Lista de Opções</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex:&#10;João&#10;Maria&#10;Pedro&#10;42"
              className="w-full h-64 bg-graphite-900 border border-graphite-700 rounded-xl p-4 text-gray-200 outline-none focus:ring-2 focus:ring-electric-purple transition-all resize-none"
            />
            <button
              onClick={pickRandom}
              className="w-full mt-6 py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" /> Sortear Agora!
            </button>
          </div>

          {result && (
            <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 text-center animate-in fade-in zoom-in-95 duration-500 relative">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Resultado do Sorteio</h3>
              <p className="text-3xl font-bold text-electric-purple mb-6 break-all">{result}</p>
              <button
                onClick={copyResult}
                className="mx-auto flex items-center gap-2 px-6 py-2 bg-graphite-700 rounded-lg text-sm font-medium hover:bg-graphite-600 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Resultado'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
