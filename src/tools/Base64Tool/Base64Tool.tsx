import React, { useState } from 'react';
import { Copy, RefreshCw, Check, ArrowLeftRight } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setResult(btoa(unescape(encodeURIComponent(text))));
      } else {
        setResult(decodeURIComponent(escape(atob(text))));
      }
    } catch (e) {
      setResult('Erro: Texto inválido para a operação selecionada.');
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Base64 Codec</h1>
        <p className="text-gray-400">Codifique e decodifique textos em Base64 de forma segura e local.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Modo de Operação</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'encode' ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20' : 'bg-graphite-900 text-gray-500 hover:text-gray-300 border border-graphite-700'}`}
            >
              Codificar
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'decode' ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20' : 'bg-graphite-900 text-gray-500 hover:text-gray-300 border border-graphite-700'}`}
            >
              Decodificar
            </button>
          </div>
          <button
            onClick={handleConvert}
            className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeftRight className="w-5 h-5" /> Converter Agora
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <label className="block text-sm font-medium text-gray-400 mb-3">Entrada</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={mode === 'encode' ? "Digite o texto para codificar..." : "Cole o código Base64 para decodificar..."}
              className="w-full h-40 bg-graphite-900 border border-graphite-700 rounded-xl p-4 text-gray-200 outline-none focus:ring-2 focus:ring-electric-purple transition-all resize-none"
            />
          </div>

          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 relative">
            <label className="block text-sm font-medium text-gray-400 mb-3">Resultado</label>
            <div className="w-full min-h-[160px] bg-graphite-900 border border-graphite-700 rounded-xl p-4 text-electric-cyan font-mono break-all">
              {result || <span className="text-gray-600 italic">O resultado aparecerá aqui...</span>}
            </div>
            {result && (
              <button
                onClick={copyResult}
                className="absolute top-16 right-6 p-2 bg-graphite-700 text-gray-300 rounded-lg hover:bg-graphite-600 transition-colors"
                title="Copiar Resultado"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
