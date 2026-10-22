import React, { useState } from 'react';
import { Copy, RefreshCw, Check, Ruler } from 'lucide-react';

type UnitType = 'comprimento' | 'peso' | 'temperatura' | 'volume';

const UNITS: Record<UnitType, Record<string, number>> = {
  comprimento: { 'Metros': 1, 'Quilômetros': 0.001, 'Centímetros': 100, 'Milímetros': 1000, 'Polegadas': 39.3701, 'Pés': 3.28084 },
  peso: { 'Quilos': 1, 'Gramas': 1000, 'Libras': 2.20462, 'Onças': 35.274 },
  temperatura: { 'Celsius': 1, 'Fahrenheit': 1, 'Kelvin': 1 }, // Temperatura requer lógica especial
  volume: { 'Litros': 1, 'Mililitros': 1000, 'Galões (US)': 0.264172, 'Xícaras': 4.22675 },
};

export const UnitConverter: React.FC = () => {
  const [type, setType] = useState<UnitType>('comprimento');
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState('Metros');
  const [toUnit, setToUnit] = useState('Quilômetros');
  const [result, setResult] = useState<string>('');

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Valor inválido');
      return;
    }

    if (type === 'temperatura') {
      let celsius = 0;
      if (fromUnit === 'Celsius') celsius = numValue;
      else if (fromUnit === 'Fahrenheit') celsius = (numValue - 32) * 5 / 9;
      else if (fromUnit === 'Kelvin') celsius = numValue - 273.15;

      let finalValue = 0;
      if (toUnit === 'Celsius') finalValue = celsius;
      else if (toUnit === 'Fahrenheit') finalValue = (celsius * 9 / 5) + 32;
      else if (toUnit === 'Kelvin') finalValue = celsius + 273.15;

      setResult(finalValue.toFixed(4));
      return;
    }

    const units = UNITS[type];
    const valueInBase = numValue / units[fromUnit];
    const finalValue = valueInBase * units[toUnit];
    setResult(finalValue.toFixed(4));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Conversor de Unidades</h1>
        <p className="text-gray-400">Converta medidas de comprimento, peso, temperatura e volume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Tipo de Medida</h3>
          <div className="flex flex-col gap-2">
            {(Object.keys(UNITS) as UnitType[]).map(t => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  const keys = Object.keys(UNITS[t]);
                  setFromUnit(keys[0]);
                  setToUnit(keys[1] || keys[0]);
                }}
                className={`text-left px-4 py-2 rounded-xl text-sm transition-all capitalize ${type === t ? 'bg-electric-purple text-white' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-graphite-800 p-8 rounded-3xl border border-graphite-700 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">De:</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none focus:ring-2 focus:ring-electric-purple transition-all"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none text-gray-300"
              >
                {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">Para:</label>
              <div className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl text-electric-cyan font-bold text-lg h-[52px] flex items-center">
                {result || '...'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 bg-graphite-900 border border-graphite-700 rounded-xl outline-none text-gray-300"
              >
                {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Converter Agora
          </button>
        </div>
      </div>
    </div>
  );
};
