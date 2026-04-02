import type { ProjectCard } from '@/types'

export const projects: ProjectCard[] = [
  {
    title: "CrossFit Ragnarok",
    description: "Aplicación interactiva para gestión y seguimiento de entrenamientos en centros de CrossFit.",
    techStack: ["React", "TypeScript", "Vercel", "Tailwind CSS"],
    imageUrl: "/ecommerce.png",
    liveUrl: "https://crossfit-raganarok-front.vercel.app/",
    status: "online"
  },
  {
    title: "SG Col Pro - Limpieza AC",
    description: "Plataforma de servicios para gestión de limpieza y mantenimiento de aires acondicionados.",
    techStack: ["Next.js", "TypeScript", "Vercel", "Tailwind CSS"],
    imageUrl: "/analisis.png",
    liveUrl: "https://sgcolpro.vercel.app/",
    status: "online"
  },
  {
    title: "JWT Auth Server Core",
    description: "Servidor de autenticación robusto basado en JWT para aplicaciones empresariales.",
    techStack: ["Node.js", "Express", "JWT", "PostgreSQL"],
    imageUrl: "/jwt.png",
    repoUrl: "https://github.com/JosueGS14XD/jwt-auth-server",
    status: "online"
  },
  {
    title: "Security & Auth Microservice",
    description: "Microservicio especializado en la gestión segura de tokens y autorización de usuarios.",
    techStack: ["Spring Boot", "JWT", "Docker", "PostgreSQL"],
    imageUrl: "/Grapqhl.png",
    repoUrl: "https://github.com/JosueGS14XD/jwt-auth-server",
    status: "online"
  }
]