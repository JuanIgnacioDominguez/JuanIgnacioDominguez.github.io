import type { IconType } from "react-icons";
import {
  SiApachecassandra,
  SiBootstrap,
  SiCss,
  SiElectron,
  SiExpo,
  SiFigma,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiNumpy,
  SiPandas,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiScikitlearn,
  SiSpringboot,
  SiSqlite,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVite,
  SiVmware,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export interface Tool {
  name: string;
  icon: IconType;
  color: string;
}

export type GroupKey = "frontend" | "backend" | "data" | "ai" | "tools";

export const TOOL_GROUPS: Record<GroupKey, Tool[]> = {
  frontend: [
    { name: "React", icon: SiReact, color: "#61dafb" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    { name: "React Native", icon: SiReact, color: "#61dafb" },
    { name: "Expo", icon: SiExpo, color: "#ffffff" },
    { name: "Redux", icon: SiRedux, color: "#764abc" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
    { name: "HTML", icon: SiHtml5, color: "#e34f26" },
    { name: "CSS", icon: SiCss, color: "#663399" },
    { name: "Electron", icon: SiElectron, color: "#9feaf9" },
  ],
  backend: [
    { name: "Java", icon: FaJava, color: "#f89820" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
    { name: "Hibernate", icon: SiHibernate, color: "#bcae79" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
    { name: "Python", icon: SiPython, color: "#3776ab" },
  ],
  data: [
    { name: "MySQL", icon: SiMysql, color: "#4479a1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    { name: "Redis", icon: SiRedis, color: "#ff4438" },
    { name: "Cassandra", icon: SiApachecassandra, color: "#1287b1" },
    { name: "SQLite", icon: SiSqlite, color: "#5fb4e6" },
  ],
  ai: [
    { name: "pandas", icon: SiPandas, color: "#e70488" },
    { name: "NumPy", icon: SiNumpy, color: "#4dabcf" },
    { name: "scikit-learn", icon: SiScikitlearn, color: "#f7931e" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "#f05032" },
    { name: "GitHub", icon: SiGithub, color: "#ffffff" },
    { name: "Figma", icon: SiFigma, color: "#f24e1e" },
    { name: "Postman", icon: SiPostman, color: "#ff6c37" },
    { name: "Vite", icon: SiVite, color: "#9135ff" },
    { name: "npm", icon: SiNpm, color: "#cb3837" },
    { name: "IntelliJ", icon: SiIntellijidea, color: "#fe315d" },
    { name: "VMware", icon: SiVmware, color: "#8fa3b0" },
  ],
};

export const ALL_TOOLS: Tool[] = Object.values(TOOL_GROUPS)
  .flat()
  .filter((tool, i, all) => all.findIndex((x) => x.icon === tool.icon) === i);
