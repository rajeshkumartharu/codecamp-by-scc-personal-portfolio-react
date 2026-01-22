export type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

export const defaultProjects: Project[] = [
  {
    title: "Banking System",
    description: "A clean single-page portfolio with a surprise theme unlock.",
    link: "https://example.com",
    tags: ["React", "CSS"],
  },
  {
    title: "College ERP System",
    description: "A tiny productivity app for organizing study sessions.",
    link: "https://example.com",
    tags: ["TypeScript", "Vite"],
  },
  {
    title: "Hospital Management System",
    description: "A pixel-art inspired task board for creative teams.",
    link: "https://example.com",
    tags: ["Design", "UI"],
  },
];

export const projectsData: Project[] = [
  ...defaultProjects,
];
