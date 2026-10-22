import React, { useState } from 'react';
import { Copy, RefreshCw, ShieldCheck, Check } from 'lucide-react';

export const PassGen: React.FC = () => {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    Object.entries(options).forEach(([key, value]) => {
      if (value) availableChars += charSets[key as keyof typeof charSets];
    });

    if (!availableChars) return;

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += availableChars[array[i] % availableChars.length];
    }
    setPassword(result);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length > 12) score++;
    if (length > 20) score++;
    if (Object.values(options).filter(Boolean).length >= 3) score++;
    if (Object.values(options).filter(Boolean).length === 4) score++;

    if (score <= 1) return { label: 'Fraca', color: 'text-red-500', bg: 'bg-red-500' };
    if (score <= 3) return { label: 'Média', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { label: 'Forte', color: 'text-green-500', bg: 'bg-green-500' };
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Gerador de Senhas</h1>
        <p className="text-gray-400">Crie chaves impenetráveis para sua segurança digital.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-electric-purple" /> Configurações
          </h3>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-gray-400">Comprimento: {length}</label>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-graphite-700 rounded-lg appearance-none cursor-pointer accent-electric-purple"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {Object.entries(options).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-4 bg-graphite-900 rounded-xl border border-graphite-700 cursor-pointer hover:border-electric-purple transition-colors">
                  <span className="text-sm font-medium text-gray-300 capitalize">
                    {key === 'uppercase' ? 'Maiúsculas' :
                     key === 'lowercase' ? 'Minúsculas' :
                     key === 'numbers' ? 'Números' : 'Símbolos'}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setOptions({...options, [key]: e.target.checked})}
                    className="w-5 h-5 rounded accent-electric-purple"
                  />
                </label>
              ))}
            </div>

            <button
              onClick={generatePassword}
              className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Gerar Senha
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {password ? (
            <div className="p-8 bg-graphite-800 border border-graphite-700 rounded-3xl relative overflow-hidden group animate-in fade-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-24 h-24 text-electric-purple" />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Sua senha segura:</p>
                <div className="p-4 bg-graphite-900 rounded-xl font-mono text-xl break-all border border-graphite-700 text-electric-cyan">
                  {password}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex-grow h-2 bg-graphite-700 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${getStrength().bg}`} style={{ width: getStrength().label === 'Forte' ? '100%' : getStrength().label === 'Média' ? '60%' : '30%' }} />
                </div>
                <span className={`text-xs font-bold uppercase ${getStrength().color}`}>{getStrength().label}</span>
              </div>

              <button
                onClick={copyPassword}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-graphite-700 rounded-xl text-sm font-medium hover:bg-graphite-600 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Senha'}
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-graphite-800/50 rounded-3xl border-2 border-dashed border-graphite-700 text-center">
              <div className="w-16 h-16 bg-graphite-800 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aguardando Geração</h3>
              <p className="text-gray-500">Configure as opções e gere sua senha impenetrável!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
