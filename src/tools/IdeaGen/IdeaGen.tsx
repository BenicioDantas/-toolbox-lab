import React, { useState } from 'react';
import { Copy, RefreshCw, Lightbulb, Check } from 'lucide-react';

type IdeaCategory = 'Vídeos' | 'Projetos' | 'Jogos' | 'Criatividade' | 'Desafios';

const IDEAS_DATABASE: Record<IdeaCategory, { title: string, description: string }[]> = {
  Vídeos: [
    { title: 'Review Sincero', description: 'Faça um review de um objeto inútil da sua casa como se fosse um gadget high-tech.' },
    { title: 'Desafio 24h', description: 'Passe 24 horas seguindo as sugestões de estranhos na internet.' },
    { title: 'Tutorial Inverso', description: 'Ensine a fazer algo comum, mas da maneira mais difícil e ineficiente possível.' },
    { title: 'Evolução de Skill', description: 'Tente aprender uma habilidade nova em 7 dias e documente o progresso diário.' },
    { title: 'Exploração Urbana', description: 'Visite um lugar da sua cidade que você nunca foi e conte a história dele.' },
  ],
  Projetos: [
    { title: 'App de Micro-Hábitos', description: 'Crie um app que rastreia apenas UM hábito por dia, mas de forma extremamente visual.' },
    { title: 'Extensão de Produtividade', description: 'Uma extensão que bloqueia sites distraidores, mas pede um "pedágio" em flexões.' },
    { title: 'Bot de Curadoria', description: 'Um bot que busca as 3 melhores notícias de um tema específico e resume em emojis.' },
    { title: 'Dashboard Pessoal', description: 'Um painel que mostra seu clima, agenda e uma frase motivacional aleatória ao acordar.' },
    { title: 'Jogo de Texto', description: 'Crie uma aventura textual interativa onde as escolhas mudam drasticamente o final.' },
  ],
  Jogos: [
    { title: 'Battle Royale de Cores', description: 'Um jogo onde você deve conquistar o mapa pintando-o com a sua cor.' },
    { title: 'Puzzle de Som', description: 'Um puzzle onde a pista para a solução é um som específico emitido pelo ambiente.' },
    { title: 'Simulador de Vida Simples', description: 'Um jogo onde o objetivo é apenas relaxar e cuidar de uma planta digital.' },
    { title: 'Corrida de Obstáculos', description: 'Um jogo de plataforma onde o cenário muda de gravidade a cada 10 segundos.' },
    { title: 'RPG de Um Botão', description: 'Um RPG onde todas as ações (atacar, defender, curar) são feitas com um único botão.' },
  ],
  Criatividade: [
    { title: 'Colagem Digital', description: 'Crie uma arte usando apenas prints de telas de erro do Windows.' },
    { title: 'Poesia Binária', description: 'Escreva um poema curto e tente traduzi-lo para binário, criando um padrão visual.' },
    { title: 'Redesign de Logos', description: 'Pegue um logo famoso e redesenhe-o com o estilo de um jogo de 8-bits.' },
    { title: 'Storytelling Visual', description: 'Conte uma história curta usando apenas 5 emojis e 5 cores.' },
    { title: 'Música de Objetos', description: 'Grave sons de objetos da cozinha e tente montar um beat de Lo-Fi.' },
  ],
  Desafios: [
    { title: 'Sem Telas', description: 'Fique 4 horas sem olhar para qualquer tela hoje e anote como se sentiu.' },
    { title: 'Escrita Automática', description: 'Escreva três páginas de pensamentos sem parar a caneta por 15 minutos.' },
    { title: 'Desenho Cego', description: 'Tente desenhar um animal complexo sem olhar para o papel nem uma única vez.' },
    { title: 'Troca de Papéis', description: 'Tente explicar um conceito complexo para uma criança de 5 anos.' },
    { title: 'Organização Extrema', description: 'Organize um espaço da sua casa que você ignora há meses em apenas 10 minutos.' },
  ],
};

export const IdeaGen: React.FC = () => {
  const [category, setCategory] = useState<IdeaCategory>('Vídeos');
  const [currentIdea, setCurrentIdea] = useState<{ title: string, description: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const options = IDEAS_DATABASE[category];
    const randomIndex = Math.floor(Math.random() * options.length);
    setCurrentIdea(options[randomIndex]);
  };

  const copyIdea = async () => {
    if (currentIdea) {
      await navigator.clipboard.writeText(`${currentIdea.title}: ${currentIdea.description}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Gerador de Ideias</h1>
        <p className="text-gray-400">Saia do bloqueio criativo com sugestões instantâneas!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-graphite-800 p-8 rounded-3xl border border-graphite-700 h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-electric-purple" /> Categorias
          </h3>

          <div className="space-y-3">
            {(Object.keys(IDEAS_DATABASE) as IdeaCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  category === cat
                  ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
                  : 'bg-graphite-900 text-gray-500 hover:text-gray-300 border border-graphite-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={generate}
            className="w-full mt-8 py-4 bg-electric-cyan text-graphite-900 font-bold rounded-2xl hover:bg-electric-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Gerar Ideia
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {currentIdea ? (
            <div className="p-8 bg-graphite-800 border border-graphite-700 rounded-3xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lightbulb className="w-24 h-24 text-electric-purple" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-electric-cyan">{currentIdea.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{currentIdea.description}</p>
              <button
                onClick={copyIdea}
                className="flex items-center gap-2 px-6 py-3 bg-graphite-700 rounded-xl text-sm font-medium hover:bg-graphite-600 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar Ideia'}
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-graphite-800/50 rounded-3xl border-2 border-dashed border-graphite-700 text-center">
              <div className="w-16 h-16 bg-graphite-800 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aguardando Ideia</h3>
              <p className="text-gray-500">Selecione uma categoria e gere sua próxima grande ideia!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
