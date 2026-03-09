# Frontend for Portfolio Website

React + Vite + TypeScript frontend with Emotion styling.

## Setup

```bash
npm install
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

- **App.tsx** – Main component with Emotion ThemeProvider and lazy-loaded sections
- **components/sections/** – Hero, Projects, Skills, Contact sections
- **components/layout/** – Navigation and footer
- **styles/** – Centralized theme configuration and global styles
- **hooks/** – Accessibility utilities

## API Integration

The frontend proxies `/api` requests to `http://localhost:4000` (configured in `vite.config.ts`).

Modify the Contact form in `src/components/sections/Contact.tsx` if needed.

## Production Build

The build output (`dist/`) is served by the Flask backend in production.

Build with:
```bash
npm run build
```

Then ensure the backend is running:
```bash
cd ../backend
python app.py
```
