import { createFileRoute } from "@tanstack/react-router";
import ExperiencePage from "../components/experience/ExperiencePage.jsx";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "NOVA — Immersive Digital Experiences" },
      { name: "description", content: "Enter NOVA: an immersive creative technology studio building digital worlds that move, respond and transform." },
      { property: "og:title", content: "NOVA — Immersive Digital Experiences" },
      { property: "og:description", content: "Digital experiences should be felt. Enter an interactive world by NOVA." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "NOVA Creative Technology Studio",
        description: "Immersive digital experiences, spatial identities and creative technology.",
        url: "/",
      }),
    }],
  }),
  component: ExperiencePage,
});
