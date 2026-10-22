import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff, AlertCircle } from 'lucide-react';

type ContrastResult = {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
};

export const ContrastChecker: React.FC = () => {
  const [fgColor, setFgColor] = useState('#a855f7'); // electricPurple
  const [bgColor, setBgColor] = useState('#121212'); // graphite900
  const [copied, setCopied] = useState(false);

  const getLuminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map(x => {
      let v = parseInt(x, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const calculateContrast = (color1: string, color2: string): ContrastResult => {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  };

  const result = calculateContrast(fgColor, bgColor);

  const copyReport = async () => {
    const report = `Contraste de Cores (TOOLBOX LAB):
Cor Principal: ${fgColor}
Fundo: ${bgColor}
Razão: ${result.ratio.toFixed(2)}:1
WCAG AA: ${result.aaNormal ? '✅ Passou' : '❌ Falhou'}
WCAG AAA: ${result.aaaNormal ? '✅ Passou' : '❌ Falhou'}`;

    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Verificador de Contraste</h1>
        <p className="text-gray-400">Valide a acessibilidade e legibilidade de suas combinações de cores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Cores de Análise</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Cor do Texto</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-12 bg-transparent cursor-pointer rounded-lg"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-grow px-3 py-2 bg-graphite-900 border border-graphite-700 rounded-xl text-sm font-mono text-gray-300 outline-none focus:ring-2 focus:ring-electric-purple"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Cor do Fundo</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 bg-transparent cursor-pointer rounded-lg"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-grow px-3 py-2 bg-graphite-900 border border-graphite-700 rounded-xl text-sm font-mono text-gray-300 outline-none focus:ring-2 focus:ring-electric-purple"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 text-center">
            <div
              className="p-12 rounded-2xl mb-8 transition-all duration-300"
              style={{ backgroundColor: bgColor, color: fgColor }}
            >
              <h2 className="text-4xl font-bold mb-4">Exemplo de Texto</h2>
              <p className="text-lg opacity-90">
                Este é um exemplo de como seu texto aparecerá sobre o fundo escolhido.
                Verifique se a leitura é confortável e clara.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border ${result.ratio >= 7 ? 'border-green-500/50 bg-green-500/10' : 'border-graphite-700 bg-graphite-900'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Razão</p>
                <p className="text-2xl font-black text-white">{result.ratio.toFixed(2)}:1</p>
              </div>
              <div className={`p-4 rounded-2xl border ${result.aaNormal ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">WCAG AA</p>
                <p className={`text-lg font-bold ${result.aaNormal ? 'text-green-400' : 'text-red-400'}`}>
                  {result.aaNormal ? 'Aprovado' : 'Falhou'}
                </p>
              </div>
              <div className={`p-4 rounded-2xl border ${result.aaaNormal ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">WCAG AAA</p>
                <p className={`text-lg font-bold ${result.aaaNormal ? 'text-green-400' : 'text-red-400'}`}>
                  {result.aaaNormal ? 'Aprovado' : 'Falhou'}
                </p>
              </div>
            </div>

            <button
              onClick={copyReport}
              className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-graphite-700 text-white font-bold rounded-xl hover:bg-graphite-600 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Relatório Copiado!' : 'Copiar Relatório de Acessibilidade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
