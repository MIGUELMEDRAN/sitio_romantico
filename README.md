# Sitio romántico — Aniversario (con SOLID, calendario-gate y animaciones)

Proyecto base listo para personalizar. **No incluye medios reales**: usa `src/config/content.json` para editar nombres, textos y rutas de fotos/videos.

## Stack
- React + TypeScript + Vite
- TailwindCSS
- Framer Motion (animaciones)
- Headless UI (diálogo accesible para lightbox)
- i18n básico (ES por defecto)
- ESLint + Prettier
- Vitest + Testing Library

## Requisitos implementados
- **DateGate** con validación estricta `DD/MM/AAAA` contra `08/03/2023`.
- **WelcomeHero** animado.
- **Galería** con **Lightbox** accesible (teclas y cierre claro).
- **VideoPlayer** con controles + atajos `k j l f m` y progreso persistente por sesión.
- **LoveCounter**: diferencia exacta desde `2023-03-08` en tiempo real.
- **Sorpresas**: efectos de **mariposas** y **rosas** con partículas SVG y `framer-motion`.
- **Accesibilidad**: focus visible y `prefers-reduced-motion` respetado (omite partículas).
- **Rendimiento**: `loading="lazy"`, `decoding="async"` en imágenes.
- **SOLID**: servicios (fecha, storage, media), tipos de dominio y componentes pequeños.

> **Nota**: Rellena tus rutas reales en `content.json`. No se sube nada externo por defecto.

## Uso
```bash
pnpm i # o npm i / yarn
pnpm dev # http://localhost:5173
pnpm build # salida en dist/
pnpm preview
```

## Estructura
```
src/
  components/
    DateGate/
    WelcomeHero/
    PhotoGrid/ (Lightbox)
    VideoPlayer/
    LoveCounter/
    SurpriseButton/
    effects/ (ButterfliesEffect, RosesEffect)
  services/
    date.service.ts
    storage.service.ts
    media.service.ts
  domain/
    media.types.ts
    effects.types.ts
  pages/
    Home.tsx
  app/
    App.tsx
  styles/
    globals.css
  config/
    content.json
  i18n/
    i18n.ts + es/en.json
```

## Deploy estático
- Construye con `pnpm build` y despliega `/dist` en Vercel/Netlify.
- Añade un `404.html` si lo requiriera tu hosting (Vite ya sirve SPA).

## Subir a tu repositorio
1. Crea el repo o entra al existente.
2. Copia estos archivos a la raíz del repo.
3. Ejecuta:
   ```bash
   git init
   git add .
   git commit -m "feat: sitio romántico base (gate + animaciones + i18n)"
   git branch -M main
   git remote add origin <URL_DE_TU_REPO>
   git push -u origin main
   ```

## Tests
- Ejecuta `pnpm test` para pruebas unitarias básicas de servicios.

## Personalización
- Cambia colores y tipografías con Tailwind.
- Edita la bienvenida y nombres en `content.json`.
- Agrega fotos a `/public/media/photos` y videos a `/public/media/videos` o ajusta rutas.
