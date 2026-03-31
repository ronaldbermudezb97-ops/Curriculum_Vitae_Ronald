import type { ProjectCard } from '@/types'

export const projects: ProjectCard[] = [
  {
    title: "Dashboard de Analítica",
    description: "Panel interactivo con gráficas en tiempo real, filtros avanzados y exportación de datos.",
    techStack: ["React", "TypeScript", "Recharts", "Zustand", "React Query"],
    imageUrl: "/analisis.png",
    liveUrl: "https://demo-analytics.com",
    repoUrl: "https://github.com/ronaldpreciado/analytics-dashboard",
    status: "online"
  },
  {
    title: "E-commerce Platform",
    description: "Tienda completa con catálogo, carrito persistente, checkout y pasarela de pago Stripe.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Context API"],
    imageUrl: "/ecommerce.png",
    liveUrl: "https://demo-ecommerce.com",
    repoUrl: "https://github.com/ronaldpreciado/ecommerce-stripe",
    status: "online"
  },
  {
    title: "Design System / UI Library",
    description: "Librería de componentes reutilizables documentada con Storybook y testeada con Jest.",
    techStack: ["React", "Storybook", "CSS Modules", "Jest", "Chromatic"],
    imageUrl: "/Library.png",
    liveUrl: "https://ui-library-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/ui-library",
    status: "online"
  },
  {
    title: "API REST with Auth",
    description: "CRUD de usuarios, autenticación JWT + refresh tokens, roles y documentación Swagger.",
    techStack: ["Node.js", "Express", "PostgreSQL", "JWT", "Prisma"],
    imageUrl: "/jwt.png",
    liveUrl: "https://api-auth-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/auth-api",
    status: "online"
  },
  {
    title: "Microservices Messaging",
    description: "Sistema de órdenes con cola de mensajes RabbitMQ y arquitectura distribuida con Docker.",
    techStack: ["Python", "Node.js", "RabbitMQ", "Docker", "Redis"],
    imageUrl: "/RabbitMQ.png",
    liveUrl: "https://microservices-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/messaging-service",
    status: "pending"
  },
  {
    title: "GraphQL API",
    description: "API GraphQL con suscripciones en tiempo real, queries optimizadas y MongoDB.",
    techStack: ["Apollo Server", "Node.js", "WebSockets", "MongoDB", "DataLoader"],
    imageUrl: "/Grapqhl.png",
    liveUrl: "https://graphql-api-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/graphql-server",
    status: "online"
  },
  {
    title: "Project Management SaaS",
    description: "Aplicación tipo Trello con tableros drag & drop y colaboración en tiempo real.",
    techStack: ["Next.js", "GraphQL", "Prisma", "Socket.io", "PostgreSQL"],
    imageUrl: "/tablero.png",
    liveUrl: "https://saas-pm-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/trello-clone",
    status: "online"
  },
  {
    title: "Real-time Chat App",
    description: "Mensajería instantánea con canales, DMs y notificaciones push usando WebSockets.",
    techStack: ["React", "Node.js", "Socket.io", "Redis", "PostgreSQL"],
    imageUrl: "/mensaje.png",
    liveUrl: "https://chat-realtime-demo.com",
    repoUrl: "https://github.com/ronaldpreciado/realtime-chat",
    status: "online"
  }
]