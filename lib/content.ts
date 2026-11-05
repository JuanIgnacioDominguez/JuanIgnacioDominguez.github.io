export type Lang = "es" | "en";

export interface Localized {
  es: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  kind: Localized;
  tagline: Localized;
  summary: Localized;
  highlights: Localized[];
  tech: string[];
  images: string[];
  fit: "cover" | "contain";
  links: { label: string; href: string }[];
}

export interface TimelineItem {
  period: Localized;
  title: Localized;
  place: string;
  detail: Localized;
}

export const profile = {
  name: "Juan Ignacio Dominguez",
  shortName: "Juan Dominguez",
  handle: "JuanIgnacioDominguez",
  email: "juanigdominguez03@gmail.com",
  phone: "+54 9 11 2644-1320",
  phoneHref: "tel:+5491126441320",
  location: "Buenos Aires, Argentina",
  cv: "/cv-juan-ignacio-dominguez.pdf",
  photo: "/juan.png",
  socials: {
    github: "https://github.com/JuanIgnacioDominguez",
    linkedin: "https://www.linkedin.com/in/juan-ignacio-dominguez-91a569308/",
    instagram: "https://www.instagram.com/juanchydominguez_/",
  },
};

export const projects: Project[] = [
  {
    slug: "coal",
    title: "Coal",
    year: "2024",
    kind: { es: "E-commerce · Web full-stack", en: "E-commerce · Full-stack web" },
    tagline: { es: "Tu próximo juego, a un click.", en: "Your next game, one click away." },
    summary: {
      es: "Tienda de videojuegos inspirada en Steam: catálogo, carrito, checkout y panel de administración, con autenticación JWT y una API REST propia en Spring Boot.",
      en: "A Steam-inspired video game store: catalog, cart, checkout and admin panel, with JWT authentication and a custom Spring Boot REST API.",
    },
    highlights: [
      { es: "Autenticación y roles con JWT", en: "JWT authentication and roles" },
      { es: "Estado global con Redux Toolkit", en: "Global state with Redux Toolkit" },
      { es: "UI responsive con TailwindCSS", en: "Responsive UI with TailwindCSS" },
    ],
    tech: ["React", "Vite", "Redux", "TailwindCSS", "Spring Boot", "JWT", "MySQL"],
    images: [
      "/projects/coal/coal-1.png",
      "/projects/coal/coal-2.png",
      "/projects/coal/coal-3.png",
      "/projects/coal/coal-4.png",
    ],
    fit: "cover",
    links: [
      { label: "Frontend", href: "https://github.com/ThomasGiardina/CoalFrontt" },
      { label: "Backend", href: "https://github.com/ThomasGiardina/Coal" },
    ],
  },
  {
    slug: "vitalis",
    title: "Vitalis",
    year: "2025",
    kind: { es: "App móvil · Salud", en: "Mobile app · Healthcare" },
    tagline: { es: "Turnos médicos, sin filas.", en: "Doctor appointments, no queues." },
    summary: {
      es: "App móvil para gestionar turnos médicos hospitalarios: registro, búsqueda de profesionales, reserva y seguimiento de turnos, con backend en Spring Boot.",
      en: "Mobile app to manage hospital appointments: sign-up, doctor search, booking and appointment tracking, backed by a Spring Boot API.",
    },
    highlights: [
      { es: "React Native + Expo multiplataforma", en: "Cross-platform React Native + Expo" },
      { es: "Flujo de reserva de punta a punta", en: "End-to-end booking flow" },
      { es: "API REST y persistencia en MySQL", en: "REST API with MySQL persistence" },
    ],
    tech: ["React Native", "Expo", "Redux", "Spring Boot", "MySQL"],
    images: [
      "/projects/vitalis/vitalis-1.jpeg",
      "/projects/vitalis/vitalis-2.jpeg",
      "/projects/vitalis/vitalis-3.jpeg",
      "/projects/vitalis/vitalis-4.jpeg",
    ],
    fit: "contain",
    links: [
      { label: "Frontend", href: "https://github.com/ThomasGiardina/VitalisFront" },
      { label: "Backend", href: "https://github.com/ThomasGiardina/Vitalis-Back" },
    ],
  },
];

export const education: TimelineItem[] = [
  {
    period: { es: "2022 — Hoy", en: "2022 — Now" },
    title: { es: "Ingeniería en Informática", en: "Computer Engineering" },
    place: "UADE · Buenos Aires",
    detail: {
      es: "Cursando 5° año. Foco en desarrollo de software, bases de datos, IA y ciberseguridad.",
      en: "Currently in 5th year. Focused on software development, databases, AI and cybersecurity.",
    },
  },
  {
    period: { es: "2020 — 2021", en: "2020 — 2021" },
    title: { es: "IGCSE ICE — Merit", en: "IGCSE ICE — Merit" },
    place: "Cambridge International",
    detail: {
      es: "Business, English y Español como primera lengua (2021); Maths, Chemistry, History y Literature (2020).",
      en: "Business, English and Spanish as first language (2021); Maths, Chemistry, History and Literature (2020).",
    },
  },
  {
    period: { es: "2005 — 2021", en: "2005 — 2021" },
    title: { es: "Bachillerato en Ciencias Sociales", en: "High School — Social Sciences" },
    place: "St. Albans College",
    detail: {
      es: "Educación bilingüe. Inglés nativo / bilingüe.",
      en: "Bilingual education. Native / bilingual English.",
    },
  },
];

export const life = [
  { image: "/life/muay-thai.jpg", text: "Muay Thai" },
  { image: "/life/amigos.jpg", text: "Amigos · Friends" },
  { image: "/life/mascotas.jpg", text: "Mascotas · Pets" },
  { image: "/life/uade.webp", text: "UADE" },
];

export { dict, type Dict } from "./dict";
