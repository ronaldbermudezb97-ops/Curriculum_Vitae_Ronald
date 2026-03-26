import type { SkillCard } from '@/types'

export const skillCards: SkillCard[] = [
  {
    id: 1,
    title: "Lenguajes & Core",
    accentColor: "#3B82F6",
    icon: "🔷",
    items: [
      { category: "Lenguajes", skills: ["C#", "Java", "JavaScript", "TypeScript"] },
      { category: "Entornos de Ejecución", skills: ["Node.js"] }
    ]
  },
  {
    id: 2,
    title: "Frameworks & Librerías (Backend)",
    accentColor: "#F97316",
    icon: "⚙️",
    items: [
      { category: ".NET", skills: [".NET Core", ".NET Framework", "ASP.NET MVC", "Entity Framework"] },
      { category: "Java", skills: ["Spring Boot", "Spring MVC", "Hibernate"] },
      { category: "Node.js", skills: ["Express.js", "NestJS", "Fastify"] }
    ]
  },
  {
    id: 3,
    title: "Frameworks & Librerías (Frontend)",
    accentColor: "#10B981",
    icon: "🎨",
    items: [
      { category: "React", skills: ["React", "Next.js", "React Native"] },
      { category: "Vue.js", skills: ["Vue.js", "Nuxt.js", "Vuex", "Pinia"] },
      { category: "Angular", skills: ["Angular", "RxJS", "NgRx"] }
    ]
  },
  {
    id: 4,
    title: "Bases de Datos",
    accentColor: "#8B5CF6",
    icon: "🗄️",
    items: [
      { category: "SQL", skills: ["SQL Server", "PostgreSQL", "MySQL", "Oracle"] },
      { category: "NoSQL", skills: ["MongoDB", "Redis", "Elasticsearch"] },
      { category: "ORM", skills: ["Entity Framework", "Dapper", "TypeORM"] }
    ]
  },
  {
    id: 5,
    title: "DevOps & Cloud",
    accentColor: "#EF4444",
    icon: "☁️",
    items: [
      { category: "Cloud", skills: ["AWS", "Azure", "Google Cloud"] },
      { category: "Containers", skills: ["Docker", "Kubernetes"] },
      { category: "CI/CD", skills: ["GitHub Actions", "Azure DevOps", "Jenkins"] }
    ]
  },
  {
    id: 6,
    title: "Herramientas & Metodologías",
    accentColor: "#F59E0B",
    icon: "🛠️",
    items: [
      { category: "Control de Versiones", skills: ["Git", "GitHub", "GitLab"] },
      { category: "Metodologías", skills: ["Agile", "Scrum", "Kanban"] },
      { category: "Testing", skills: ["Unit Testing", "Integration Testing", "Jest", "xUnit"] }
    ]
  }
]