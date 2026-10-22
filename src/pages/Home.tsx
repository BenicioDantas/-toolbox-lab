import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Star, Clock, History } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { useFavorites } from '../hooks/useFavorites';
import { getDailyChallenge } from '../utils/challenge';

const CATEGORIES = ['Todas', 'Criatividade', 'Jogos', 'Produtividade', 'Segurança'] as const;
type Category = typeof CATEGORIES[number];

export const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Todas');
  const { isFavorite, toggleFavorite, getFavorites } = useFavorites();
  const dailyChallenge = getDailyChallenge();
  const [recentTools, setRecentTools] = useState<string[]>([]);

  useEffect(() => {
    const savedRecent = localStorage.getItem('toolbox_recent_tools');
    if (savedRecent) {
      setRecentTools(JSON.parse(savedRecent));
    }
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const favorites = TOOLS.filter(tool => isFavorite(tool.id));
  const recent = TOOLS.filter(tool => recentTools.includes(tool.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Pequenas ferramentas. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-electric-cyan">
            Grandes ideias.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Uma coleção de utilitários gratuitos para criadores, gamers e estudantes.
          Rápido, simples e feito para potencializar sua rotina.
        </p>

        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar ferramenta..."
            className="block w-full pl-11 pr-4 py-4 bg-graphite-800 border border-graphite-700 rounded-2xl focus:ring-2 focus:ring-electric-purple focus:border-transparent outline-none transition-all text-gray-100 placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Seção de Favoritos (Surgindo apenas se houver favoritos) */}
      {favorites.length > 0 && (
        <section className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <h2 className="text-xl font-bold text-gray-100">Seus Favoritos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map(tool => (
              <ToolCard key={tool.id} tool={tool} isFavorite={true} toggleFavorite={toggleFavorite} />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Recentes (Surgindo apenas se houver recentes) */}
      {recent.length > 0 && (
        <section className="mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-electric-cyan" />
            <h2 className="text-xl font-bold text-gray-100">Usadas Recentemente</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recent.map(tool => (
              <ToolCard key={tool.id} tool={tool} isFavorite={isFavorite(tool.id)} toggleFavorite={toggleFavorite} />
            ))}
          </div>
        </section>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
              ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
              : 'bg-graphite-800 text-gray-400 hover:bg-graphite-700 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} isFavorite={isFavorite(tool.id)} toggleFavorite={toggleFavorite} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-graphite-800 rounded-full mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Nenhuma ferramenta encontrada</h3>
          <p className="text-gray-500">Tente ajustar sua pesquisa ou trocar de categoria.</p>
        </div>
      )}

      {/* Special Section */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-gradient-to-br from-electric-purple/20 to-transparent border border-electric-purple/30 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-48 h-48" />
          </div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-electric-purple" /> Ferramenta Surpresa
          </h3>
          <p className="text-gray-400 mb-6">Não sabe por onde começar? Deixe o destino escolher uma ferramenta aleatória para você.</p>
          <Link
            to="/surpresa"
            className="inline-block px-6 py-3 bg-electric-purple text-white font-bold rounded-xl hover:bg-electric-purple/90 transition-all active:scale-95"
          >
            Tentar a sorte
          </Link>
        </div>

        <div className="p-8 bg-gradient-to-br from-electric-cyan/20 to-transparent border border-electric-cyan/30 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-48 h-48" />
          </div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-electric-cyan" /> Desafio do Dia
          </h3>
          <p className="text-gray-400 mb-6">Todo dia um novo desafio para testar sua criatividade ou produtividade.</p>
          <div className="p-4 bg-graphite-900/50 rounded-xl border border-graphite-700 mb-6">
            <p className="text-sm italic text-gray-300">"{dailyChallenge}"</p>
          </div>
          <button className="px-6 py-3 bg-electric-cyan text-graphite-900 font-bold rounded-xl hover:bg-electric-cyan/90 transition-all active:scale-95">
            Aceitar desafio
          </button>
        </div>
      </section>
    </div>
  );
};

// Componente interno para evitar repetição de código nos grids
const ToolCard = ({ tool, isFavorite, toggleFavorite }: { tool: any, isFavorite: boolean, toggleFavorite: (id: string) => void }) => (
  <div className="group relative p-6 bg-graphite-800 border border-graphite-700 rounded-2xl hover:border-electric-purple/50 hover:shadow-2xl hover:shadow-electric-purple/10 transition-all duration-300 transform hover:-translate-y-1">
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(tool.id);
      }}
      className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
      aria-label="Favoritar ferramenta"
    >
      <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
    <Link
      to={tool.path}
      className="block"
    >
      <div className="w-12 h-12 bg-graphite-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-electric-purple transition-colors">
        <div className="text-gray-300 group-hover:text-white transition-colors">
          {tool.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-electric-cyan transition-colors">{tool.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
      <div className="mt-4 flex items-center text-electric-purple text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        Acessar ferramenta &rarr;
      </div>
    </Link>
  </div>
);
