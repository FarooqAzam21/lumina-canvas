import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { certifications, experience, projectCategories, projects, skillGroups } from "../../data/content";

const navItems = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

function SectionLabel({ children }) {
  return <p className="portfolio-label">{children}</p>;
}

function ExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer" className="portfolio-link">{children}<ArrowUpRight size={15} /></a>;
}

function scrollToSection(event, href, closeMenu) {
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu?.();
}

export default function ExperiencePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <a href="#top" className="portfolio-mark" aria-label="Farooq Azam home">FA<span>.</span></a>
        <nav className={menuOpen ? "portfolio-nav is-open" : "portfolio-nav"} aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={(event) => scrollToSection(event, href, () => setMenuOpen(false))}>{label}</a>)}
        </nav>
        <div className="portfolio-header-actions">
          <a className="portfolio-header-github" href="https://github.com/FarooqAzam21" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={18} /></a>
          <button className="portfolio-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="portfolio-hero">
          <div className="hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          <div className="portfolio-container hero-content">
            <SectionLabel>Full-Stack Developer / AI Engineer</SectionLabel>
            <h1>Building useful<br /><em>things</em> end to end.</h1>
            <div className="hero-bottom">
              <p className="hero-intro">I’m Farooq Azam, a developer from Karachi shipping products across frontend, backend, full-stack, and applied AI.</p>
              <a href="#projects" className="portfolio-button" onClick={(event) => scrollToSection(event, "#projects")}>View my work <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-meta"><span>Karachi, Pakistan</span><span>Available for freelance work</span><span>Scroll to explore ↓</span></div>
          </div>
        </section>

        <section id="about" className="portfolio-section about-section reveal-on-scroll">
          <div className="section-orbit" aria-hidden="true"><span /><span /><span /></div><div className="portfolio-container split-layout"><SectionLabel>01 / About</SectionLabel><div><h2>Versatile by design.</h2><p className="large-copy">I ship end-to-end — from UI to backend APIs to LLM-powered features. Comfortable across React/Next.js frontends, Node.js/Python backends, and applied machine learning.</p><p>Currently, I run a small freelance web/digital services practice alongside university, and I’m building an AI-powered CRM SaaS as an independent product.</p><p>Final-year BE Computer Engineering student at Sir Syed University of Engineering &amp; Technology (SSUET), Karachi — expected graduation 2026.</p><div className="education-detail"><span>Education</span><strong>BS Computer Engineering</strong><p>Sir Syed University of Engineering and Technology</p><small>2022–2026 · GPA 2.96 / 4</small></div></div></div>
        </section>

        <section id="skills" className="portfolio-section skills-section reveal-on-scroll">
          <div className="portfolio-container"><SectionLabel>02 / Skills</SectionLabel><div className="skills-grid">{skillGroups.map((group, index) => <article className="skill-group" key={group.label} style={{ "--skill-index": index }}><span className="skill-index">0{index + 1}</span><h3>{group.label}</h3><div className="skill-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div></div>
        </section>

        <section id="experience" className="portfolio-section experience-section reveal-on-scroll">
          <div className="portfolio-container split-layout"><SectionLabel>03 / Experience</SectionLabel><article className="experience-entry"><div className="experience-heading"><div><h2>{experience.title}</h2><p>{experience.location}</p></div><span className="experience-status">Current practice</span></div><ul>{experience.points.map((point) => <li key={point}>{point}</li>)}</ul></article></div>
        </section>

        <section id="projects" className="portfolio-section projects-section reveal-on-scroll">
          <div className="portfolio-container"><div className="projects-heading"><SectionLabel>04 / Selected projects</SectionLabel><h2>Work across<br /><em>the stack.</em></h2></div><div className="project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((category) => <button type="button" key={category} className={activeCategory === category ? "filter-button is-active" : "filter-button"} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card reveal-on-scroll" key={`${project.title}-${project.category}`}><div className="project-number">{String(index + 1).padStart(2, "0")}</div><div className="project-card-body"><div className="project-card-top"><span>{project.category}</span><ExternalLink href={project.repo}>GitHub</ExternalLink></div><h3>{project.title}</h3><p className="project-stack">{project.stack}</p><p>{project.description}</p></div></article>)}</div></div>
        </section>

        <section id="certifications" className="portfolio-section certifications-section reveal-on-scroll">
          <div className="portfolio-container split-layout"><SectionLabel>05 / Certifications</SectionLabel><div className="certification-list">{certifications.map((certification) => <a className="certification-item" href={certification.href} target="_blank" rel="noreferrer" key={certification.title}><span><strong>{certification.title}</strong><small>{certification.issuer}</small></span><ArrowUpRight size={18} /></a>)}</div></div>
        </section>
      </main>

      <footer id="contact" className="portfolio-footer"><div className="portfolio-container"><SectionLabel>06 / Contact</SectionLabel><h2>Let’s build<br /><em>something useful.</em></h2><div className="contact-grid"><div><a className="contact-email" href="mailto:azamfarooq891@gmail.com">azamfarooq891@gmail.com</a><a className="contact-phone" href="tel:+923189465018">+92 318 9465018</a></div><div className="contact-links"><ExternalLink href="https://github.com/FarooqAzam21">GitHub</ExternalLink><ExternalLink href="https://linkedin.com/in/farooq-azam-121342274">LinkedIn</ExternalLink></div></div><div className="footer-bottom"><span>Farooq Azam</span><span>Karachi, Pakistan · 2026</span></div></div></footer>
    </div>
  );
}