/**
 * ============================================================
 *  DADOS DO PORTFÓLIO — edite aqui para personalizar o site
 * ============================================================
 */

export const profile = {
  name: "Leonardo Boury",
  role: "Desenvolvedor Web",
  rotatingRoles: [
    "Desenvolvedor Web",
    "Front-End",
    "Apaixonado por Código",
  ],
  email: "artmaker770@gmail.com",
  cv: "/cv-leonardo-boury.pdf", // currículo em PDF (public/)
  github: "https://github.com/Leloo0",
  githubLabel: "github.com/Leloo0",
  linkedin: "https://www.linkedin.com/in/leonardo-boury-6b61773b3/",
  linkedinLabel: "linkedin.com/in/leonardo-boury-6b61773b3",
  bio: "Sou um desenvolvedor web em constante evolução, focado em criar experiências digitais que unem design atraente e código limpo. Gosto de transformar ideias em interfaces responsivas, acessíveis e agradáveis de usar. Atualmente estudo React e Next.js, além de aprofundar meus conhecimentos em JavaScript moderno, CSS avançado e boas práticas de arquitetura front-end.",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  learnings: string;
  techs: string[];
  category: "web" | "ferramenta" | "landing";
  icon: string; // nome do ícone lucide (fallback)
  image?: string; // screenshot real do projeto (em /projects)
  link: string;
  highlight?: string; // destaque opcional (ex.: "1º projeto por conta própria")
};

export const projects: Project[] = [
  {
    id: "pyraminx-3d",
    title: "Pyraminx 3D",
    description:
      "Meu primeiro projeto feito por conta própria: um quebra-cabeça 3D do Pyraminx (pirâmide mágica) jogável no navegador, com cronômetro, embaralhar, dicas e opções de cubos de 2x2 a 5x5.",
    learnings:
      "Lógica de rotação 3D, desfazer/refazer, cronômetro, menu de configurações e interatividade avançada.",
    techs: ["JavaScript", "3D", "CSS"],
    category: "ferramenta",
    icon: "Puzzle",
    image: "/projects/pyraminx-3d.jpg",
    link: "https://leloo0.github.io/primeiro_projeto/",
    highlight: "1º projeto por conta própria",
  },
  {
    id: "boas-praticas",
    title: "Postura Profissional",
    description:
      "Site educativo “Postura Profissional Começa Aqui”, com guias de comportamento, soft skills em ação, código de 10 práticas e um quiz interativo para testar os conhecimentos.",
    learnings:
      "Estruturação de conteúdo em seções, navegação fluida e quiz interativo com JavaScript.",
    techs: ["HTML", "CSS", "JavaScript"],
    category: "landing",
    icon: "BookOpen",
    image: "/projects/boas-praticas.jpg",
    link: "https://leloo0.github.io/Boas-Pr-ticas/",
  },
  {
    id: "sabor-e-arte",
    title: "Sabor & Arte",
    description:
      "Site completo para restaurante com promoção de inauguração, cardápio com destaques da semana, reservas com desconto e seção dedicada ao framework Bootstrap.",
    learnings:
      "Layouts responsivos com Bootstrap, grids, componentes de navegação e cards de produtos.",
    techs: ["Bootstrap", "HTML", "CSS"],
    category: "landing",
    icon: "UtensilsCrossed",
    image: "/projects/sabor-e-arte.jpg",
    link: "https://bootstrap-seven-omega.vercel.app/index.html",
  },
  {
    id: "cine-vr",
    title: "CINE-VR",
    description:
      "Sistema de compra de ingressos de cinema: seleção de filmes, horários, assentos e resumo do pedido em tempo real, com foco na experiência de prévia 3D.",
    learnings:
      "Fluxo de compra em etapas, manipulação de estado da interface e cálculo dinâmico de valores.",
    techs: ["JavaScript", "SPA", "CSS"],
    category: "ferramenta",
    icon: "Ticket",
    image: "/projects/cine-vr.jpg",
    link: "https://cinevr.vercel.app/",
  },
  {
    id: "zelo-connect-invest",
    title: "Zelo Connect Invest",
    description:
      "Site de pitch de investimento da ZeloShop, startup de tecnologia para idosos: catálogo de produtos Plug & Play, modelo de negócio e área do investidor estilo Shark Tank.",
    learnings:
      "Storytelling de vendas, estrutura de pitch, apresentação de produtos e chamadas para ação.",
    techs: ["HTML", "CSS", "JavaScript"],
    category: "web",
    icon: "TrendingUp",
    image: "/projects/zelo-connect-invest.jpg",
    link: "https://zelo-connect-invest.vercel.app/",
  },
  {
    id: "planetas-atlas",
    title: "Planetas — Atlas Interativo",
    description:
      "Atlas interativo dos planetas com curiosidades científicas carregadas dinamicamente, botão “Próxima Curiosidade” e conteúdo expandido para cada planeta.",
    learnings:
      "Conteúdo dinâmico com JavaScript, carregamento de dados e interatividade com o usuário.",
    techs: ["HTML", "CSS", "JavaScript"],
    category: "ferramenta",
    icon: "Globe",
    image: "/projects/planetas-atlas.jpg",
    link: "https://leloo0.github.io/planetas-5.0/",
  },
];

export type Skill = {
  name: string;
  level: number; // 0-100
  icon: string;
};

export const skills: Skill[] = [
  { name: "HTML5", level: 90, icon: "Code" },
  { name: "CSS3", level: 85, icon: "Palette" },
  { name: "JavaScript", level: 80, icon: "Braces" },
  { name: "jQuery", level: 75, icon: "Zap" },
  { name: "React", level: 65, icon: "Atom" },
  { name: "Git & GitHub", level: 70, icon: "GitBranch" },
];

export const stats = [
  { value: "10+", label: "Projetos práticos" },
  { value: "6", label: "Tecnologias" },
  { value: "10 meses", label: "Tempo de estudo" },
  { value: "∞", label: "Vontade de aprender" },
];

export const footerTech =
  "Portfólio desenvolvido com Next.js, TypeScript e Tailwind CSS.";
