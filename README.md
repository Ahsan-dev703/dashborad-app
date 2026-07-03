# React Admin Dashboard

Minimal, mobile-first admin dashboard built with React, Vite and Tailwind.

## Key features

- Responsive, mobile-first layout with sidebar, header, and pages
- Context-based state for: Auth, Overview, Products, Users, Sales, Orders, Analytics, Settings
- Reusable components: Modal, ActionButton, StatCard, Charts (Recharts)
- Edit / Delete / View flows using modals

## Tech stack

- React 18+ with Vite
- Tailwind CSS for utility-first styling
- Framer Motion for UI animations
- Recharts for charts
- react-router-dom for routing
- lucide-react for icons

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

## Project structure (important files)

- `src/App.jsx` — app routes and layout
- `src/main.jsx` — app bootstrap
- `src/context/Provider.jsx` — composes all feature providers
- `src/context/features/*` — feature contexts (Products, Users, Sales, Orders, Analytics, Settings)
- `src/components/common` — shared UI (Header, Sidebar, Modal, ActionButton, StatCard)
- `src/components/*` — feature components and charts
- `src/pages/*` — route pages (Overview, Products, Users, Sales, Orders, Analytics, Settings)

## Notes

- Mobile-first: header and sidebar include responsive behavior and smooth animations.
- To change data sources, update the corresponding context in `src/context/features/`.

## Contributing

- Open an issue or submit a PR. Keep changes small and focused.

## License

See `LICENSE` if present; otherwise contact the project owner.
