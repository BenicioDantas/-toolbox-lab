import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Check, Lock, Unlock, Download } from 'lucide-react';

type PaletteMode = 'neon' | 'pastel' | 'cyberpunk' | 'natureza' | 'minimalista';

const MODE_CONFIGS: Record<PaletteMode, { colors: string[] }> = {
  neon: { colors: ['#FF00FF', '#00FFFF', '#FFFB00', '#00FF00', '#FF0000', '#0000FF'] },
  pastel: { colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F8BBD0'] },
  cyberpunk: { colors: ['#FCEE09', '#FF003C', '#00F0FF', '#B026FF', '#7000FF', '#00FF9F'] },
  natureza: { colors: ['#2D5A27', '#94B49F', '#D4A373', '#CCD5AE', '#E9EDC9', '#FEFAE0'] },
  minimalista: { colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161'] },
};

export const ColorLab: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>('cyberpunk');
  const [palette, setPalette] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generateColor = (modeSelected: PaletteMode) => {
    const colors = MODE_CONFIGS[modeSelected].colors;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const generatePalette = useCallback((selectedMode: PaletteMode = mode) => {
    const newPalette = Array.from({ length: 5 }, (_, i) => {
      if (locked[i]) return palette[i];
      return generateColor(selectedMode);
    });
    setPalette(newPalette);
  }, [mode, locked, palette]);

  React.useEffect(() => {
    generatePalette();
  }, []);

  const toggleLock = (index: number) => {
    const newLocked = [...locked];
    newLocked[index] = !locked[index];
    setLocked(newLocked);
  };

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyFullPalette = async () => {
    await navigator.clipboard.writeText(palette.join(', '));
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadCSS = () => {
    const css = palette.map((color, i) => `--color-accent-${i+1}: ${color};`).join('\n');
    const blob = new Blob([`:root {\n${css}\n}`], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'palette.css';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const calculateContrast = (hex1: string, hex2: string) => {
    const getLuminance = (hex: string) => {
      const rgb = hex.replace('#', '').match(/.{2}/g)!.map(x => {
        let v = parseInt(x, 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return ratio;
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Color Lab</h1>
        <p className="text-gray-400">Crie paletas futuristas com precisão de acessibilidade.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Modo de Cor</h3>
          <div className="grid grid-cols-1 gap-2">
            {(Object.keys(MODE_CONFIGS) as PaletteMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); generatePalette(m); }}
                className={`text-left px-4 py-2 rounded-xl text-sm transition-all capitalize ${mode === m ? 'bg-electric-purple text-white' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={() => generatePalette()}
            className="w-full py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Regenerar
          </button>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 h-64">
            {palette.map((color, i) => (
              <div
                key={i}
                className="relative group rounded-2xl overflow-hidden transition-all hover:scale-105 border border-graphite-700"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <button
                  onClick={() => toggleLock(i)}
                  className={`absolute top-2 right-2 p-1 rounded-md transition-colors ${locked[i] ? 'bg-white/80 text-black' : 'bg-black/20 text-white opacity-0 group-hover:opacity-100'}`}
                >
                  {locked[i] ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-graphite-900/80 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform text-center">
                  <p className="text-[10px] font-mono font-bold text-white">{color}</p>
                  <button
                    onClick={() => copyColor(color)}
                    className="text-[10px] text-electric-cyan hover:underline"
                  >
                    {copied === color ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 flex items-center gap-2">
              Análise de Contraste (WCAG)
            </h3>
            <div className="space-y-3">
              {palette.slice(0, 2).map((color, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-graphite-900 rounded-xl border border-graphite-700">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm font-mono text-gray-400">{color} vs Branco</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-200">
                      Ratio: {calculateContrast(color, '#FFFFFF').toFixed(2)}:1
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${calculateContrast(color, '#FFFFFF') >= 4.5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {calculateContrast(color, '#FFFFFF') >= 4.5 ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button
                onClick={copyFullPalette}
                className="flex items-center justify-center gap-2 py-3 bg-graphite-700 text-white font-bold rounded-xl hover:bg-graphite-600 transition-all"
              >
                {copied === 'all' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied === 'all' ? 'Copiado!' : 'Copiar Paleta'}
              </button>
              <button
                onClick={downloadCSS}
                className="flex items-center justify-center gap-2 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" /> Exportar CSS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
