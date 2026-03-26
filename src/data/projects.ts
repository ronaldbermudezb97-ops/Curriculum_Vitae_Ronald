import type { ProjectCard } from '@/types'

export const projects: ProjectCard[] = [
  {
    title: "Proyecto 1",
    description: "Descripción del primer proyecto. Tecnologías utilizadas y funcionalidades principales.",
    techStack: ["React", "TypeScript", "Node.js"],
    imageUrl: "/images/projects/project-1.jpg",
    liveUrl: "https://project1.com",
    repoUrl: "https://github.com/ronaldpreciado/project1",
    status: "online"
  },
  {
    title: "Proyecto 2",
    description: "Descripción del segundo proyecto. Tecnologías utilizadas y funcionalidades principales.",
    techStack: ["Vue.js", "Python", "PostgreSQL"],
    imageUrl: "/images/projects/project-2.jpg",
    liveUrl: "https://project2.com",
    repoUrl: "https://github.com/ronaldpreciado/project2",
    status: "online"
  },
  {
    title: "Proyecto 3",
    description: "Descripción del tercer proyecto. Tecnologías utilizadas y funcionalidades principales.",
    techStack: ["Angular", "Java", "MongoDB"],
    imageUrl: "/images/projects/project-3.jpg",
    liveUrl: "https://project3.com",
    repoUrl: "https://github.com/ronaldpreciado/project3",
    status: "pending"
  },
  {
    title: "Proyecto 4",
    description: "Descripción del cuarto proyecto. Tecnologías utilizadas y funcionalidades principales.",
    techStack: ["Next.js", "GraphQL", "AWS"],
    imageUrl: "/images/projects/project-4.jpg",
    liveUrl: "https://project4.com",
    repoUrl: "https://github.com/ronaldpreciado/project4",
    status: "online"
  }
]