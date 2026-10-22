import React, { useState, useEffect } from 'react';
import { Copy, Trophy, Check, Share2 } from 'lucide-react';

type Category = 'criatividade' | 'lógica' | 'humor' | 'produtividade' | 'social';
type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

type Challenge = {
  id: number;
  category: Category;
  difficulty: Difficulty;
  text: string;
};

const CHALLENGES_DB: Challenge[] = [
  // Criatividade
  { id: 1, category: 'criatividade', difficulty: 'Fácil', text: 'Desenhe um objeto comum usando apenas círculos.' },
  { id: 2, category: 'criatividade', difficulty: 'Médio', text: 'Escreva um poema de 4 linhas sobre um bug de software.' },
  { id: 3, category: 'criatividade', difficulty: 'Difícil', text: 'Crie um novo conceito de interface para um app de culinária.' },
  { id: 4, category: 'criatividade', difficulty: 'Fácil', text: 'Invente um nome para um planeta feito de queijo.' },
  { id: 5, category: 'criatividade', difficulty: 'Médio', text: 'Tire uma foto de algo comum sob um ângulo incomum.' },
  { id: 6, category: 'criatividade', difficulty: 'Difícil', text: 'Redesenhe o logo de uma empresa famosa usando apenas 3 cores.' },
  { id: 7, category: 'criatividade', difficulty: 'Fácil', text: 'Crie um personagem baseado em um eletrodoméstico.' },
  { id: 8, category: 'criatividade', difficulty: 'Médio', text: 'Escreva uma história de 2 frases com um plot twist.' },
  { id: 9, category: 'criatividade', difficulty: 'Difícil', text: 'Crie um sistema de cores para um mundo onde não existe a cor azul.' },
  { id: 10, category: 'criatividade', difficulty: 'Fácil', text: 'Faça um esboço rápido de um robô jardineiro.' },
  { id: 11, category: 'criatividade', difficulty: 'Médio', text: 'Crie um slogan para um guarda-chuva que nunca fecha.' },
  { id: 12, category: 'criatividade', difficulty: 'Difícil', text: 'Imagine e descreva a interface de um sistema operacional para alienígenas.' },

  // Lógica
  { id: 13, category: 'lógica', difficulty: 'Fácil', text: 'Tente resolver um Sudoku nível fácil em menos de 5 minutos.' },
  { id: 14, category: 'lógica', difficulty: 'Médio', text: 'Escreva um algoritmo simples para organizar uma lista de nomes.' },
  { id: 15, category: 'lógica', difficulty: 'Difícil', text: 'Resolva um problema de lógica clássico (ex: O enigma de Einstein).' },
  { id: 16, category: 'lógica', difficulty: 'Fácil', text: 'Encontre 3 padrões repetitivos em um objeto ao seu redor.' },
  { id: 17, category: 'lógica', difficulty: 'Médio', text: 'Crie um fluxograma simples para o processo de fazer um café.' },
  { id: 18, category: 'lógica', difficulty: 'Difícil', text: 'Explique como funciona a recursão para alguém que não programa.' },
  { id: 19, category: 'lógica', difficulty: 'Fácil', text: 'Tente prever a próxima sequência de números: 2, 4, 8, 16...' },
  { id: 20, category: 'lógica', difficulty: 'Médio', text: 'Crie um enigma onde a resposta seja "tempo".' },
  { id: 21, category: 'lógica', difficulty: 'Difícil', text: 'Desenhe um mapa mental de como funciona a internet.' },
  { id: 22, category: 'lógica', difficulty: 'Fácil', text: 'Identifique a falha lógica em um argumento comum.' },
  { id: 23, category: 'lógica', difficulty: 'Médio', text: 'Organize 5 objetos por tamanho sem usar as mãos.' },
  { id: 24, category: 'lógica', difficulty: 'Difícil', text: 'Crie um código secreto simples para conversar com um amigo.' },

  // Humor
  { id: 25, category: 'humor', difficulty: 'Fácil', text: 'Conte uma piada "ruim" de programador para alguém.' },
  { id: 26, category: 'humor', difficulty: 'Médio', text: 'Tente fazer alguém rir sem usar palavras, apenas gestos.' },
  { id: 27, category: 'humor', difficulty: 'Difícil', text: 'Escreva um diálogo cômico entre um teclado e um mouse.' },
  { id: 28, category: 'humor', difficulty: 'Fácil', text: 'Crie um meme rápido sobre a vida de estudante.' },
  { id: 29, category: 'humor', difficulty: 'Médio', text: 'Tente imitar a voz de um robô tentando ser humano.' },
  { id: 30, category: 'humor', difficulty: 'Difícil', text: 'Crie uma paródia curta de uma música famosa sobre tecnologia.' },
  { id: 31, category: 'humor', difficulty: 'Fácil', text: 'Invente um nome engraçado para um pet robótico.' },
  { id: 32, category: 'humor', difficulty: 'Médio', text: 'Tente contar uma história curta onde tudo termina mal, mas de forma engraçada.' },
  { id: 33, category: 'humor', difficulty: 'Difícil', text: 'Crie um guia de "etiqueta" para robôs em festas humanas.' },
  { id: 34, category: 'humor', difficulty: 'Fácil', text: 'Faça uma careta engraçada e tente mantê-la por 1 minuto.' },
  { id: 35, category: 'humor', difficulty: 'Médio', text: 'Tente explicar a internet para um personagem do século XVIII.' },
  { id: 36, category: 'humor', difficulty: 'Difícil', text: 'Crie um dicionário de gírias para a "geração IA".' },

  // Produtividade
  { id: 37, category: 'produtividade', difficulty: 'Fácil', text: 'Limpe sua área de trabalho (desktop) agora mesmo.' },
  { id: 38, category: 'produtividade', difficulty: 'Médio', text: 'Use a técnica Pomodoro para completar uma tarefa pendente.' },
  { id: 39, category: 'produtividade', difficulty: 'Difícil', text: 'Planeje sua próxima semana inteira em 15 minutos.' },
  { id: 40, category: 'produtividade', difficulty: 'Fácil', text: 'Desative as notificações do celular por 30 minutos.' },
  { id: 41, category: 'produtividade', difficulty: 'Médio', text: 'Escreva a lista de 3 prioridades para amanhã.' },
  { id: 42, category: 'produtividade', difficulty: 'Difícil', text: 'Aprenda um novo atalho de teclado para seu software principal.' },
  { id: 43, category: 'produtividade', difficulty: 'Fácil', text: 'Beba um copo de água agora para hidratar o cérebro.' },
  { id: 44, category: 'produtividade', difficulty: 'Médio', text: 'Organize sua caixa de entrada de e-mails.' },
  { id: 45, category: 'produtividade', difficulty: 'Difícil', text: 'Crie um sistema de arquivamento para seus projetos digitais.' },
  { id: 46, category: 'produtividade', difficulty: 'Fácil', text: 'Faça um alongamento de 2 minutos.' },
  { id: 47, category: 'produtividade', difficulty: 'Médio', text: 'Leia um artigo técnico curto e anote o ponto principal.' },
  { id: 48, category: 'produtividade', difficulty: 'Difícil', text: 'Remova 3 extensões do navegador que você não usa mais.' },

  // Social (Seguros)
  { id: 49, category: 'social', difficulty: 'Fácil', text: 'Mande uma mensagem de agradecimento para alguém que te ajudou.' },
  { id: 50, category: 'social', difficulty: 'Médio', text: 'Elogie sinceramente o trabalho de um colega.' },
  { id: 51, category: 'social', difficulty: 'Difícil', text: 'Inicie uma conversa com alguém que você não fala há tempo.' },
  { id: 52, category: 'social', difficulty: 'Fácil', text: 'Compartilhe um link útil com um amigo.' },
  { id: 53, category: 'social', difficulty: 'Médio', text: 'Peça a opinião de alguém sobre um projeto seu.' },
  { id: 54, category: 'social', difficulty: 'Difícil', text: 'Tente ouvir alguém por 5 minutos sem interromper.' },
  { id: 55, category: 'social', difficulty: 'Fácil', text: 'Sorria para a próxima pessoa que você encontrar.' },
  { id: 56, category: 'social', difficulty: 'Médio', text: 'Ensine algo simples que você sabe para outra pessoa.' },
  { id: 57, category: 'social', difficulty: 'Difícil', text: 'Escreva um feedback construtivo e gentil para alguém.' },
  { id: 58, category: 'social', difficulty: 'Fácil', text: 'Pergunte a alguém "como foi seu dia?" e ouça com atenção.' },
  { id: 59, category: 'social', difficulty: 'Médio', text: 'Sugerir um livro ou filme para um amigo.' },
  { id: 60, category: 'social', difficulty: 'Difícil', text: 'Proponha uma atividade em grupo para o próximo final de semana.' },
];

