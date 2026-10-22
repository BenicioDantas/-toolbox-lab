export const CHALLENGES = [
  "Crie um projeto simples em 30 minutos usando apenas 3 cores.",
  "Escreva um pequeno poema sobre tecnologia usando apenas emojis.",
  "Organize seus arquivos de trabalho por 15 minutos sem interrupções.",
  "Tente aprender um comando novo do terminal hoje.",
  "Desenhe um ícone simples para a ferramenta que você mais usa.",
  "Passe 1 hora longe de qualquer tela após terminar suas tarefas.",
  "Escreva uma ideia de app que resolveria um problema irritante do seu dia.",
  "Tente explicar o que é uma API para alguém que não entende de tech.",
  "Crie uma playlist de 5 músicas para foco total.",
  "Faça um backup de seus arquivos mais importantes hoje."
];

export const getDailyChallenge = () => {
  const today = new Date();
  const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  // Simple seed based on date to keep the challenge same for all users today
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % CHALLENGES.length;
  return CHALLENGES[index];
};
