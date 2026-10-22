import React, { useState } from 'react';
import { Copy, Trash2, Check, Sparkles } from 'lucide-react';

export const LoremGen: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    const output = Array(paragraphs).fill(LOREM_TEXT).join('\n\n');
    setResult(output);
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Gerador de Texto Exemplo</h1>
        <p className="text-gray-400">Crie rapidamente preenchimentos de texto para seus layouts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Configurações</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Quantidade de Parágrafos</label>
              <input
                type="number"
                min="1"
                max="50"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none focus:ring-2 focus:ring-electric-purple"
              />
            </div>
            <button
              onClick={generate}
              className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Gerar Texto
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 relative min-h-[300px]">
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-electric-cyan">Resultado</h3>
                  <button
                    onClick={copyText}
                    className="flex items-center gap-2 px-4 py-2 bg-graphite-700 rounded-lg text-sm font-medium hover:bg-graphite-600 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-serif italic">
                  {result}
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 text-center py-20">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>Configure a quantidade de parágrafos e clique em gerar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
