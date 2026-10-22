import React from 'react';
import { Link } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-graphite-900 text-gray-100">
      <header className="border-b border-graphite-700 bg-graphite-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-electric-purple rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="font-bold text-white">TL</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              TOOLBOX<span className="text-electric-purple">LAB</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-electric-cyan transition-colors">Início</Link>
            <Link to="/ferramentas" className="hover:text-electric-cyan transition-colors">Ferramentas</Link>
            <a href="#sobre" className="hover:text-electric-cyan transition-colors">Sobre</a>
          </nav>
          <button className="md:hidden p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-graphite-700 bg-graphite-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-electric-purple rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">TL</span>
            </div>
            <span className="font-bold text-lg tracking-tight">TOOLBOX<span className="text-electric-purple">LAB</span></span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Pequenas ferramentas. Grandes ideias.
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contato</a>
          </div>
          <p className="text-gray-700 text-[10px] mt-6">
            &copy; {new Date().getFullYear()} Toolbox Lab. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
