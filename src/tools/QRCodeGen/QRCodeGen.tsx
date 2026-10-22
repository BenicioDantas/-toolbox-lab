import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Check, QRCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCodeGen: React.FC = () => {
  const [text, setText] = useState('https://toolbox-lab.netlify.app');
  const [fgColor, setFgColor] = useState('#06b6d4'); // electricCyan
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'toolbox-lab-qr.png';
    link.href = url;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Gerador de QR Code</h1>
        <p className="text-gray-400">Crie códigos QR instantâneos para links, textos ou redes sociais.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Personalização</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Cor do Código</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Cor do Fundo</label>
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
          <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 relative">
            <label className="block text-sm font-medium text-gray-400 mb-3">Texto ou Link do QR Code</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://exemplo.com ou Qualquer Texto"
              className="w-full h-32 bg-graphite-900 border border-graphite-700 rounded-xl p-4 text-gray-200 outline-none focus:ring-2 focus:ring-electric-purple transition-all resize-none mb-6"
            />

            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl inline-block mx-auto w-fit shadow-2xl">
              <QRCodeCanvas
                id="qr-code-canvas"
                value={text || ' '}
                size={256}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadQR}
                className="flex items-center gap-2 px-6 py-3 bg-electric-cyan text-graphite-900 font-bold rounded-xl hover:bg-electric-cyan/90 transition-all active:scale-95"
              >
                <Download className="w-5 h-5" /> Baixar PNG
              </button>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-graphite-700 text-white font-bold rounded-xl hover:bg-graphite-600 transition-all active:scale-95"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copiado!' : 'Copiar Link'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
