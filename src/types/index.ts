export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'Criatividade' | 'Jogos' | 'Produtividade' | 'Segurança' | 'Todas';
  path: string;
  icon: React.ReactNode;
}
