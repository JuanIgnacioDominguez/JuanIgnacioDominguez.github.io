# Juan Ignacio Dominguez — Portfolio

Portfolio personal construido con **Next.js 16**, **React 19**, **Tailwind CSS 4** y componentes de **[React Bits](https://reactbits.dev)**, **[shadcn/ui](https://ui.shadcn.com)** y **[Watermelon UI](https://ui.watermelon.sh)**. Paleta verde tomada de [AnimeJD](https://animejd.vercel.app).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export estático en /out
npm run lint
```

## Estructura

- `app/` — layout, página, robots y sitemap
- `components/site/` — secciones del sitio (Hero, About, Projects, Stack, Journey, Contact)
- `components/reactbits/` — React Bits (`npx shadcn@latest add https://reactbits.dev/r/<Nombre>-TS-TW`)
- `components/ui/` — shadcn/ui (`npx shadcn@latest add <componente>`)
- `components/watermelon/` — Watermelon UI adaptados al tema (`npx shadcn@latest add https://ui.watermelon.sh/r/<nombre>.json`)
- `lib/content.ts` — proyectos, formación y perfil · `lib/dict.ts` — textos ES/EN
- `public/` — capturas de proyectos, fotos, CV

## Deploy

Push a `main` → GitHub Actions (`.github/workflows/deploy.yml`) genera el export estático y lo publica en GitHub Pages.
