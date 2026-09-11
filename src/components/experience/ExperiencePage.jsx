import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { certifications, experience, projectCategories, projects, skillGroups } from "../../data/content";
import CustomCursor from "./CustomCursor.jsx";
import HeroBackdrop from "./HeroBackdrop.jsx";
import SignatureCore from "./SignatureCore.jsx";
import TechEcosystem from "./TechEcosystem.jsx";

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
  return (
    <a href={href} target="_blank" rel="noreferrer" className="portfolio-link" data-cursor="VIEW">
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}

function scrollToSection(event, href, closeMenu) {
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu?.();
}

function Magnetic({ children, strength = 0.22, className }) {
  const ref = useRef(null);
  const move = (event) => {
    const node = ref.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) * strength}px, ${(event.clientY - rect.top - rect.height / 2) * strength}px, 0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate3d(0,0,0)"; };
  return (
    <span ref={ref} className={className ? `magnetic ${className}` : "magnetic"} onMouseMove={move} onMouseLeave={reset}>
      {children}
    </span>
  );
}

function Words({ text, className }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <motion.span
            className="word"
            initial={{ y: "108%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.35 + index * 0.075, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ExperiencePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const reduced = useReducedMotion();
  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  // Progressive timeline activation
  const timelineRef = useRef(null);
  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return undefined;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.78 - rect.top) / rect.height));
      node.style.setProperty("--timeline-progress", String(progress));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const fade = (delay = 0) => (reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] } });

  return (
    <div className="portfolio-shell noise-overlay">
      <CustomCursor />

      <header className={scrolled ? "portfolio-header is-scrolled" : "portfolio-header"}>
        <a href="#top" className="portfolio-mark" aria-label="Farooq Azam home" data-cursor="TOP">FA<span>.</span></a>
        <nav className="portfolio-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Magnetic key={href} strength={0.3}>
              <a href={href} onClick={(event) => scrollToSection(event, href)}>{label}</a>
            </Magnetic>
          ))}
        </nav>
        <div className="portfolio-header-actions">
          <a className="portfolio-header-github" href="https://github.com/FarooqAzam21" target="_blank" rel="noreferrer" aria-label="GitHub profile" data-cursor="VIEW"><Github size={17} /></a>
          <a className="portfolio-header-github" href="https://linkedin.com/in/farooq-azam-121342274" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" data-cursor="VIEW"><Linkedin size={17} /></a>
          <button className="portfolio-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen}>
        {navItems.map(([label, href], index) => (
          <a key={href} href={href} style={{ "--menu-index": index }} onClick={(event) => scrollToSection(event, href, () => setMenuOpen(false))}>
            <em>{String(index + 1).padStart(2, "0")}</em>{label}
          </a>
        ))}
        <div className="mobile-menu-foot">
          <a href="mailto:azamfarooq891@gmail.com">azamfarooq891@gmail.com</a>
          <a href="tel:+923189465018">+92 318 9465018</a>
        </div>
      </div>

      <main id="top">
        <section className="portfolio-hero">
          <HeroBackdrop />
          <div className="portfolio-container hero-content">
            <div className="hero-left">
              <motion.p className="portfolio-label status-label" {...fade(0.05)}>
                <span className="status-dot" />Full-Stack Developer / AI Engineer
              </motion.p>
              <h1>
                <Words text="Building useful" />
                <em><Words text="things" /></em>{" "}
                <Words text="end to end." />
              </h1>
              <motion.div className="hero-bottom" {...fade(1.05)}>
                <p className="hero-intro">I’m Farooq Azam, a developer from Karachi shipping products across frontend, backend, full-stack, and applied AI.</p>
                <Magnetic strength={0.28}>
                  <a href="#projects" className="portfolio-button" data-cursor="VIEW" onClick={(event) => scrollToSection(event, "#projects")}>
                    View my work <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
              </motion.div>
              <motion.div className="hero-socials" {...fade(1.2)}>
                <a href="https://github.com/FarooqAzam21" target="_blank" rel="noreferrer" data-cursor="VIEW"><Github size={15} /> GitHub</a>
                <a href="https://linkedin.com/in/farooq-azam-121342274" target="_blank" rel="noreferrer" data-cursor="VIEW"><Linkedin size={15} /> LinkedIn</a>
              </motion.div>
            </div>
            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
              <SignatureCore />
            </motion.div>
          </div>
          <motion.div className="hero-meta" {...fade(1.35)}>
            <span>Karachi, Pakistan</span>
            <span>Available for freelance work</span>
            <span className="scroll-cue">Scroll to explore <i /></span>
          </motion.div>
        </section>

        <section className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "MERN", "Machine Learning", "RAG", "LLM Integration", "MongoDB"].map((item) => (
                  <span key={`${copy}-${item}`}>{item}<i>◦</i></span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="portfolio-section about-section reveal-on-scroll">
          <div className="portfolio-container">
            <SectionLabel>01 / About</SectionLabel>
            <div className="about-layout">
              <div className="about-copy">
                <h2>Versatile by design.</h2>
                <p className="large-copy">I ship end-to-end — from UI to backend APIs to LLM-powered features. Comfortable across React/Next.js frontends, Node.js/Python backends, and applied machine learning.</p>
                <p>Currently, I run a small freelance web/digital services practice alongside university, and I’m building an AI-powered CRM SaaS as an independent product.</p>
                <p>Final-year BE Computer Engineering student at Sir Syed University of Engineering &amp; Technology (SSUET), Karachi — expected graduation 2026.</p>
              </div>
              <aside className="education-detail glass-card">
                <span>Education</span>
                <strong>BS Computer Engineering</strong>
                <p>Sir Syed University of Engineering and Technology</p>
                <small>2022–2026 · GPA 2.96 / 4</small>
                <div className="education-glow" aria-hidden="true" />
              </aside>
            </div>
          </div>
        </section>

        <section id="skills" className="portfolio-section skills-section">
          <div className="portfolio-container">
            <div className="reveal-on-scroll">
              <SectionLabel>02 / Skills</SectionLabel>
              <h2 className="section-title">The stack I<br /><em>build with.</em></h2>
            </div>
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article className="skill-group reveal-on-scroll" key={group.label} style={{ "--skill-index": index }} data-cursor="EXPLORE">
                  <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.label}</h3>
                  <div className="skill-list">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  <div className="skill-sheen" aria-hidden="true" />
                </article>
              ))}
            </div>
            <div className="reveal-on-scroll ecosystem-block">
              <p className="mono-tag">Ecosystem map</p>
              <TechEcosystem />
            </div>
          </div>
        </section>

        <section id="experience" className="portfolio-section experience-section">
          <div className="portfolio-container">
            <div className="reveal-on-scroll">
              <SectionLabel>03 / Experience &amp; Education</SectionLabel>
            </div>
            <div className="timeline" ref={timelineRef}>
              <span className="timeline-rail" aria-hidden="true"><i /></span>

              <article className="timeline-entry reveal-on-scroll">
                <div className="timeline-marker"><span>01</span></div>
                <div className="timeline-body">
                  <div className="experience-heading">
                    <div>
                      <h2>{experience.title}</h2>
                      <p>{experience.location}</p>
                    </div>
                    <span className="experience-status">Current practice</span>
                  </div>
                  <ul>{experience.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>

              <article className="timeline-entry reveal-on-scroll">
                <div className="timeline-marker"><span>02</span></div>
                <div className="timeline-body">
                  <div className="experience-heading">
                    <div>
                      <h2>BS Computer Engineering</h2>
                      <p>Sir Syed University of Engineering and Technology</p>
                    </div>
                    <span className="experience-status">2022–2026</span>
                  </div>
                  <ul><li>GPA 2.96 / 4 · Karachi, Pakistan · expected graduation 2026.</li></ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section projects-section">
          <div className="portfolio-container">
            <div className="projects-heading reveal-on-scroll">
              <SectionLabel>04 / Selected projects</SectionLabel>
              <h2>Work across<br /><em>the stack.</em></h2>
            </div>
            <div className="project-filters reveal-on-scroll" role="group" aria-label="Filter projects by category">
              {projectCategories.map((category) => (
                <button type="button" key={category} className={activeCategory === category ? "filter-button is-active" : "filter-button"} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <motion.article
                  className="project-card reveal-on-scroll"
                  key={`${project.title}-${project.category}`}
                  layout={!reduced}
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  data-cursor="VIEW"
                >
                  <div className="project-visual" aria-hidden="true">
                    <div className="project-browser">
                      <span /><span /><span />
                      <em>{project.category.toLowerCase()}</em>
                    </div>
                    <div className="project-preview">
                      <div className="preview-grid" />
                      <div className="preview-glow" />
                      <p className="preview-stack">{project.stack}</p>
                    </div>
                  </div>
                  <div className="project-card-body">
                    <div className="project-card-top">
                      <span>{String(index + 1).padStart(2, "0")} — {project.category}</span>
                      <ExternalLink href={project.repo}>GitHub</ExternalLink>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-stack">{project.stack}</p>
                    <p>{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="portfolio-section certifications-section reveal-on-scroll">
          <div className="portfolio-container split-layout">
            <SectionLabel>05 / Certifications</SectionLabel>
            <div className="certification-list">
              {certifications.map((certification) => (
                <a className="certification-item" href={certification.href} target="_blank" rel="noreferrer" key={certification.title} data-cursor="VIEW">
                  <span><strong>{certification.title}</strong><small>{certification.issuer}</small></span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="portfolio-footer">
        <div className="footer-atmosphere" aria-hidden="true"><span /><span /></div>
        <div className="portfolio-container">
          <div className="reveal-on-scroll">
            <SectionLabel>06 / Contact</SectionLabel>
            <h2>Let’s build<br /><em>something useful.</em></h2>
          </div>
          <div className="contact-grid reveal-on-scroll">
            <div>
              <Magnetic strength={0.12}>
                <a className="contact-email" href="mailto:azamfarooq891@gmail.com" data-cursor="EMAIL">azamfarooq891@gmail.com</a>
              </Magnetic>
              <a className="contact-phone" href="tel:+923189465018" data-cursor="CALL">+92 318 9465018</a>
            </div>
            <div className="contact-links">
              <ExternalLink href="https://github.com/FarooqAzam21">GitHub</ExternalLink>
              <ExternalLink href="https://linkedin.com/in/farooq-azam-121342274">LinkedIn</ExternalLink>
            </div>
          </div>
          <div className="footer-divider" aria-hidden="true" />
          <div className="footer-bottom">
            <span>Farooq Azam</span>
            <span>Karachi, Pakistan · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
