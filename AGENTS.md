<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the product catalog and image associations in `src/lib/products.ts`, rendered through the shared ProductCard, so collection and home remain consistent.
- Keep the scroll-driven GLB scene contained in the home storytelling area, so later content and other pages stay unobstructed.
- Use leaf TanStack routes for collection, story and contact pages, so navigation resolves to distinct content.
- Construct Three.js intrinsic elements with React.createElement rather than JSX, so editor DOM source metadata cannot be applied to non-DOM scene objects.
- Prebundle the scene renderer and Radix Slot with React in Vite, so late dependency discovery cannot mix React hook dispatcher generations.
