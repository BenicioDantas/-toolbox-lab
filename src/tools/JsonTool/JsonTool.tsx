import React, { useState } from 'react';
import { Copy, Trash2, Check, FileJson } from 'lucide-react';

export const JsonTool: React.FC = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setText(formatted);
      setError(null);
    } catch (e: any) {
      setError(`Erro de sintaxe: ${e.message}`);
    }
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Formatador de JSON</h1>
        <p className="text-gray-400">Valide e formate seus dados JSON para torná-los legíveis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Ações</h3>
          <div className="space-y-3">
            <button
              onClick={formatJson}
              className="w-full py-4 bg-electric-purple text-white font-bold rounded-2xl hover:bg-electric-purple/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FileJson className="w-5 h-5" /> Formatar e Validar
            </button>
            <button
              onClick={() => setText('')}
              className="w-full py-4 bg-graphite-700 text-gray-300 font-bold rounded-2xl hover:bg-graphite-600 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> Limpar Tudo
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 relative">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-400">Conteúdo JSON</label>
              {error && <span className="text-xs font-bold text-red-400 animate-pulse">{error}</span>}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Ex: { "nome": "Toolbox", "versao": "2.0" }'
              className={`w-full h-96 bg-graphite-900 border ${error ? 'border-red-500/50' : 'border-graphite-700'} rounded-xl p-4 font-mono text-sm text-gray-200 outline-none focus:ring-2 focus:ring-electric-purple transition-all resize-none`}
            />
            <button
              onClick={copyJson}
              className="absolute top-16 right-10 p-2 bg-graphite-700 text-gray-300 rounded-lg hover:bg-graphite-600 transition-colors"
              title="Copiar"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