export const RandomChallenge: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<Category | 'todas'>('todas');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'todas'>('todas');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [history, setHistory] = useState<Challenge[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem('challenge_completed_count');
    const savedHistory = localStorage.getItem('challenge_history');
    if (savedCount) setCompletedCount(parseInt(savedCount));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const generateChallenge = () => {
    const filtered = CHALLENGES_DB.filter(c =>
      (filterCategory === 'todas' || c.category === filterCategory) &&
      (filterDifficulty === 'todas' || c.difficulty === filterDifficulty)
    );

    if (filtered.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentChallenge(filtered[randomIndex]);
  };

  const markAsCompleted = () => {
    if (!currentChallenge) return;

    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    localStorage.setItem('challenge_completed_count', newCount.toString());

    const newHistory = [currentChallenge, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('challenge_history', JSON.stringify(newHistory));

    setCurrentChallenge(null);
  };

  const copyChallenge = async () => {
    if (!currentChallenge) return;
    await navigator.clipboard.writeText(`Meu desafio no Toolbox Lab: ${currentChallenge.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareChallenge = async () => {
    if (!currentChallenge) return;
    const text = `Desafio do dia no Toolbox Lab: ${currentChallenge.text}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Desafio Toolbox Lab', text, url: window.location.href });
      } catch (e) {}
    } else {
      copyChallenge();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Desafio Aleatório</h1>
        <p className="text-gray-400">Saia da zona de conforto com missões rápidas e divertidas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters */}
        <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 h-fit space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Categoria</h3>
            <div className="flex flex-col gap-2">
              {(['todas', 'criatividade', 'lógica', 'humor', 'produtividade', 'social'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${filterCategory === cat ? 'bg-electric-purple text-white' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Dificuldade</h3>
            <div className="flex flex-col gap-2">
              {(['todas', 'Fácil', 'Médio', 'Difícil'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`text-left px-4 py-2 rounded-xl text-sm transition-all ${filterDifficulty === diff ? 'bg-electric-cyan text-graphite-900' : 'bg-graphite-900 text-gray-400 hover:bg-graphite-700'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Display */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-graphite-800 p-10 rounded-3xl border border-graphite-700 text-center relative overflow-hidden min-h-[300px] flex flex-col justify-center">
            {currentChallenge ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-graphite-900 text-electric-purple text-[10px] font-bold uppercase rounded border border-electric-purple/30">
                    {currentChallenge.category}
                  </span>
                  <span className="px-2 py-1 bg-graphite-900 text-electric-cyan text-[10px] font-bold uppercase rounded border border-electric-cyan/30">
                    {currentChallenge.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-100 leading-snug">
                  {currentChallenge.text}
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={markAsCompleted}
                    className="px-6 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all active:scale-95"
                  >
                    Concluído!
                  </button>
                  <button
                    onClick={copyChallenge}
                    className="p-3 bg-graphite-700 text-gray-300 rounded-xl hover:bg-graphite-600 transition-all"
                    title="Copiar"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={shareChallenge}
                    className="p-3 bg-graphite-700 text-gray-300 rounded-xl hover:bg-graphite-600 transition-all"
                    title="Compartilhar"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <Trophy className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">Pronto para um novo desafio?</p>
                <button
                  onClick={generateChallenge}
                  className="mt-6 px-8 py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 shadow-lg shadow-electric-cyan/20"
                >
                  Sortear Desafio
                </button>
              </div>
            )}
          </div>

          {/* Stats & History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Desafios Concluídos</p>
                <h4 className="text-3xl font-bold text-electric-cyan">{completedCount}</h4>
              </div>
              <Trophy className="w-10 h-10 text-electric-purple opacity-50" />
            </div>
            <div className="bg-graphite-800 p-6 rounded-3xl border border-graphite-700">
              <p className="text-gray-500 text-sm font-medium mb-3">Histórico Recente</p>
              <div className="space-y-2">
                {history.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">Nenhum desafio concluído ainda.</p>
                ) : (
                  history.map((h, i) => (
                    <div key={i} className="text-xs text-gray-400 truncate py-1 border-b border-graphite-700/50">
                      {h.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
