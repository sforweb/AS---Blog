// Garante que o tema seja aplicado antes da hidratação do React
(function setInitialTheme() {
  try {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    // Verificar a preferência do sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Se não houver tema salvo, usar a preferência do sistema
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplicar o tema imediatamente
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // Se houver algum erro, garantir que o tema escuro seja o padrão
    document.documentElement.classList.add('dark');
  }
})();
