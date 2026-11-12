// Shared interface copy. Add a locale only when its landing page and notices exist.
export const messages = {
  en: {
    skip: 'Skip to content', homeLabel: 'Keith Williams home', subtitle: 'AI & EDUCATION',
    close: 'Close', menu: 'Menu', navigation: 'Main navigation', talk: "Let's talk",
    languages: 'Language and introduction', tagline: 'Curiosity with a compass.', top: 'Back to top',
    credit: 'Built with VitePress · AI-generated landscape artwork', personal: 'Personal website. Views are my own.',
    accessibility: 'Accessibility & language support', nav: {} as Record<string, string>
  },
  ptBR: {
    skip: 'Pular para o conteúdo', homeLabel: 'Keith Williams — início', subtitle: 'IA E EDUCAÇÃO',
    close: 'Fechar', menu: 'Menu', navigation: 'Navegação principal', talk: 'Vamos conversar',
    languages: 'Idioma e apresentação', tagline: 'Curiosidade com direção.', top: 'Voltar ao início',
    credit: 'Feito com VitePress · Paisagem criada com IA', personal: 'Site pessoal. As opiniões são minhas.',
    accessibility: 'Acessibilidade e idiomas',
    nav: { teaching: 'Ensino', research: 'Pesquisa', projects: 'Projetos', about: 'Sobre' } as Record<string, string>
  }
}
