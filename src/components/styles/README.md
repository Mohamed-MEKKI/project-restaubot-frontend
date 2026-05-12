# Component styles (design system)

This folder is the **single source** for the app’s design system. It is loaded once in the root layout.

## Structure

| File | Purpose |
|------|--------|
| **index.css** | Entry point; imports `fonts.css`, `tailwind.css`, and `theme.css`. |
| **fonts.css** | Custom `@font-face` or font overrides (optional). |
| **tailwind.css** | Tailwind v4 setup and content sources for `src/**`. |
| **theme.css** | CSS variables (light/dark), `@theme inline` for Tailwind, base typography. |

## Usage

- **Do not** import these files in individual components. The root layout already imports `@/components/styles/index.css`.
- To change theme colors or tokens, edit **theme.css**.
- To add Tailwind content paths, edit **tailwind.css** `@source` directives.
- For component-only styles, use Tailwind classes in JSX or add a CSS module next to the component (e.g. `MyComponent.module.css`).
