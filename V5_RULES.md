# Marsdove Framework Rules

1. **Reuse first.** Before creating a helper or component, inspect the existing framework and reuse the closest correct abstraction.
2. **DOM boundary.** Only `src/components/ui/*` may call `_$()` directly. Higher layers compose UI primitives/components.
3. **Component contract.** Components use `Component(tag, props, ...children)`.
4. **No hidden one-off DOM.** If a child has independent value, behavior, styling, or reuse potential, extract it into a component.
5. **CSS ships with the component.** A component is incomplete without its states, responsive behavior, and accessibility styling.
6. **Configuration over hardcoding.** Brand, theme, defaults, and application identity come from config.
7. **Semantic tokens.** Components consume semantic CSS variables rather than raw brand values.
8. **State only where needed.** Stateful components may bind to `Store`; presentational components stay stateless.
9. **Store is the source of truth.** Shared application state belongs in `Store`, not scattered module globals.
10. **Use `app.get()` for runtime configuration/services.** Components may resolve the active app when they need brand/theme/store configuration.
11. **Documentation is the laboratory.** Every public component/system should be exercised in `docs/` using the real implementation.
12. **Router is part of the product surface.** Documentation must exercise navigation, route params, query strings, guards, layouts, and 404 behavior.
13. **No runtime dependency on npm.** The browser framework must work from source/CDN/static files without package-manager runtime requirements.
14. **NPM is optional distribution.** Package exports and the CLI may support npm installation/init, but the framework itself stays browser-native.
15. **Generic framework, domain applications separate.** Commerce primitives may be generic; furniture-specific business logic belongs in the Mars Furniture application.
16. **Do not copy legacy code blindly.** The old Marsdove project is a capability reference, not an implementation source.
17. **Public API must be unambiguous.** Avoid conflicting star exports and duplicate canonical component names.
18. **Finish before expanding.** A component is done only after implementation, CSS, exports, docs usage, and basic checks are complete.
