import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOOLS } from '../data/tools';

export const SurpriseTool: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const randomTool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
    setTimeout(() => {
      navigate(randomTool.path);
    }, 1500);
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto py-20 text-center">
      <div className="inline-block p-6 bg-electric-purple rounded-full animate-bounce mb-8">
        <span className="text-4xl">🎲</span>
      </div>
      <h1 className="text-4xl font-extrabold mb-4">Sorteando ferramenta...</h1>
      <p className="text-gray-400">Prepare-se para descobrir algo útil!</p>
    </div>
  );
};
