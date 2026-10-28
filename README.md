# AZN Accounting LLC website

React + TypeScript + Tailwind (Vite). Static content, data-driven pages.

```
npm install
npm run dev      # local dev
npm run build    # typecheck + production build
```

## Add a service page
1. Add an object to `src/data/services.ts`. Nav, footer, home card, routing and SEO tags update automatically.
2. Add its URL to `public/sitemap.xml`.

## Add a new kind of section
1. Extend `ServiceSection` in `src/types/service.ts`.
2. Create a component in `src/components/sections/`.
3. Add a `case` in `SectionRenderer.tsx`.

## Structure
- `config/` site-wide constants (name, contact, nav)
- `data/` page content
- `types/` shared TypeScript types
- `components/ui` primitives, `layout` header/footer, `sections` content blocks, `service` page blocks, `seo` meta and JSON-LD
- `pages/` route components

## SEO notes
Meta tags and JSON-LD are set per page with react-helmet-async. Plain client-side React is crawled well by Google but weaker for other engines and social previews; when you want full SEO strength, add prerendering (vite-plugin-ssg or move to Next.js/Astro). The data/component structure carries over unchanged.
