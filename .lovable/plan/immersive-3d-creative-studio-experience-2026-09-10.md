# Immersive 3D Creative Studio Experience

## Vision
Build a single continuous cinematic world around one evolving **crystalline signal core**: a sculptural metallic-glass object that assembles during loading, anchors the hero, travels through the story, becomes the interactive showcase, fragments into particles, and returns transformed in the final call to action.

The art direction stays near-black and editorial, with disciplined white typography, graphite glass, and sparse electric-blue/violet light. The experience should feel tactile and expensive rather than neon-heavy or like a collection of unrelated 3D demos.

## Experience flow
1. **Cinematic loader** — Monogram, honest loading progress, particles converging, and a clean reveal into the scene.
2. **Floating navigation** — Transparent initially, then compact glass on scroll; desktop links, accessible mobile menu, magnetic project button.
3. **Hero world** — Full-viewport 3D core, atmospheric particles, rings and crystal planes, cursor-reactive camera/light, cinematic headline reveal, two clear actions.
4. **Editorial introduction** — Oversized scroll-revealed statement while the persistent 3D object recedes and the atmosphere changes.
5. **Interactive object lab** — Drag-to-rotate sculpture with keyboard-accessible hotspots and an animated information panel.
6. **Spatial services** — Three perspective cards staged in depth, with restrained tilt and focus states instead of a flat grid.
7. **Pinned horizontal story** — Discover, Design, Build, Transform move laterally while the persistent scene evolves with each phase.
8. **Layered image composition** — One generated cinematic architectural image, masked and parallaxed behind 3D crystal elements and typography.
9. **Featured work** — Three large editorial project scenes with image expansion, typographic shifts, and project actions.
10. **Particle chamber** — Interactive, depth-aware field that reacts subtly to pointer and scroll without becoming a tech demo.
11. **Kinetic typography** — IMAGINE / BUILD / TRANSFORM animated independently in scale, blur, position, and perspective.
12. **Brand story** — Image-led timeline with restrained parallax and a continuously changing scene state.
13. **Finale** — The signal core reforms as a luminous final object around the project invitation and magnetic CTA.

## Interaction and motion
- Use Lenis as the single smooth-scroll source and synchronize it with GSAP ScrollTrigger.
- Drive camera position, object state, scene lighting, typography, pinned sections, and horizontal movement from scroll progress.
- Use frame-rate-independent damping for cursor, drag, camera, light, and particle response.
- Add a desktop custom cursor with contextual labels; retain the system cursor on touch and coarse-pointer devices.
- Use Framer Motion for interface transitions and loader/navigation states; GSAP owns scroll timelines to prevent competing animation systems.
- Include an opt-in sound controller architecture with hover, click, and transition hooks, but ship muted with no autoplay.

## Technical implementation
- Keep the existing TanStack Start/Vite shell and router; mount the homepage as a client-only route so WebGL never renders on the server.
- Author all new experience modules in JavaScript/JSX, while leaving framework-generated TypeScript infrastructure intact.
- Add Three.js, React Three Fiber v9, Drei v10, postprocessing, GSAP, Framer Motion, and Lenis versions compatible with React 19.
- Split the experience into reusable `3d`, `sections`, `animations`, `hooks`, `data`, and utility modules.
- Use a single persistent R3F canvas behind semantic DOM sections. Share scroll and pointer state through refs/store-style state so animation frames do not trigger React re-renders.
- Build the abstract hero sculpture procedurally with PBR materials, a local lightformer environment, soft contact shadows, fog, instanced particles, and one restrained bloom/noise pass.
- Generate and bundle a cohesive set of cinematic project/brand imagery; no remote stock placeholders or runtime image hotlinks.
- Add route metadata, canonical/OG/Twitter tags, structured data, sitemap, and updated robots directives.

## Performance and responsive strategy
- Lazy-load the 3D runtime and show a polished DOM fallback/loading state immediately.
- Cap pixel ratio, keep draw calls and geometry bounded, instance repeated particles, and avoid oversized models/textures.
- Desktop receives full interaction and post-processing; tablet reduces particles and depth effects; mobile uses fewer objects, simplified lighting, no custom cursor, and shorter pinned motion.
- Pause or reduce rendering when the page is hidden or the canvas is offscreen.
- Honor `prefers-reduced-motion` by disabling smooth scrolling, camera pursuit, continuous object motion, parallax, and nonessential particles while preserving the full content journey.

## Accessibility and verification
- Semantic sections, one H1, visible focus states, keyboard navigation, skip link, labelled controls, accessible hotspot dialog behavior, and readable contrast.
- Ensure all essential copy and actions remain usable without WebGL or motion.
- Verify loading, scrolling, drag/hotspots, mobile navigation, reduced motion, responsive layouts, and keyboard operation in-browser.
- Capture desktop and mobile screenshots to confirm the 3D scene is visible, framed correctly, non-overlapping, and free of runtime/network errors.
