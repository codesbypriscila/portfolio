import type { Project } from "@/types/projects";

const repo = (name: string) => `https://github.com/codesbypriscila/${name}`;
const viewRepository = { translated: "repository" } as const;

/** Descriptions live in the dictionaries (`src/i18n`), under `projects.descriptions[id]`. */
export const projects: readonly Project[] = [
  {
    id: "izumi",
    name: "IZUMI",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Motion"],
    links: [
      { label: viewRepository, href: repo("izumi"), primary: true },
      { label: { translated: "demo" }, href: "https://izumi-taupe.vercel.app" },
    ],
  },
  {
    id: "sadvoapp",
    name: "SadvoApp",
    stack: ["C#", ".NET", "HTML", "CSS"],
    links: [{ label: viewRepository, href: repo("SadvoApp"), primary: true }],
  },
  {
    id: "investatlas",
    name: "InvestAtlas",
    stack: ["C#", ".NET", "HTML", "CSS"],
    links: [{ label: viewRepository, href: repo("InvestAtlas"), primary: true }],
  },
  {
    id: "survey-manager",
    name: "Survey Manager",
    stack: ["React", "JavaScript", "C#", ".NET"],
    links: [
      { label: "Frontend", href: repo("GestorEncuestasFrontend"), primary: true },
      { label: "Backend", href: repo("GestorEncuestasBackend"), primary: true },
    ],
  },
  {
    id: "bankapp",
    name: "BankApp",
    stack: ["C#", "SQL Server"],
    links: [{ label: viewRepository, href: repo("BankApp"), primary: true }],
  },
  {
    id: "devops-labs",
    name: "DevOps labs",
    stack: ["Docker", "Ansible", "Grafana", "GitHub Actions"],
    links: [
      { label: "Docker", href: repo("DevopsDocker") },
      { label: "Ansible", href: repo("Practica-Ansible") },
      { label: "Grafana", href: repo("Grafana") },
      { label: "CI", href: repo("IntegracionContinua") },
      { label: "CD", href: repo("EntregaContinua") },
      { label: "CI/CD pipeline", href: repo("PracticaFinalDevops") },
    ],
  },
];
