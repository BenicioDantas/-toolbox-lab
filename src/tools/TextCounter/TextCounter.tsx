import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Check, FileText } from 'lucide-react';

export const TextCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readingTime = Math.ceil(wordCount / 200); // Média de 200 palavras por minuto

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Contador de Texto</h1>
        <p className="text-gray-400">Analise a extensão do seu conteúdo instantaneamente.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole ou digite seu texto aqui..."
              className="w-full h-64 bg-transparent text-lg text-gray-200 outline-none resize-none placeholder-gray-600"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setText('')}
                className="p-2 bg-graphite-700 text-gray-400 rounded-lg hover:text-red-400 transition-colors"
                title="Limpar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={copyText}
                className="flex items-center gap-2 px-4 py-2 bg-electric-purple text-white font-bold rounded-lg hover:bg-electric-purple/90 transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-electric-cyan" /> Estatísticas
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-graphite-900 rounded-xl">
                <span className="text-gray-400">Palavras</span>
                <span className="text-xl font-bold text-electric-cyan">{wordCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-graphite-900 rounded-xl">
                <span className="text-gray-400">Caracteres</span>
                <span className="text-xl font-bold text-electric-cyan">{charCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-graphite-900 rounded-xl">
                <span className="text-gray-400">Tempo de Leitura</span>
                <span className="text-xl font-bold text-electric-cyan">{readingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
