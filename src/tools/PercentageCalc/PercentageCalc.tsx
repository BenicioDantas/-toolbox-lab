import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Percent } from 'lucide-react';

export const PercentageCalc: React.FC = () => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<'percentage' | 'discount' | 'increase'>('percentage');
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);

    if (isNaN(v1) || isNaN(v2)) {
      setResult('Por favor, insira valores válidos.');
      return;
    }

    let res = '';
    if (mode === 'percentage') {
      // Quanto é X% de Y?
      const calc = (v1 / 100) * v2;
      res = `${v1}% de ${v2} é ${calc.toLocaleString('pt-BR')}`;
    } else if (mode === 'discount') {
      // Desconto de X% sobre Y
      const discount = (v1 / 100) * v2;
      const final = v2 - discount;
      res = `Desconto de ${v1}% sobre ${v2}: -${discount.toLocaleString('pt-BR')} = ${final.toLocaleString('pt-BR')}`;
    } else {
      // Aumento de X% sobre Y
      const increase = (v1 / 100) * v2;
      const final = v2 + increase;
      res = `Aumento de ${v1}% sobre ${v2}: +${increase.toLocaleString('pt-BR')} = ${final.toLocaleString('pt-BR')}`;
    }
    setResult(res);
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
        <h1 className="text-4xl font-extrabold mb-4">Calculadora de Porcentagem</h1>
        <p className="text-gray-400">Calcule porcentagens, descontos e aumentos de forma simples.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Tipo de Cálculo</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setMode('percentage')}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${mode === 'percentage' ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
            >
              Quanto é X% de Y?
            </button>
            <button
              onClick={() => setMode('discount')}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${mode === 'discount' ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
            >
              Calcular Desconto (%)
            </button>
            <button
              onClick={() => setMode('increase')}
              className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${mode === 'increase' ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
            >
              Calcular Aumento (%)
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">{mode === 'percentage' ? 'Porcentagem (%)' : 'Valor da taxa (%)'}</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                placeholder="Ex: 15"
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none focus:ring-2 focus:ring-electric-purple transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Valor Base</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                placeholder="Ex: 1000"
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none focus:ring-2 focus:ring-electric-purple transition-all"
              />
            </div>
            <button
              onClick={calculate}
              className="md:col-span-2 w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Percent className="w-5 h-5" /> Calcular Resultado
            </button>
          </div>

          {result && (
            <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Resultado</h3>
              <p className="text-2xl font-bold text-electric-cyan mb-6">{result}</p>
              <button
                onClick={copyResult}
                className="flex items-center gap-2 px-4 py-2 bg-graphite-700 rounded-lg text-sm font-medium hover:bg-graphite-600 transition-colors"
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
