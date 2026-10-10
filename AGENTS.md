# Project Guidelines

- Keep the product catalog and image associations in `src/lib/products.ts`, rendered through the shared ProductCard, so collection and home remain consistent.
- Keep the scroll-driven GLB scene contained in the home storytelling area, so later content and other pages stay unobstructed.
- Use leaf TanStack routes for collection, story and contact pages, so navigation resolves to distinct content.
- Construct Three.js intrinsic elements with React.createElement rather than JSX, so editor DOM source metadata cannot be applied to non-DOM scene objects.
- Prebundle the scene renderer and Radix Slot with React in Vite, so late dependency discovery cannot mix React hook dispatcher generations.
