import React, { useState } from 'react';
import { Copy, Share2, Check, ArrowLeft } from 'lucide-react';

type Profile = {
  name: string;
  description: string;
  traits: string[];
  color: string;
};

const PROFILES: Record<string, Profile> = {
  NEON_PIONEER: {
    name: 'Pioneiro Neon',
    description: 'Você é a vanguarda da cultura digital. Ama experimentar novas tecnologias e tendências antes de todo mundo.',
    traits: ['Inovador', 'Curioso', 'Ousado', 'Tecnológico'],
    color: 'text-electric-cyan',
  },
  ZEN_CODER: {
    name: 'Coder Zen',
    description: 'Equilíbrio perfeito entre lógica e calma. Você resolve problemas complexos com serenidade e precisão.',
    traits: ['Analítico', 'Paciente', 'Focado', 'Minimalista'],
    color: 'text-blue-400',
  },
  CHAOS_ENGINEER: {
    name: 'Engenheiro do Caos',
    description: 'Você prospera na imprevisibilidade. Adora quebrar coisas para entender como consertá-las.',
    traits: ['Criativo', 'Imprevisível', 'Rápido', 'Experimental'],
    color: 'text-electric-purple',
  },
  CYBER_GHOST: {
    name: 'Fantasma Cyber',
    description: 'Discreto, eficiente e misterioso. Você prefere operar nas sombras e entregar resultados impecáveis.',
    traits: ['Observador', 'Independente', 'Sutil', 'Enigmático'],
    color: 'text-gray-400',
  },
  PIXEL_ARTIST: {
    name: 'Artista de Pixels',
    description: 'Para você, a estética é tudo. Transforma a frieza do código em experiências visuais deslumbrantes.',
    traits: ['Visual', 'Detalhista', 'Sensível', 'Inovador'],
    color: 'text-pink-500',
  },
  DATA_ORACLE: {
    name: 'Oráculo de Dados',
    description: 'Você vê padrões onde outros veem ruído. Suas decisões são guiadas por fatos e evidências.',
    traits: ['Lógico', 'Estratégico', 'Preciso', 'Sábio'],
    color: 'text-green-400',
  },
  VOID_WALKER: {
    name: 'Caminhante do Vazio',
    description: 'Questionador e filosófico. Você busca o significado por trás da interface e do sistema.',
    traits: ['Pensador', 'Introspectivo', 'Profundo', 'Idealista'],
    color: 'text-indigo-500',
  },
  GLITCH_MASTER: {
    name: 'Mestre do Glitch',
    description: 'Você encontra beleza no erro. Transforma falhas em arte e bugs em funcionalidades.',
    traits: ['Irônico', 'Adaptável', 'Original', 'Descontraído'],
    color: 'text-yellow-400',
  },
};

const QUESTIONS = [
  {
    text: 'Qual é a sua abordagem ao iniciar um projeto novo?',
    options: [
      { text: 'Sigo um plano rigoroso e documentado', weight: 'ZEN_CODER' },
      { text: 'Vou testando e vendo o que acontece', weight: 'CHAOS_ENGINEER' },
      { text: 'Pesquiso as tendências mais recentes', weight: 'NEON_PIONEER' },
      { text: 'Tento criar algo visualmente único', weight: 'PIXEL_ARTIST' },
    ],
  },
  {
    text: 'Como você reage a um erro inesperado no código?',
    options: [
      { text: 'Analiso calmamente a causa raiz', weight: 'DATA_ORACLE' },
      { text: 'Tento consertar rápido com um "hack"', weight: 'GLITCH_MASTER' },
      { text: 'Fico intrigado com o comportamento do erro', weight: 'VOID_WALKER' },
      { text: 'Sigo a documentação oficial', weight: 'ZEN_CODER' },
    ],
  },
  {
    text: 'Seu ambiente de trabalho ideal é...',
    options: [
      { text: 'Luzes neon, música lo-fi e várias telas', weight: 'NEON_PIONEER' },
      { text: 'Silêncio absoluto e minimalismo', weight: 'ZEN_CODER' },
      { text: 'Um caos organizado de anotações e gadgets', weight: 'CHAOS_ENGINEER' },
      { text: 'Um café aconchegante com luz natural', weight: 'PIXEL_ARTIST' },
    ],
  },
  {
    text: 'O que mais te atrai em uma nova ferramenta?',
    options: [
      { text: 'A eficiência e a performance', weight: 'DATA_ORACLE' },
      { text: 'O design e a experiência do usuário', weight: 'PIXEL_ARTIST' },
      { text: 'A possibilidade de customização total', weight: 'CYBER_GHOST' },
      { text: 'A inovação e a "mágica" por trás dela', weight: 'VOID_WALKER' },
    ],
  },
  {
    text: 'Como você prefere colaborar em equipe?',
    options: [
      { text: 'Liderando a visão estratégica', weight: 'NEON_PIONEER' },
      { text: 'Trabalhando sozinho nos detalhes técnicos', weight: 'CYBER_GHOST' },
      { text: 'Sendo o mediador e organizador', weight: 'ZEN_CODER' },
      { text: 'Trazendo ideias disruptivas e engraçadas', weight: 'GLITCH_MASTER' },
    ],
  },
];

export const VibeQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Profile | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnswer = (weight: string) => {
    const newAnswers = [...answers, weight];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const counts: Record<string, number> = {};
    finalAnswers.forEach(weight => {
      counts[weight] = (counts[weight] || 0) + 1;
    });

    let maxWeight = '';
    let maxCount = -1;

    for (const weight in counts) {
      if (counts[weight] > maxCount) {
        maxCount = counts[weight];
        maxWeight = weight;
      }
    }

    setResult(PROFILES[maxWeight]);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Minha vibe digital no Toolbox Lab é: ${result.name}! ${result.description} #ToolboxLab`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `Minha vibe digital no Toolbox Lab é: ${result.name}! ${result.description}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Vibe Digital',
          text: text,
          url: window.location.href,
        });
      } catch (e) {
        console.log('Share failed', e);
      }
    } else {
      copyResult();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Qual é sua Vibe?</h1>
        <p className="text-gray-400">Descubra sua personalidade digital através deste quiz rápido.</p>
      </div>

      {!result ? (
        <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 shadow-xl">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-graphite-900 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-electric-purple transition-all duration-500"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{QUESTIONS[currentStep].text}</h2>
            <div className="grid grid-cols-1 gap-3">
              {QUESTIONS[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.weight)}
                  className="w-full text-left px-6 py-4 bg-graphite-900 border border-graphite-700 rounded-2xl hover:border-electric-purple hover:bg-graphite-700 transition-all text-gray-300 hover:text-white"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-300 disabled:opacity-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
            <span className="text-gray-600 text-sm font-medium">
              Pergunta {currentStep + 1} de {QUESTIONS.length}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className={`text-5xl font-black mb-4 ${result.color}`}>
            {result.name}
          </div>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">{result.description}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {result.traits.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-graphite-900 border border-graphite-700 rounded-full text-xs font-medium text-gray-400">
                {trait}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={restart}
              className="px-6 py-3 bg-graphite-700 text-white font-bold rounded-xl hover:bg-graphite-600 transition-all"
            >
              Reiniciar
            </button>
            <button
              onClick={copyResult}
              className="flex items-center gap-2 px-6 py-3 bg-graphite-800 border border-graphite-700 text-white font-bold rounded-xl hover:border-electric-purple transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <button
              onClick={shareResult}
              className="flex items-center gap-2 px-6 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all shadow-lg shadow-electric-purple/20"
            >
              <Share2 className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
