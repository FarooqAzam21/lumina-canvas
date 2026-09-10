import { createFileRoute } from "@tanstack/react-router";
import ExperiencePage from "../components/experience/ExperiencePage.jsx";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Farooq Azam — Full-Stack Developer & AI Engineer" },
      { name: "description", content: "Farooq Azam is a full-stack developer and AI engineer building end-to-end products across frontend, backend, MERN, Python, and applied machine learning." },
      { property: "og:title", content: "Farooq Azam — Full-Stack Developer & AI Engineer" },
      { property: "og:description", content: "Full-stack development and applied AI engineering across React, Node.js, Python, MERN, LLM, and RAG-based products." },
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
